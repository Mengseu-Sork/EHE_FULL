import { useEffect, useState } from "react";
import api from "../../../api/api";
import {
    FaHistory,
    FaSave,
    FaTimes,
    FaImage,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function HistoryForm({
    editing,
    onClose,
    onSuccess,
}) {
    const [form, setForm] = useState({
        year: "",
        title: "",
        description: "",
        is_active: true,
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        if (editing) {
            setForm({
                year: editing.year,
                title: editing.title || "",
                description: editing.description,
                is_active: editing.is_active,
            });
        }
    }, [editing]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("year", form.year);
        data.append("title", form.title);
        data.append("description", form.description);

        // IMPORTANT
        data.append("is_active", form.is_active ? "1" : "0");

        if (image) {
            data.append("image", image);
        }

        if (image) {
            data.append("image", image);
        }

        try {

            Swal.fire({
                title: editing ? "Updating..." : "Saving...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            if (editing) {

                data.append("_method", "PUT");

                await api.post(
                    `/histories/${editing.id}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

            } else {

                await api.post(
                    "/histories",
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

            }

            Swal.fire({
                icon: "success",
                title: editing
                    ? "History Updated!"
                    : "History Created!",
                timer: 1800,
                showConfirmButton: false,
            });

            onSuccess();

            onClose();

        } catch (err) {

            if (err.response?.status === 422) {

                const errors = Object.values(
                    err.response.data.errors
                )
                    .flat()
                    .join("<br>");

                Swal.fire({
                    icon: "warning",
                    title: "Validation Error",
                    html: errors,
                });

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text:
                        err.response?.data?.message ||
                        "Something went wrong.",
                });

            }

        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="w-full max-w-4xl overflow-auto h-[90vh] rounded-3xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-5 text-white">

                    <div className="flex items-center gap-4">

                        <div className="rounded-xl bg-white/20 p-3">
                            <FaHistory size={22} />
                        </div>

                        <div>

                            <h2 className="text-2xl font-bold">
                                {editing ? "Edit History" : "Create History"}
                            </h2>

                            <p className="text-green-100 text-sm">
                                Manage your organization timeline.
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-white/20"
                    >
                        <FaTimes size={20} />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2"
                >

                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Title
                        </label>

                        <input
                            value={form.title}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    title: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-200"
                            placeholder="Organization Established"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Year
                        </label>

                        <input
                            type="text"
                            value={form.year}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    year: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-200"
                            placeholder="2026"
                        />

                    </div>

                    <div className="md:col-span-2">

                        <label className="mb-2 block font-semibold text-gray-700">
                            Description
                        </label>

                        <textarea
                            rows="6"
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-600 focus:ring-2 focus:ring-green-200"
                            placeholder="Write history description..."
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Image
                        </label>

                        <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-8 transition hover:border-green-500 hover:bg-green-50">

                            <FaImage className="mb-3 text-5xl text-gray-400" />

                            <p className="text-sm text-gray-500">
                                Click to upload image
                            </p>

                            <input
                                type="file"
                                hidden
                                onChange={(e) =>
                                    setImage(e.target.files[0])
                                }
                            />

                        </label>

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Preview
                        </label>

                        <div className="flex h-56 items-center justify-center overflow-hidden rounded-2xl border bg-gray-100">

                            {(image || editing?.image) ? (

                                <img
                                    src={
                                        image
                                            ? URL.createObjectURL(image)
                                            : editing.image
                                    }
                                    className="h-full w-full object-cover"
                                />

                            ) : (

                                <span className="text-gray-400">
                                    No Image
                                </span>

                            )}

                        </div>

                    </div>

                    <div className="md:col-span-2">

                        <label className="mb-3 block font-semibold text-gray-700">
                            Status
                        </label>

                        <button
                            type="button"
                            onClick={() =>
                                setForm({
                                    ...form,
                                    is_active: !form.is_active,
                                })
                            }
                            className={`relative h-6 w-14 rounded-full transition ${form.is_active
                                ? "bg-green-600"
                                : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${form.is_active
                                    ? "left-9"
                                    : "left-1"
                                    }`}
                            />
                        </button>

                    </div>

                    <div className="md:col-span-2 flex justify-end gap-4 border-t pt-6">

                        <button
                            type="button"
                            onClick={async () => {

                                const result = await Swal.fire({
                                    title: "Discard changes?",
                                    text: "Your changes will not be saved.",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonText: "Discard",
                                    cancelButtonText: "Continue Editing",
                                });

                                if (result.isConfirmed) {
                                    onClose();
                                }

                            }}
                            className="rounded-xl border cursor-pointer px-6 py-3 font-semibold transition text-white bg-orange-300 hover:bg-orange-500"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex items-center cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
                        >
                            <FaSave />
                            {editing ? "Update History" : "Save History"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}