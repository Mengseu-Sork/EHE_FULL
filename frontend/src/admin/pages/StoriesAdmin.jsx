import { useEffect, useState } from "react";
import api from "../../api/api";
import Swal from "sweetalert2";
import {
    PlusIcon,
    XMarkIcon,
    BookOpenIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Table from "../components/stories/Table";
import Form from "../components/stories/Form";
import View from "../components/stories/View";

export default function StoriesAdmin() {

    const [stories, setStories] = useState([]);

    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [search, setSearch] = useState("");

    const [selectedStory, setSelectedStory] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [showView, setShowView] = useState(false);

    /**
     * Load Stories
     */
    const loadStories = async (currentPage = page) => {
        try {

            setLoading(true);

            const { data } = await api.get("/stories", {
                params: {
                    page: currentPage,
                    search,
                },
            });

            setStories(data.data);
            setLastPage(data.last_page);

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load stories.",
            });

        } finally {

            setLoading(false);

        }
    };

    /**
     * Delete Story
     */
    const deleteStory = async (id) => {

        const result = await Swal.fire({
            title: "Delete Story?",
            text: "This story will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#dc2626",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/stories/${id}`);

            await Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Story deleted successfully.",
                timer: 1800,
                showConfirmButton: false,
            });

            loadStories(page);

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: error.response?.data?.message || "Unable to delete the story.",
            });

        }

    };

    /**
     * Search
     */
    useEffect(() => {

        const timer = setTimeout(() => {

            loadStories(1);

        }, 500);

        return () => clearTimeout(timer);

    }, [search]);

    /**
     * Pagination
     */
    useEffect(() => {

        loadStories(page);

    }, [page]);

    return (

        <div className="space-y-4">

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    {/* Left */}
                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                            <BookOpenIcon className="h-7 w-7" />
                        </div>

                        <div>

                            <h1 className="text-2xl font-bold text-slate-800">
                                Success Stories
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Create, edit, and manage success stories published on your website.
                            </p>

                        </div>

                    </div>

                    {/* Right */}
                    <button
                        onClick={() => {
                            setSelectedStory(null);
                            setShowForm(true);
                        }}
                        className="inline-flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:from-green-700 hover:to-emerald-700"
                    >
                        <PlusIcon className="h-5 w-5" />

                        Add Story
                    </button>

                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                <div className="relative max-w-full">

                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search stories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-12 text-slate-700 placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100 transition"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-red-500"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    )}

                </div>

            </div>

            <Table
                stories={stories}
                loading={loading}
                onView={(story) => {
                    setSelectedStory(story);
                    setShowView(true);
                }}
                onEdit={(story) => {
                    setSelectedStory(story);
                    setShowForm(true);
                }}
                onDelete={deleteStory}
            />

            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                {/* Page Information */}
                <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">
                        Page {page}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-800">
                        {lastPage}
                    </span>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center text-xs gap-3">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="inline-flex items-center gap-2 cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-1 font-medium text-slate-700 transition-all duration-200 hover:border-green-500 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                        Previous
                    </button>

                    <div className="rounded-xl bg-green-600 px-5 py-1 font-semibold text-white shadow">
                        {page} / {lastPage}
                    </div>

                    <button
                        disabled={page === lastPage}
                        onClick={() => setPage(page + 1)}
                        className="inline-flex items-center gap-2 cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-1 font-medium text-slate-700 transition-all duration-200 hover:border-green-500 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>

                </div>

            </div>

            {
                showForm &&
                <Form
                    story={selectedStory}
                    onClose={(message = "Story saved successfully.") => {

                        setShowForm(false);

                        loadStories(page);

                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: message,
                            timer: 1800,
                            showConfirmButton: false,
                        });

                    }}
                />
            }

            {
                showView &&
                <View
                    story={selectedStory}
                    onClose={() => setShowView(false)}
                />
            }

        </div>

    );

}