import React, { useEffect, useState, useMemo } from "react";
import api from "../../api/api";
import Swal from "sweetalert2";

import DocumentForm from "../components/documents/Form";
import DocumentTable from "../components/documents/Table";
import DocumentFilters from "../components/documents/Filters";

export default function DocumentsAdmin() {
    const [documents, setDocuments] = useState([]);
    const [editDoc, setEditDoc] = useState(null);
    const [filters, setFilters] = useState({
        title: "",
        type: "",
        year: "",
    });

    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Pagination
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
    });

    // Available document types
    const availableTypes = useMemo(() => {
        return [...new Set(documents.map(doc => doc.type).filter(Boolean))].sort();
    }, [documents]);

    // Fetch documents
    const fetchDocuments = async (page = 1) => {
        try {
            setLoading(true);

            const { data } = await api.get("/documents", {
                params: {
                    title: filters.title,
                    type: filters.type,
                    year: filters.year,
                    page,
                },
            });

            if (Array.isArray(data)) {
                setDocuments(data);

                setPagination({
                    current_page: 1,
                    last_page: 1,
                    total: data.length,
                });
            } else {
                setDocuments(data.data ?? []);

                setPagination({
                    current_page: data.current_page ?? 1,
                    last_page: data.last_page ?? 1,
                    total: data.total ?? 0,
                });
            }
        } catch (err) {
            console.error(err);

            Swal.fire({
                icon: "error",
                title: "Request Failed",
                text:
                    err.response?.data?.message ??
                    "Unable to load documents.",
                confirmButtonColor: "#15803d",
            });
        } finally {
            setLoading(false);
        }
    };

    // Refresh current page
    const refreshDocuments = () => {
        fetchDocuments(pagination.current_page);
    };

    // Initial load
    useEffect(() => {
        fetchDocuments();
    }, []);

    // Search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDocuments(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [filters]);

    return (
        <div className="min-h-full bg-slate-100">
            <div className="max-w-full mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3 p-4 bg-white rounded-lg">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <svg
                                    className="w-8 h-8 text-green-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h1 className="text-2xl font-extrabold text-green-700">
                                    Documents
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Manage joint statements and other documents.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        onClick={() => {
                            setEditDoc(null);
                            setShowForm(true);
                        }}
                        className={`group flex items-center gap-2 px-7 py-3 rounded-full text-xs font-black uppercase tracking-[0.15em] shadow-xl transition-all duration-300

                    ${loading
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-gray-900 text-white hover:bg-green-600 hover:scale-105"
                            }`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>

                        <span>Create</span>
                    </button>
                </div>

                {/* FILTERS */}
                <div className="mb-4">
                    <DocumentFilters
                        filters={filters}
                        setFilters={setFilters}
                        availableTypes={availableTypes}
                        onSearch={() => fetchDocuments(1)}
                        loading={loading}
                    />
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b">

                        <div>
                            <h2 className="font-bold text-lg text-green-700">
                                Documents List
                            </h2>

                            <p className="text-sm text-slate-500">
                                Total Documents : {pagination.total}
                            </p>
                        </div>

                        {loading && (
                            <div className="flex items-center gap-2 text-green-600">
                                <svg
                                    className="animate-spin h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    />
                                </svg>

                                <span className="text-sm">
                                    Loading...
                                </span>
                            </div>
                        )}

                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">

                        {!loading && documents.length === 0 ? (

                            <div className="py-16 text-center">

                                <svg
                                    className="mx-auto w-16 h-16 text-slate-300 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M9 12h6m-6 4h6M7 4h8l2 2v14H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                                    />
                                </svg>

                                <h3 className="font-semibold text-slate-600">
                                    No Documents Found
                                </h3>

                                <p className="text-sm text-slate-400 mt-2">
                                    Try changing your search or create a new document.
                                </p>

                            </div>

                        ) : (

                            <DocumentTable
                                documents={documents}
                                setEditDoc={(doc) => {
                                    setEditDoc(doc);
                                    setShowForm(true);
                                }}
                                onDelete={refreshDocuments}
                            />

                        )}

                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-3 bg-slate-50 flex items-center justify-between">

                        <div className="text-sm text-slate-600">
                            Page <strong>{pagination.current_page}</strong> of{" "}
                            <strong>{pagination.last_page}</strong>
                        </div>

                        <div className="flex gap-2">

                            <button
                                disabled={pagination.current_page === 1}
                                onClick={() =>
                                    fetchDocuments(pagination.current_page - 1)
                                }
                                className="px-4 py-1 rounded-lg text-xs border disabled:opacity-40 hover:bg-green-50"
                            >
                                Prev
                            </button>

                            <button
                                disabled={
                                    pagination.current_page >= pagination.last_page
                                }
                                onClick={() =>
                                    fetchDocuments(pagination.current_page + 1)
                                }
                                className="px-4 py-1 rounded-lg text-xs border disabled:opacity-40 hover:bg-green-50"
                            >
                                Next
                            </button>

                        </div>

                    </div>

                </div>
            </div>

            {/* Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">

                        <button
                            onClick={() => {
                                setShowForm(false);
                                setEditDoc(null);
                            }}
                            className="absolute top-4 cursor-pointer right-4 text-red-500 hover:text-red-700 text-xl"
                        >
                            ✕
                        </button>

                        <DocumentForm
                            editDoc={editDoc}
                            setEditDoc={setEditDoc}
                            onSuccess={() => {
                                refreshDocuments();
                                setShowForm(false);
                                setEditDoc(null);
                            }}
                            onClose={() => {
                                setShowForm(false);
                                setEditDoc(null);
                            }}
                        />

                    </div>

                </div>
            )}
        </div>
    );
}
