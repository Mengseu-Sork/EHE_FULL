import React, { useEffect, useState } from "react";
import api from "../../api/api";
import PDFThumbnail from "../components/PDFThumbnail";
import Header from "../components/Header"


export default function LibraryDocuments() {
    const [documents, setDocuments] = useState([]);
    const [types, setTypes] = useState([]);
    const [years, setYears] = useState([]);

    const [filterType, setFilterType] = useState("");
    const [filterYear, setFilterYear] = useState("");

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const STORAGE_URL = import.meta.env.VITE_FILE;

    const fileUrl = (path) => {
        if (!path) return null;

        return `${STORAGE_URL}/${path}`;
    };

    /**
     * Load Documents
     */
    const loadDocuments = async () => {
        try {
            setLoading(true);

            const { data } = await api.get("/documents", {
                params: {
                    type: filterType || undefined,
                    year: filterYear || undefined,
                    page,
                },
            });

            console.log(data);

            const docs = data.data ?? [];

            setDocuments(docs);
            setLastPage(data.last_page ?? 1);

            setTypes(
                [...new Set(docs.map(doc => doc.type).filter(Boolean))]
            );

            setYears(
                [...new Set(docs.map(doc => doc.year).filter(Boolean))]
                    .sort((a, b) => b - a)
            );

        } catch (err) {
            console.error(err);
            setDocuments([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Reload when page changes
     */
    useEffect(() => {
        loadDocuments(page);
    }, [page]);

    /**
     * Reset to page 1 when filter changes
     */
    useEffect(() => {
        setPage(1);
    }, [filterType, filterYear]);

    /**
     * Reload after filter changes
     */
    useEffect(() => {
        if (page === 1) {
            loadDocuments(1);
        }
    }, [filterType, filterYear]);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">

            {/* HEADER SECTION */}
            <Header />

            {/* CONTENT */}
            <div className="max-w-full mx-auto px-4 py-6">

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">

                    {/* ================= FILTER ================= */}
                    <aside className="lg:col-span-1">

                        <div className="sticky top-28 rounded-2xl bg-white shadow-lg border border-gray-100 p-6">

                            <h2 className="text-base lg:text-xl font-bold text-green-700 mb-6">
                                Filter Documents
                            </h2>

                            <div className="space-y-5">

                                <div>
                                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                                        Document Type
                                    </label>

                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="w-full rounded-xl text-xs lg:text-sm border border-gray-300 px-4 py-1 md:py-3 focus:ring-2 focus:ring-green-600 focus:border-green-600"
                                    >
                                        <option value="">All Types</option>

                                        {types.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                                        Publication Year
                                    </label>

                                    <select
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                        className="w-full rounded-xl border text-xs lg:text-sm border-gray-300 px-4 py-1 md:py-3 focus:ring-2 focus:ring-green-600 focus:border-green-600"
                                    >
                                        <option value="">All Years</option>

                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={() => {
                                        setFilterType("");
                                        setFilterYear("");
                                    }}
                                    className="w-full rounded-xl bg-green-700 text-xs lg:text-sm py-1 md:py-3 font-semibold text-white hover:bg-green-800 transition"
                                >
                                    Reset Filter
                                </button>

                            </div>

                        </div>

                    </aside>

                    {/* ================= DOCUMENTS ================= */}

                    <section className="md:col-span-3 lg:col-span-4 p-2 md:p-0">

                        {loading ? (

                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-[420px] rounded-3xl bg-gray-200 animate-pulse"
                                    />
                                ))}

                            </div>

                        ) : documents.length === 0 ? (

                            <div className="rounded-3xl bg-white py-24 text-center shadow">

                                <h2 className="text-2xl font-bold text-gray-500">
                                    No Documents Found
                                </h2>

                                <p className="mt-3 text-gray-400">
                                    Try changing the filter.
                                </p>

                            </div>

                        ) : (

                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

                                {documents.map((doc) => (

                                    <div
                                        key={doc.id}
                                        className="relative bg-white rounded-br-3xl rounded-bl-3xl 
                                        shadow-md hover:shadow-xl hover:scale-[1.05]
                                        transition-all duration-300 flex flex-col"
                                    >
                                        <div className="absolute bg-green-700 text-white text-xs px-3 py-1 border-t border-t-gray-200 rounded-br-3xl">
                                            {doc.type}
                                        </div>

                                        {doc.khmer_file ? (
                                            <PDFThumbnail
                                                key={doc.khmer_file}
                                                fileUrl={fileUrl(doc.khmer_file)}
                                            />
                                        ) : (
                                            doc.english_file && (
                                                <PDFThumbnail
                                                    key={doc.english_file}
                                                    fileUrl={fileUrl(doc.english_file)}
                                                />
                                            )
                                        )}

                                        <p className="mt-2 text-center text-xs md:text-sm font-semibold text-gray-800 line-clamp-1 px-4">
                                            {doc.title}
                                        </p>

                                        <div className="flex justify-center text-xs md:text-sm gap-8 mt-4 text-gray-700 pb-4">
                                            {doc.khmer_file ? (
                                                <a
                                                    href={fileUrl(doc.khmer_file)}
                                                    target="_blank"
                                                    className="hover:text-green-700"
                                                >
                                                    ⬇ KH
                                                </a>
                                            ) : (
                                                <span className="opacity-40">KH</span>
                                            )}
                                            {doc.english_file ? (
                                                <a
                                                    href={fileUrl(doc.english_file)}
                                                    target="_blank"
                                                    className="hover:text-green-700"
                                                >
                                                    ⬇ EN
                                                </a>
                                            ) : (
                                                <span className="opacity-40">EN</span>
                                            )}
                                        </div>
                                    </div>

                                ))}

                            </div>

                        )}

                    </section>

                </div>

            </div>

            {/* PAGINATION */}

            {lastPage > 1 && (

                <div className="mt-12 flex justify-center gap-2">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="rounded-xl border px-4 py-2 disabled:opacity-40"
                    >
                        Previous
                    </button>

                    {Array.from({ length: lastPage }, (_, i) => (

                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`h-10 w-10 rounded-xl font-semibold transition
                                ${page === i + 1
                                    ? "bg-green-700 text-white"
                                    : "bg-white border hover:bg-green-50"
                                }`}
                        >
                            {i + 1}
                        </button>

                    ))}

                    <button
                        disabled={page === lastPage}
                        onClick={() => setPage(page + 1)}
                        className="rounded-xl border px-4 py-2 disabled:opacity-40"
                    >
                        Next
                    </button>

                </div>

            )}
        </div>
    );
}