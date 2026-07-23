import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import api from "../../../api/api";

const CATEGORIES = [
    "Community-Based Organizations",
    "Sustainable Livelihoods",
    "Natural Resource Management",
    "Education & Community Health",
    "Community Networks & Advocacy",
    "Partnership & Policy Engagement",
];

const today = new Date().toISOString().split("T")[0];
const emptyForm = {
    title: "",
    category: CATEGORIES[0],
    body: "",
    published_at: today,
};

const storageUrl = import.meta.env.VITE_STORAGE_URL;

export default function NewsForm({

    editing,

    onClose,

    onSuccess,

}) {

    const [form, setForm] = useState(emptyForm);

    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);

    const [loading, setLoading] = useState(false);

    const fileInput = useRef(null);

    useEffect(() => {

        if (editing) {

            setForm({
                title: editing.title || "",
                category: editing.category || CATEGORIES[0],
                body: editing.body || "",
                published_at: editing.published_at
                    ? editing.published_at.split("T")[0]
                    : today,
            });

            setOldImages(editing.images || []);

            setImages([]);

        } else {

            setForm({
                ...emptyForm,
                published_at: today,
            });

            setOldImages([]);

            setImages([]);

        }

    }, [editing]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleImages = (e) => {

        const files = Array.from(e.target.files);

        if (!files.length) return;

        const previews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages(prev => [...prev, ...previews]);

        e.target.value = "";

    };

    const removeNewImage = (index) => {

        setImages((prev) =>

            prev.filter((_, i) => i !== index)

        );

    };

    const removeOldImage = (index) => {

        setOldImages((prev) =>

            prev.filter((_, i) => i !== index)

        );

    };

    const submit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("title", form.title);

            formData.append("category", form.category);

            formData.append("body", form.body);

            formData.append("published_at", form.published_at);

            oldImages.forEach((image) => {

                formData.append("old_images[]", image);

            });

            images.forEach((image) => {

                formData.append("images[]", image.file);

            });

            if (editing) {

                formData.append("_method", "PUT");

                await api.post(
                    `/news/${editing.id}`,
                    formData
                );

            } else {

                await api.post(
                    "/news",
                    formData
                );

            }

            Swal.fire({
                icon: "success",
                title: editing ? "Updated Successfully" : "Created Successfully",
                timer: 1800,
                showConfirmButton: false,
            });

            setForm(emptyForm);

            setImages([]);

            setOldImages([]);

            onSuccess();

        } catch (error) {

            console.log(error.response);

            Swal.fire({
                icon: "error",
                title: "Failed",
                text: error.response?.data?.message || "Something went wrong.",
            });

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-5">

                    <div>

                        <h2 className="text-2xl font-bold text-white">

                            {editing ? "Edit News" : "Add News"}

                        </h2>

                        <p className="mt-1 text-sm text-green-100">

                            Manage organization news articles

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg cursor-pointer bg-white/20 px-4 py-2 text-white transition hover:bg-white/30"
                    >
                        ✕
                    </button>

                </div>

                <form onSubmit={submit}>

                    <div className="grid gap-8 p-6 lg:grid-cols-5">

                        {/* Images */}

                        <div className="col-span-2">

                            <div className="mb-3 flex items-center justify-between">

                                <label className="text-sm font-semibold text-gray-700">

                                    Images

                                </label>

                                <button
                                    type="button"
                                    onClick={() => fileInput.current.click()}
                                    className="rounded-lg cursor-pointer bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                                >
                                    + Add Images
                                </button>

                            </div>

                            <input
                                ref={fileInput}
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleImages}
                            />

                            {/* Empty State */}

                            {oldImages.length === 0 && images.length === 0 && (

                                <div
                                    onClick={() => fileInput.current.click()}
                                    className="flex h-40 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-green-300 bg-green-50 transition hover:bg-green-100"
                                >

                                    <div className="text-center">

                                        <div className="text-5xl">
                                            📷
                                        </div>

                                        <p className="mt-3 font-semibold text-green-700">

                                            Click to upload images

                                        </p>

                                        <p className="text-xs text-gray-500">

                                            JPG, PNG, WEBP

                                        </p>

                                    </div>

                                </div>

                            )}

                            {/* Image Preview */}

                            {(oldImages.length > 0 || images.length > 0) && (

                                <div className="grid grid-cols-2 gap-3">

                                    {oldImages.map((image, index) => (

                                        <div
                                            key={`old-${index}`}
                                            className="group relative"
                                        >

                                            <img
                                                src={`${storageUrl}/${image}`}
                                                className="h-28 w-full rounded-lg object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeOldImage(index)}
                                                className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-xs text-white opacity-0 transition group-hover:opacity-100"
                                            >
                                                ✕
                                            </button>

                                        </div>

                                    ))}

                                    {images.map((image, index) => (

                                        <div
                                            key={`new-${index}`}
                                            className="group relative"
                                        >

                                            <img
                                                src={image.preview}
                                                className="h-28 w-full rounded-lg object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-xs text-white opacity-0 transition group-hover:opacity-100"
                                            >
                                                ✕
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                        {/* Form */}

                        <div className="space-y-5 lg:col-span-3">

                            <div>

                                <label className="mb-2 block font-medium">

                                    News Title

                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border px-4 py-3 focus:border-green-500 focus:outline-none"
                                    placeholder="Enter news title"
                                />

                            </div>

                            <div className="grid gap-5 md:grid-cols-3">

                                <div className="col-span-2">

                                    <label className="mb-2 block font-medium">

                                        Category

                                    </label>

                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full rounded-xl cursor-pointer border px-4 py-3 focus:border-green-500 focus:outline-none"
                                    >

                                        {CATEGORIES.map((item) => (

                                            <option
                                                key={item}
                                                value={item}
                                            >
                                                {item}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div>

                                    <label className="mb-2 block font-medium">

                                        Published Date

                                    </label>

                                    <input
                                        type="date"
                                        name="published_at"
                                        value={form.published_at}
                                        onChange={handleChange}
                                        className="w-full rounded-xl cursor-pointer border px-4 py-3 focus:border-green-500 focus:outline-none"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block font-medium">

                                    Body

                                </label>

                                <textarea
                                    rows="10"
                                    name="body"
                                    value={form.body}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border px-4 py-3 focus:border-green-500 focus:outline-none"
                                    placeholder="Write news content..."
                                />

                            </div>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">

                        <p className="text-sm text-gray-500">
                            {editing
                                ? "Update this news article."
                                : "Create a new news article."}
                        </p>

                        <div className="flex gap-3">

                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="rounded-xl cursor-pointer border border-gray-300 bg-amber-300 px-6 py-2.5 font-medium text-white transition hover:bg-amber-500 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-xl cursor-pointer bg-green-600 px-6 py-2.5 font-medium text-white shadow transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
                            >
                                {loading
                                    ? "Saving..."
                                    : editing
                                        ? "Update News"
                                        : "Create News"}
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    );

}
