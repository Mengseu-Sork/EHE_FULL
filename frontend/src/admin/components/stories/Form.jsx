import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import api from "../../../api/api";
import {
    X,
    Upload,
    Loader2,
    ImagePlus,
    Trash2,
} from "lucide-react";
import {
    XMarkIcon,
    CheckCircleIcon,
    BookOpenIcon,
    PaperClipIcon,
    CalendarDaysIcon,
    DocumentTextIcon,
    CloudArrowUpIcon,
    Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

export default function Form({
    story = null,
    onClose,
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);

    const [selectedImages, setSelectedImages] = useState([]);

    const [existingImages, setExistingImages] = useState([]);

    const [attachment, setAttachment] = useState(null);

    const [attachmentName, setAttachmentName] = useState("");

    useEffect(() => {
        if (story) {
            reset({
                title: story.title || "",
                publish_date: story.publish_date
                    ? story.publish_date.slice(0, 10)
                    : "",
                description: story.description || "",
            });

            setExistingImages(story.images || []);

            if (story?.attachment) {

                setAttachmentName(
                    story.attachment.split("/").pop()
                );

            } else {

                setAttachment(null);
                setAttachmentName("");

            }
        } else {
            reset({
                title: "",
                publish_date: "",
                description: "",
            });

            setExistingImages([]);
            setAttachmentName("");
        }
    }, [story, reset]);

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);

        if (!files.length) return;

        const allowed = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
        ];

        const newImages = [];
        let duplicateCount = 0;

        files.forEach((file) => {

            if (!allowed.includes(file.type)) {

                Swal.fire({
                    icon: "warning",
                    title: "Invalid Image",
                    text: `${file.name} is not supported.`,
                });

                return;
            }

            if (file.size > 5 * 1024 * 1024) {

                Swal.fire({
                    icon: "warning",
                    title: "Image Too Large",
                    text: `${file.name} exceeds the 5MB limit.`,
                });

                return;
            }

            // Prevent duplicate images
            const exists = selectedImages.some(
                (img) =>
                    img.file.name === file.name &&
                    img.file.size === file.size &&
                    img.file.lastModified === file.lastModified
            );

            if (exists) {
                duplicateCount++;
                return;
            }

            newImages.push({
                file,
                preview: URL.createObjectURL(file),
            });

        });

        if (duplicateCount > 0) {

            Swal.fire({
                icon: "info",
                title: "Duplicate Images",
                text: `${duplicateCount} duplicate image(s) were skipped.`,
                timer: 1800,
                showConfirmButton: false,
            });

        }

        setSelectedImages((prev) => [...prev, ...newImages]);

        // Allow selecting the same file again
        e.target.value = "";

    };

    const removeSelectedImage = (index) => {

        setSelectedImages(prev =>
            prev.filter((_, i) => i !== index)
        );

    };

    const removeExistingImage = (index) => {

        setExistingImages(prev =>
            prev.filter((_, i) => i !== index)
        );

    };

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("publish_date", data.publish_date);
            formData.append("description", data.description || "");

            // Existing images (for edit)
            existingImages.forEach((image) => {
                formData.append("existing_images[]", image);
            });

            // New images
            selectedImages.forEach((image) => {
                formData.append("images[]", image.file);
            });

            // Attachment
            if (attachment) {

                formData.append("attachment", attachment);

            }

            if (story) {

                formData.append("_method", "PUT");

                await api.post(
                    `/stories/${story.id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

            } else {

                await api.post(
                    "/stories",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

            }

            await Swal.fire({
                icon: "success",
                title: "Success",
                text: story
                    ? "Story updated successfully."
                    : "Story created successfully.",
                timer: 1800,
                showConfirmButton: false,
            });

            onClose();

        } catch (error) {

            console.error(error);

            if (error.response?.status === 422) {

                const errors = error.response.data.errors;

                let message = "";

                Object.keys(errors).forEach((key) => {
                    message += `${errors[key][0]}\n`;
                });

                Swal.fire({
                    icon: "warning",
                    title: "Validation Error",
                    text: message,
                });

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text:
                        error.response?.data?.message ||
                        "Something went wrong.",
                });

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">

                <div className="flex items-center justify-between rounded-t-2xl border-b border-slate-200 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">

                            <BookOpenIcon className="h-6 w-6 text-white" />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-white">

                                {story ? "Edit Story" : "Create Story"}

                            </h2>

                            <p className="mt-1 text-sm text-green-100">

                                {story
                                    ? "Update the selected success story."
                                    : "Fill in the information below to create a new success story."}

                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-white/10 p-2 text-white transition-all duration-200 hover:bg-white/20 hover:rotate-90"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-6"
                >
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

                        {/* Title */}
                        <div className="col-span-4">

                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

                                <DocumentTextIcon className="h-5 w-5 text-green-600" />

                                Story Title

                            </label>

                            <div className="relative">

                                <input
                                    type="text"
                                    placeholder="Enter story title..."
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-700 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 ${errors.title
                                        ? "border-red-400 focus:ring-red-100"
                                        : "border-slate-300 focus:border-green-500 focus:ring-green-100"
                                        }`}
                                />

                            </div>

                            {errors.title && (

                                <p className="mt-2 flex items-center gap-1 text-sm text-red-600">

                                    ⚠ {errors.title.message}

                                </p>

                            )}

                        </div>

                        {/* Publish Date */}
                        <div>

                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

                                <CalendarDaysIcon className="h-5 w-5 text-green-600" />

                                Publish Date

                            </label>

                            <input
                                type="date"
                                {...register("publish_date", {
                                    required: "Publish date is required",
                                })}
                                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-700 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 ${errors.publish_date
                                    ? "border-red-400 focus:ring-red-100"
                                    : "border-slate-300 focus:border-green-500 focus:ring-green-100"
                                    }`}
                            />

                            {errors.publish_date && (

                                <p className="mt-2 flex items-center gap-1 text-sm text-red-600">

                                    ⚠ {errors.publish_date.message}

                                </p>

                            )}

                        </div>

                    </div>

                    <div>

                        <div className="mb-2 flex items-center justify-between">

                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                                <Bars3BottomLeftIcon className="h-5 w-5 text-green-600" />

                                Description

                            </label>

                            <span className="text-xs text-slate-400">
                                Optional
                            </span>

                        </div>

                        <textarea
                            rows={7}
                            placeholder="Write the success story description..."
                            {...register("description")}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 placeholder:text-slate-400 transition-all duration-200 resize-y focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100"
                        />

                        <div className="mt-2 flex items-center justify-between">

                            <p className="text-xs text-slate-500">
                                Describe the story, achievements, impact, or other relevant information.
                            </p>

                            <span className="text-xs text-slate-400">
                                Recommended: 50–500 words
                            </span>

                        </div>

                    </div>

                    {/* Image */}
                    <div className="space-y-4">

                        {/* Upload Area */}

                        <div>

                            <div className="flex items-center justify-between mb-4">

                                <div>

                                    <h3 className="text-lg font-semibold text-green-600">
                                        Story Images
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        Upload one or more images.
                                    </p>

                                </div>

                                <label className="cursor-pointer">

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />

                                    <span className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2 text-white font-medium shadow hover:bg-green-700 transition">

                                        <ImagePlus className="h-4 w-4" />

                                        Add More

                                    </span>

                                </label>

                            </div>

                            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-8 py-10 transition-all duration-300 hover:border-green-500 hover:bg-green-50">

                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 transition group-hover:scale-110">

                                    <ImagePlus className="h-8 w-8 text-green-600" />

                                </div>

                                <h3 className="text-lg font-semibold text-slate-700">
                                    Upload Story Images
                                </h3>

                                <p className="mt-2 text-center text-sm text-slate-500">
                                    Click here to browse or select multiple images.
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    JPG • PNG • WEBP (Maximum 5MB each)
                                </p>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                            </label>

                        </div>

                        {/* Existing Images */}

                        {existingImages.length > 0 && (

                            <div>

                                <div className="mb-4 flex items-center justify-between">

                                    <h3 className="text-lg font-semibold text-green-600">

                                        Existing Images

                                    </h3>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">

                                        {existingImages.length} Image(s)

                                    </span>

                                </div>

                                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">

                                    {existingImages.map((image, index) => (

                                        <div
                                            key={index}
                                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                        >

                                            <div className="relative">

                                                <img
                                                    src={image}
                                                    alt=""
                                                    className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeExistingImage(index)
                                                    }
                                                    className="absolute right-3 top-3 cursor-pointer rounded-full bg-red-600 p-2 text-white shadow-lg transition hover:bg-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        )}

                        {/* New Images */}

                        {selectedImages.length > 0 && (

                            <div>

                                <div className="mb-4 flex items-center justify-between">

                                    <h3 className="text-lg font-semibold text-green-600">

                                        Selected Images

                                    </h3>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                                        {selectedImages.length} Selected

                                    </span>

                                </div>

                                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">

                                    {selectedImages.map((image, index) => (

                                        <div
                                            key={index}
                                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                        >

                                            <div className="relative">

                                                <img
                                                    src={image.preview}
                                                    alt=""
                                                    className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeSelectedImage(index)
                                                    }
                                                    className="absolute right-3 top-3 cursor-pointer rounded-full bg-red-600 p-2 text-white shadow-lg transition hover:bg-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        )}

                    </div>

                    {/* ================= Attachment ================= */}

                    <div className="space-y-4">

                        <div className="flex items-center justify-between">

                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                                <PaperClipIcon className="h-5 w-5 text-green-600" />

                                Attachment

                            </label>

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                PDF / DOC / DOCX
                            </span>

                        </div>

                        <label className="group flex cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition-all duration-300 hover:border-green-500 hover:bg-green-50">

                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 transition group-hover:scale-110">

                                    <CloudArrowUpIcon className="h-7 w-7 text-green-600" />

                                </div>

                                <div>

                                    <h4 className="font-semibold text-slate-800">

                                        {attachmentName || "Upload Attachment"}

                                    </h4>

                                    <p className="text-sm text-slate-500">
                                        Click to browse your computer
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Maximum size: 10MB
                                    </p>

                                </div>

                            </div>

                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={(e) => {

                                    const file = e.target.files[0];

                                    if (!file) {

                                        setAttachment(null);
                                        setAttachmentName("");

                                        return;

                                    }

                                    setAttachment(file);

                                    setAttachmentName(file.name);

                                }}
                            />

                        </label>

                        {attachmentName && (

                            <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">

                                <div className="flex items-center gap-3">

                                    <DocumentTextIcon className="h-6 w-6 text-green-600" />

                                    <div>

                                        <p className="font-medium text-slate-800">

                                            {attachmentName}

                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Ready to upload
                                        </p>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={() => {

                                        setAttachment(null);

                                        setAttachmentName("");

                                    }}
                                    className="rounded-full p-2 text-red-500 transition hover:bg-red-100"
                                >

                                    <XMarkIcon className="h-5 w-5" />

                                </button>

                            </div>

                        )}

                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">

                        {/* Cancel Button */}
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <XMarkIcon className="h-5 w-5" />

                            Cancel

                        </button>

                        {/* Save Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />

                                    Saving...
                                </>
                            ) : (
                                <>
                                    <CheckCircleIcon className="h-5 w-5" />

                                    {story ? "Update Story" : "Create Story"}
                                </>
                            )}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}