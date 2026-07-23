import {
    FaEdit,
    FaTrash,
    FaCalendarAlt,
    FaImage,
    FaEye,
    FaEllipsisV,
} from "react-icons/fa";

import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../api/api";

export default function DocumentTable({
    documents,
    setEditDoc,
    onDelete,
}) {

    const deleteDocument = async (id) => {
        const result = await Swal.fire({
            title: "Delete Document?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await api.delete(`/documents/${id}`);

            Swal.fire({
                icon: "success",
                title: "Deleted Successfully",
                timer: 1500,
                showConfirmButton: false,
            });

            onDelete();
        } catch (err) {
            console.error(err);

            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text:
                    err.response?.data?.message ||
                    "Unable to delete this document.",
            });
        }
    };

    const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!documents.length) {
        return (
            <div className="px-4 py-6 text-center text-sm text-slate-500">
                No documents found.
            </div>
        );
    }

    return (
        <div>
            <table className="w-full text-sm">
                <thead className="bg-green-700 text-white">
                    <tr>
                        <th className="px-4 py-3 text-left font-medium">Title</th>
                        <th className="px-4 py-3 text-left font-medium">Type</th>
                        <th className="px-4 py-3 text-left font-medium">Year</th>
                        <th className="px-4 py-3 text-left font-medium">Files</th>
                        <th className="px-4 py-3 text-center font-medium">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                    {documents.length === 0 ? (
                        <tr>
                            <td
                                colSpan="5"
                                className="py-8 text-center text-slate-500"
                            >
                                No documents found.
                            </td>
                        </tr>
                    ) : (
                        documents.map((doc) => (
                            <tr
                                key={doc.id}
                                className="hover:bg-slate-50 transition"
                            >
                                <td className="px-4 py-3 w-[500px] line-clamp-1">
                                    {doc.title}
                                </td>

                                <td className="px-4 py-3">
                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                        {doc.type}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <span className="rounded bg-slate-100 px-2 py-1 text-xs">
                                        {doc.year}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex gap-2">

                                        {doc.khmer_file && (
                                            <a
                                                href={`${STORAGE_URL}/${doc.khmer_file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
                                            >
                                                KH
                                            </a>
                                        )}

                                        {doc.english_file && (
                                            <a
                                                href={`${STORAGE_URL}/${doc.english_file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-200"
                                            >
                                                EN
                                            </a>
                                        )}

                                    </div>
                                </td>

                                <td className="relative px-4 py-3">
                                    <div className="flex justify-center">

                                        <button
                                            onClick={() =>
                                                setOpenMenu(openMenu === doc.id ? null : doc.id)
                                            }
                                            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                                        >
                                            <FaEllipsisV className="text-sm" />
                                        </button>

                                        {openMenu === doc.id && (
                                            <div className="absolute right-8 top-8 z-50 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">

                                                <button
                                                    onClick={() => {
                                                        setEditDoc(doc);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                                                >
                                                    <FaEdit className="text-blue-600" />
                                                   
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        deleteDocument(doc.id);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition"
                                                >
                                                    <FaTrash className="text-red-600" />
                                                    
                                                </button>

                                            </div>
                                        )}

                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
