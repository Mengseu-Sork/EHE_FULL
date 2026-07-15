import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";

export default function ProjectTable({
    loading,
    projects,
    onView,
    onEdit,
    onDelete,
}) {
    const storageUrl = `${import.meta.env.VITE_API_URL.replace("/api", "")}/storage`;

    const [openMenu, setOpenMenu] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const statusColors = {
        Active: "bg-green-100 text-green-700",
        Ongoing: "bg-blue-100 text-blue-700",
        Completed: "bg-purple-100 text-purple-700",
        Pending: "bg-yellow-100 text-yellow-700",
    };

    if (loading) {
        return (
            <div className="rounded-2xl bg-white p-16 text-center shadow">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>

                <p className="mt-5 text-gray-500">
                    Loading projects...
                </p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="rounded-2xl bg-white p-16 text-center shadow">
                <h3 className="text-xl font-semibold text-slate-700">
                    No Projects Found
                </h3>

                <p className="mt-2 text-slate-500">
                    Click "New Project" to create one.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

            {/* Table Header */}
            <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4">
                <h2 className="text-lg font-bold text-green-700">
                    Project List
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Total {projects.length} Projects
                </p>
            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="sticky top-0 bg-green-700 text-white">

                        <tr className="text-left">

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                Image
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                Project
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                Category
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                Status
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                Created
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {projects.map((project, index) => (

                            <tr
                                key={project.id}
                                className="transition hover:bg-emerald-50"
                            >

                                <td className="px-6 py-2 font-semibold text-slate-600">
                                    <img
                                        src={
                                            project.image
                                                ? `${storageUrl}/${project.image}`
                                                : "/images/no-image.png"
                                        }
                                        className="h-12 w-12 rounded-xl object-cover shadow"
                                        alt=""
                                    />
                                </td>

                                <td className="w-[450px] px-6 py-2">

                                    <div className="flex items-center gap-4">

                                        <div className="line-clamp-1">

                                            <h3 className="font-bold text-slate-800">
                                                {project.title}
                                            </h3>

                                        </div>

                                    </div>

                                </td>

                                <td className="px-6 py-2">

                                    <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700">
                                        {project.category}
                                    </span>

                                </td>

                                <td className="px-6 py-2">

                                    <span
                                        className={`rounded-full px-4 py-1 text-xs font-bold ${statusColors[project.status] ||
                                            "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {project.status}
                                    </span>

                                </td>

                                <td className="px-6 py-2 text-sm text-slate-500">
                                    {new Date(project.created_at).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>

                                <td className="relative px-6 py-2">

                                    <div ref={menuRef} className="flex justify-center">

                                        <button
                                            onClick={() =>
                                                setOpenMenu(openMenu === project.id ? null : project.id)
                                            }
                                            className="rounded-lg p-2 transition hover:bg-slate-100"
                                        >
                                            <EllipsisVerticalIcon className="h-6 w-6 text-slate-600" />
                                        </button>

                                        {openMenu === project.id && (
                                            <div className="absolute right-8 top-10 z-50 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                                                <button
                                                    onClick={() => {
                                                        onView(project);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-slate-100"
                                                >
                                                    <EyeIcon className="h-5 w-5 text-blue-600" />

                                                </button>

                                                <button
                                                    onClick={() => {
                                                        onEdit(project);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-slate-100"
                                                >
                                                    <PencilSquareIcon className="h-5 w-5 text-amber-600" />

                                                </button>

                                                <button
                                                    onClick={() => {
                                                        onDelete(project);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <TrashIcon className="h-5 w-5" />

                                                </button>

                                            </div>
                                        )}

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}