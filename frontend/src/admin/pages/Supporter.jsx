import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import api from "../../api/api";
import {
    FaPlus,
    FaHandshake,
} from "react-icons/fa";

import SupporterTable from "../components/support/SupporterTable";
import SupporterForm from "../components/support/SupporterForm";
import SupporterView from "../components/support/SupporterView";

export default function Supporter() {
    const [supporters, setSupporters] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editing, setEditing] = useState(null);

    const [viewItem, setViewItem] = useState(null);

    useEffect(() => {
        loadSupporters();
    }, []);

    const loadSupporters = async () => {
        try {
            const res = await api.get("/supporters");

            setSupporters(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (item) => {
        const result = await Swal.fire({
            title: "Delete Supporter?",
            text: `Are you sure you want to delete "${item.name}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        });

        if (!result.isConfirmed) return;

        try {
            await api.delete(`/supporters/${item.id}`);

            Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Supporter deleted successfully.",
                timer: 1500,
                showConfirmButton: false,
            });

            loadSupporters();
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text:
                    err.response?.data?.message ||
                    "Something went wrong.",
            });
        }
    };

    return (
        <div className="space-y-4">

            {/* Header */}

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

                {/* Left */}

                <div className="flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg">

                        <FaHandshake className="text-2xl text-white" />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Supporters
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Manage supporter organizations and their logos.
                        </p>

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => {
                            setEditing(null);
                            setShowForm(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    >
                        <FaPlus />

                        Add
                    </button>

                </div>

            </div>

            {/* Table */}

            <SupporterTable
                supporters={supporters}
                onView={(item) => setViewItem(item)}
                onEdit={(item) => {
                    setEditing(item);
                    setShowForm(true);
                }}
                onDelete={handleDelete}
            />

            {/* Form */}

            {showForm && (
                <SupporterForm
                    editing={editing}
                    onClose={() => setShowForm(false)}
                    onSuccess={loadSupporters}
                />
            )}

            {/* View */}

            {viewItem && (
                <SupporterView
                    supporter={viewItem}
                    onClose={() => setViewItem(null)}
                />
            )}

        </div>
    );
}