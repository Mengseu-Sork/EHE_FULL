import { useEffect, useMemo, useState } from "react";
import {
    PlusIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

import api from "../../api/api";

import ProjectTable from "../components/project/ProjectTable";
import ProjectForm from "../components/project/ProjectForm";
import ProjectModal from "../components/project/ProjectModal";

export default function Project() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const [viewProject, setViewProject] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);

            const { data } = await api.get("/projects");

            setProjects(data);
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load projects.",
            });
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = useMemo(() => {
        return projects.filter((item) => {
            return (
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase()) ||
                item.status.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [projects, search]);

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    const currentProjects = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProjects.slice(start, start + itemsPerPage);
    }, [filteredProjects, currentPage]);

    const handleCreate = () => {
        setEditingProject(null);
        setShowForm(true);
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const handleView = (project) => {
        setViewProject(project);
    };

    const handleDelete = async (project) => {
        const result = await Swal.fire({
            title: "Delete Project?",
            text: `Are you sure you want to delete it?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "orange",
        });

        if (!result.isConfirmed) return;

        try {
            await api.delete(`/projects/${project.id}`);

            await Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Project deleted successfully.",
                timer: 1500,
                showConfirmButton: false,
            });

            loadProjects();
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to delete project.",
            });
        }
    };

    return (
        <div className="space-y-4">

            {/* Header */}
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white via-emerald-50 to-white p-6 shadow-sm">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left */}
                    <div className="flex items-start gap-4">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg">
                            <svg
                                className="h-8 w-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4m-18 5l9 4 9-4"
                                />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-green-700">
                                Project Management
                            </h1>

                            <p className="mt-2 max-w-2xl text-slate-500">
                                Create, update, organize, and manage all organization
                                projects from one place.
                            </p>

                        </div>

                    </div>

                    {/* Right */}
                    <button
                        onClick={handleCreate}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl"
                    >
                        <PlusIcon className="h-5 w-5" />

                        Add New
                    </button>

                </div>

            </div>

            {/* Search */}
            <div className="relative">

                <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}

                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 focus:border-emerald-600 focus:outline-none"
                />

            </div>

            {/* Table */}
            <ProjectTable
                loading={loading}
                projects={currentProjects}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {totalPages > 1 && (
                <div className="mt-2 flex items-center justify-between p-2">
                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        {(currentPage - 1) * itemsPerPage + 1}
                        –
                        {Math.min(currentPage * itemsPerPage, filteredProjects.length)}
                        {" "}of {filteredProjects.length} projects
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => p - 1)}
                            disabled={currentPage === 1}
                            className="rounded-lg border text-xs px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`h-10 w-10 rounded-lg text-xs font-medium transition ${currentPage === i + 1
                                    ? "bg-emerald-600 text-white"
                                    : "border hover:bg-gray-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-lg border px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Create / Edit */}
            <ProjectForm
                open={showForm}
                project={editingProject}
                onClose={() => {
                    setShowForm(false);
                    setEditingProject(null);
                }}
                onSuccess={() => {
                    setShowForm(false);
                    setEditingProject(null);
                    loadProjects();
                }}
            />

            {/* View */}
            <ProjectModal
                project={viewProject}
                onClose={() => setViewProject(null)}
            />

        </div>
    );
}