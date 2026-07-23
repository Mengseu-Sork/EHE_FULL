// src/admin/components/documents/Form.jsx

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import api from "../../../api/api";

const DOCUMENT_TYPES = [
    "Bi-Monthly Newsletter",
    "Publication",
    "Report",
    "Annual Report",
    "Position Paper",
];

export default function DocumentForm({
    editDoc,
    setEditDoc,
    onSuccess,
    onClose,
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: "",
            type: "",
            year: new Date().getFullYear(),
        },
    });

    // Load edit data
    useEffect(() => {
        if (editDoc) {
            reset({
                title: editDoc.title ?? "",
                type: editDoc.type ?? "",
                year: editDoc.year ?? "",
            });
        } else {
            reset({
                title: "",
                type: "",
                year: new Date().getFullYear(),
            });
        }
    }, [editDoc, reset]);

    // Submit Form
    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("type", data.type);
        formData.append("year", data.year);

        if (data.khmer_file?.[0]) {
            formData.append("khmer_file", data.khmer_file[0]);
        }

        if (data.english_file?.[0]) {
            formData.append("english_file", data.english_file[0]);
        }

        try {
            if (editDoc) {
                formData.append("_method", "PUT");

                await api.post(
                    `/documents/${editDoc.id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            } else {
                await api.post(
                    "/documents",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            Swal.fire({
                icon: "success",
                title: editDoc
                    ? "Document Updated Successfully"
                    : "Document Created Successfully",
                timer: 1800,
                showConfirmButton: false,
            });

            reset();

            setEditDoc(null);

            if (onSuccess) {
                onSuccess();
            }

        } catch (err) {
            console.error(err);

            Swal.fire({
                icon: "error",
                title: "Save Failed",
                text:
                    err.response?.data?.message ??
                    "Unable to save document.",
            });
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            encType="multipart/form-data"
        >
            {/* Title */}
            <div>
                <label className="block mb-1 text-sm font-semibold text-slate-700">
                    Title <span className="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    {...register("title", {
                        required: "Title is required",
                    })}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                    placeholder="Enter document title"
                />

                {errors.title && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Type */}
                <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                        Document Type <span className="text-red-500">*</span>
                    </label>

                    <select
                        {...register("type", {
                            required: "Please select a document type",
                        })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                    >
                        <option value="" disabled>
                            Select Type
                        </option>

                        {DOCUMENT_TYPES.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    {errors.type && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.type.message}
                        </p>
                    )}
                </div>

                {/* Year */}
                <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                        Publication Year <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="number"
                        min="1900"
                        max={new Date().getFullYear() + 10}
                        placeholder={new Date().getFullYear()}
                        {...register("year", {
                            required: "Year is required",
                            min: {
                                value: 1900,
                                message: "Invalid year",
                            },
                            max: {
                                value: new Date().getFullYear() + 10,
                                message: "Invalid year",
                            },
                        })}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                    />

                    {errors.year && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.year.message}
                        </p>
                    )}
                </div>

            </div>

            {/* Khmer File */}
            <div>
                <label className="block mb-1 text-sm font-semibold text-slate-700">
                    Khmer File (PDF)
                </label>

                <input
                    type="file"
                    accept=".pdf"
                    {...register("khmer_file")}
                    className="block w-full rounded-lg border border-slate-300 file:mr-4 file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-white hover:file:bg-green-700"
                />

                {editDoc?.khmer_file && (
                    <p className="mt-2 text-xs text-slate-500">
                        Current: {editDoc.khmer_file}
                    </p>
                )}
            </div>

            {/* English File */}
            <div>
                <label className="block mb-1 text-sm font-semibold text-slate-700">
                    English File (PDF)
                </label>

                <input
                    type="file"
                    accept=".pdf"
                    {...register("english_file")}
                    className="block w-full rounded-lg border border-slate-300 file:mr-4 file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
                />

                {editDoc?.english_file && (
                    <p className="mt-2 text-xs text-slate-500">
                        Current: {editDoc.english_file}
                    </p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">

                <button
                    type="button"
                    onClick={() => {
                        reset();
                        setEditDoc(null);

                        if (onClose) {
                            onClose();
                        }
                    }}
                    className="rounded-lg border cursor-pointer border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-100"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`rounded-lg px-6 py-2 font-semibold cursor-pointer text-white transition ${isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {isSubmitting
                        ? "Saving..."
                        : editDoc
                            ? "Update Document"
                            : "Create Document"}
                </button>

            </div>
        </form>
    );
}