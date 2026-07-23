import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    FaSave,
    FaTimes,
    FaUpload,
    FaHandshake,
} from "react-icons/fa";

import api from "../../../api/api";

export default function SupporterForm({
    editing,
    onClose,
    onSuccess,
}) {
    const [form, setForm] = useState({
        name: "",
        category: "",
        description: "",
        website: "",
        is_active: true,
    });

    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if (editing) {
            setForm({
                name: editing.name || "",
                category: editing.category || "",
                description: editing.description || "",
                website: editing.website || "",
                is_active: editing.is_active,
            });
        }
    }, [editing]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("name", form.name);
        data.append("category", form.category);
        data.append("description", form.description);
        data.append("website", form.website);
        data.append(
            "is_active",
            form.is_active ? 1 : 0
        );

        if (logo) {
            data.append("logo", logo);
        }

        try {
            Swal.fire({
                title: editing
                    ? "Updating..."
                    : "Saving...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            if (editing) {
                data.append("_method", "PUT");

                await api.post(
                    `/supporters/${editing.id}`,
                    data,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );
            } else {
                await api.post(
                    "/supporters",
                    data,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );
            }

            Swal.fire({
                icon: "success",
                title: editing
                    ? "Updated Successfully"
                    : "Created Successfully",
                timer: 1500,
                showConfirmButton: false,
            });

            onSuccess();
            onClose();
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    err.response?.data?.message ||
                    "Something went wrong.",
            });

            console.log(err.response?.data);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

            <div className="w-full max-w-3xl rounded-2xl overflow-auto h-[90vh] bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center rounded-2xl justify-between border-b bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 text-white">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">

                            <FaHandshake className="text-xl" />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold">

                                {editing
                                    ? "Edit Supporter"
                                    : "New Supporter"}

                            </h2>

                            <p className="text-sm text-green-100">

                                Add or update supporter information

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 cursor-pointer transition hover:bg-white/20"
                    >
                        <FaTimes />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8 p-6"
                >

                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* Left Side - Logo */}

                        <div className="lg:col-span-1">

                            <label className="mb-3 block text-sm font-semibold text-gray-700">
                                Supporter Logo
                            </label>

                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

                                <div className="flex flex-col items-center">

                                    <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border bg-white shadow-sm">

                                        {logo ? (

                                            <img
                                                src={URL.createObjectURL(logo)}
                                                alt="Preview"
                                                className="h-full w-full object-contain p-4"
                                            />

                                        ) : editing?.logo ? (

                                            <img
                                                src={editing.logo}
                                                alt={editing.name}
                                                className="h-full w-full object-contain p-4"
                                            />

                                        ) : (

                                            <div className="text-center">

                                                <FaUpload
                                                    size={38}
                                                    className="mx-auto text-gray-300"
                                                />

                                                <p className="mt-3 text-sm text-gray-500">
                                                    No Logo
                                                </p>

                                            </div>

                                        )}

                                    </div>

                                    <label className="mt-6 cursor-pointer rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700">

                                        <div className="flex items-center gap-2">

                                            <FaUpload />

                                            Choose Logo

                                        </div>

                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) =>
                                                setLogo(e.target.files[0])
                                            }
                                        />

                                    </label>

                                    <p className="mt-3 text-xs text-gray-400">
                                        PNG, JPG, WEBP (Max 2MB)
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Right Side */}

                        <div className="space-y-6 lg:col-span-2">

                            {/* Name */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Supporter Name *
                                </label>

                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 transition focus:border-green-600 focus:outline-none focus:ring-4 focus:ring-green-100"
                                    placeholder="Enter supporter name"
                                    required
                                />

                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Category *
                                </label>

                                <select
                                    value={form.category}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            category: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Partner">Partner</option>
                                    <option value="Donor">Donor</option>
                                    <option value="NGO Network">NGO Network</option>
                                </select>
                            </div>

                            {/* Website */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Website
                                </label>

                                <input
                                    type="url"
                                    value={form.website}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            website: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 transition focus:border-green-600 focus:outline-none focus:ring-4 focus:ring-green-100"
                                    placeholder="https://example.org"
                                />

                            </div>


                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Description
                                </label>

                                <textarea
                                    rows={2}
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 transition focus:border-green-600 focus:outline-none focus:ring-4 focus:ring-green-100"
                                    placeholder="Organization description..."
                                />
                            </div>

                            {/* Status */}

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h4 className="font-semibold text-gray-800">
                                            Status
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            Enable or disable this supporter.
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm({
                                                ...form,
                                                is_active: !form.is_active,
                                            })
                                        }
                                        className={`relative h-7 w-14 rounded-full transition ${form.is_active
                                            ? "bg-green-600"
                                            : "bg-gray-300"
                                            }`}
                                    >

                                        <span
                                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${form.is_active
                                                ? "left-8"
                                                : "left-1"
                                                }`}
                                        />

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">

                        <div className="text-sm text-gray-500">

                            {editing
                                ? "Update supporter information."
                                : "Create a new supporter."}

                        </div>

                        <div className="flex items-center gap-3">

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl border cursor-pointer border-gray-300 bg-orange-300 px-6 py-3 font-medium text-white transition hover:bg-orange-500"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-7 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                            >

                                <FaSave />

                                {editing
                                    ? "Update"
                                    : "Save"}

                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    );
}