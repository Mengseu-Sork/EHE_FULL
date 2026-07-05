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

    return (
        <div>

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-700">
                        <FaHistory className="text-2xl" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-green-800">
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
                    className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white shadow-lg transition duration-200 hover:bg-green-700 hover:shadow-xl"
                >
                    <FaPlus />
                    Add History
                </button>

            </div>

            <div className="bg-white rounded-2xl shadow">

                <HistoryTable
                    histories={histories}
                    onView={(item) => setViewItem(item)}
                    onEdit={(item) => {
                        setEditing(item);
                        setShowForm(true);
                    }}
                    onDelete={deleteHistory}
                />

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