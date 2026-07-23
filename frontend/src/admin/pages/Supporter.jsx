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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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

    const totalPages = Math.ceil(supporters.length / itemsPerPage);

    const currentSupporters = supporters.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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

                        <h1 className="text-2xl font-bold text-gray-800">
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
                        className="inline-flex items-center cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    >
                        <FaPlus />

                        Add
                    </button>

                </div>

            </div>

            {/* Table */}

            <SupporterTable
                supporters={currentSupporters}
                onView={(item) => setViewItem(item)}
                onEdit={(item) => {
                    setEditing(item);
                    setShowForm(true);
                }}
                onDelete={handleDelete}
            />

            {totalPages > 1 && (
                <div className="mt-2 flex items-center justify-between rounded-b-2xl border-t bg-white p-2">
                    <p className="text-sm text-gray-500">
                        Showing {(currentPage - 1) * itemsPerPage + 1}–
                        {Math.min(currentPage * itemsPerPage, supporters.length)} of{" "}
                        {supporters.length}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => p - 1)}
                            disabled={currentPage === 1}
                            className="rounded-lg border px-3 py-2 text-xs transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`h-10 w-10 rounded-lg text-xs font-medium transition ${currentPage === i + 1
                                        ? "bg-green-600 text-white"
                                        : "border hover:bg-gray-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-lg border px-3 py-2 text-xs transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

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