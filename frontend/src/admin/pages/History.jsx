import { useEffect, useState } from "react";
import HistoryForm from "../components/history/HistoryForm";
import HistoryTable from "../components/history/HistoryTable";
import HistoryView from "../components/history/HistoryView";
import api from "../../api/api";
import { FaHistory, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

export default function HistoryAdmin() {

    const [histories, setHistories] = useState([]);

    const [editing, setEditing] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [viewItem, setViewItem] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const loadData = async () => {
        const res = await api.get("/histories");
        setHistories(res.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteHistory = async (item) => {

        const result = await Swal.fire({
            title: "Delete History?",
            text: `Delete "${item.title}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {

            Swal.fire({
                title: "Deleting...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            await api.delete(`/histories/${item.id}`);

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "History deleted successfully.",
                timer: 1800,
                showConfirmButton: false,
            });

            loadData();

        } catch (err) {

            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: err.response?.data?.message || "Something went wrong.",
            });

        }

    };

    const totalPages = Math.ceil(histories.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentHistories = histories.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <div>

            <div className="mb-4 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-700">
                        <FaHistory className="text-2xl" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-green-800">
                            History Management
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage organization timeline, milestones, and historical events.
                        </p>
                    </div>

                </div>

                <button
                    onClick={() => {
                        setEditing(null);
                        setShowForm(true);
                    }}
                    className="inline-flex items-center cursor-pointer gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white shadow-lg transition duration-200 hover:bg-green-700 hover:shadow-xl"
                >
                    <FaPlus />
                    Add History
                </button>

            </div>

            <div className="bg-white rounded-2xl shadow">

                <HistoryTable
                    histories={currentHistories}
                    onView={(item) => setViewItem(item)}
                    onEdit={(item) => {
                        console.log("Selected item:", item);
                        setEditing(item);
                        setShowForm(true);
                    }}
                    onDelete={deleteHistory}
                />

            </div>

            <div className="bg-white flex items-center rounded-2xl justify-between px-6 py-2">
                <p className="text-sm text-gray-500">
                    Showing {indexOfFirstItem + 1}–
                    {Math.min(indexOfLastItem, histories.length)} of {histories.length}
                </p>

                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="rounded-lg border text-xs px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`h-8 w-8 rounded-lg ${currentPage === i + 1
                                    ? "bg-green-600 text-white"
                                    : "border hover:bg-gray-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="rounded-lg border text-xs px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
                    >
                        Next
                    </button>
                </div>
            </div>

            {showForm && (
                <HistoryForm
                    editing={editing}
                    onClose={() => setShowForm(false)}
                    onSuccess={loadData}
                />
            )}

            {viewItem && (
                <HistoryView
                    history={viewItem}
                    onClose={() => setViewItem(null)}
                />
            )}
        </div>
    );
}