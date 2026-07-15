import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../../api/api";
import {
    FolderOpenIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function ProjectForm({
    open,
    project,
    onClose,
    onSuccess,
}) {
    const [form, setForm] = useState({
        title: "",
        category: "",
        status: "Active",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (project) {
            setForm({
                title: project.title || "",
                category: project.category || "",
                status: project.status || "Active",
                description: project.description || "",
            });

            if (project.image) {
                setPreview(
                    `${import.meta.env.VITE_API_URL.replace(
                        "/api",
                        ""
                    )}/storage/${project.image}`
                );
            } else {
                setPreview("");
            }

            setImage(null);
        } else {
            setForm({
                title: "",
                category: "",
                status: "Active",
                description: "",
            });

            setImage(null);
            setPreview("");
        }
    }, [project]);

    const handleSubmit = async () => {
        if (!form.title.trim()) {
            return Swal.fire({
                icon: "warning",
                title: "Validation",
                text: "Project title is required.",
            });
        }

        if (!form.category.trim()) {
            return Swal.fire({
                icon: "warning",
                title: "Validation",
                text: "Category is required.",
            });
        }

        if (!form.description.trim()) {
            return Swal.fire({
                icon: "warning",
                title: "Validation",
                text: "Description is required.",
            });
        }

        try {
            setSaving(true);

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("category", form.category);
            formData.append("status", form.status);
            formData.append("description", form.description);

            if (image) {
                formData.append("image", image);
            }

            if (project) {
                await api.post(
                    `/projects/${project.id}?_method=PUT`,
                    formData
                );

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Project updated successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                await api.post("/projects", formData);

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Project created successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }

            onSuccess();

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    "Something went wrong.",
            });

        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const categories = [
        "Environment",
        "Community",
        "Education",
        "Health",
        "Livelihood",
        "Natural Resource Protection",
        "Community Development",
        "Education & Health",
        "Capacity Building",
    ];

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-8 py-6">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                            <FolderOpenIcon className="h-8 w-8 text-white" />
                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-white">
                                {project ? "Edit Project" : "Create New Project"}
                            </h2>

                            <p className="mt-1 text-sm text-emerald-100">
                                {project
                                    ? "Update project information."
                                    : "Fill in the project information below."}
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white transition hover:bg-red-500"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>

                </div>

                {/* Body */}

                <div className="space-y-6 p-6">

                    {/* Title */}

                    <div>
                        <label className="mb-2 block font-semibold">
                            Project Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-emerald-600 focus:outline-none"
                            placeholder="Project title"
                        />
                    </div>

                    {/* Category */}

                    <div>
                        <label className="mb-2 block font-semibold">
                            Category
                        </label>

                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-emerald-600 focus:outline-none"
                        >

                            <option value="" disabled>
                                Select Category
                            </option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}

                    <div>
                        <label className="mb-2 block font-semibold">
                            Status
                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-emerald-600 focus:outline-none"
                        >
                            <option value="Active">Active</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>

                    {/* Image */}

                    <div>
                        <label className="mb-2 block font-semibold">
                            Project Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            className="w-full rounded-xl border border-gray-300 p-3"
                            onChange={(e) => {
                                const file = e.target.files[0];

                                if (!file) return;

                                setImage(file);

                                setPreview(URL.createObjectURL(file));
                            }}
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-4 h-64 w-full rounded-xl border object-cover"
                            />
                        )}
                    </div>

                    {/* Description */}

                    <div>
                        <label className="mb-2 block font-semibold">
                            Description
                        </label>

                        <textarea
                            rows="4"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-emerald-600 focus:outline-none"
                            placeholder="Project description..."
                        />
                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 px-6 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-gray-300 px-6 py-3 text-white bg-orange-300 font-semibold hover:bg-orange-500"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={saving}
                        onClick={handleSubmit}
                        className="rounded-xl cursor-pointer bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving
                            ? "Saving..."
                            : project
                                ? "Update"
                                : "Create"}
                    </button>

                </div>

            </div>
        </div>
    );
}
