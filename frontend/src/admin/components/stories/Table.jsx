import {
    Download,
    FileText,
    ImageOff,
} from "lucide-react";

import {
    DocumentTextIcon,
    CalendarDaysIcon,
    PaperClipIcon,
    Cog6ToothIcon,
    EyeIcon,
    PencilSquareIcon,
    EllipsisVerticalIcon,
    TrashIcon,
    PhotoIcon,
    FolderOpenIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";



const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

export default function Table({
    stories = [],
    loading = false,
    onView,
    onEdit,
    onDelete,
}) {
    const imageUrl = (images) => {
        if (!images?.length) return null;

        return images[0];
    };

    const attachmentUrl = (file) => {
        if (!file) return null;

        return `${STORAGE_URL}/${file}`;
    };

    const [openMenu, setOpenMenu] = useState(null);

    if (loading) {
        return (
            <div className="rounded-xl border bg-white p-10 text-center">
                <div className="text-gray-500">
                    Loading stories...
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-sm">

                        <tr>

                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">

                                <div className="flex items-center gap-2">

                                    <PhotoIcon className="h-5 w-5" />

                                    Image

                                </div>

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">

                                <div className="flex items-center gap-2">

                                    <DocumentTextIcon className="h-5 w-5" />

                                    Story Title

                                </div>

                            </th>

                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">

                                <div className="flex items-center justify-center gap-2">

                                    <CalendarDaysIcon className="h-5 w-5" />

                                    Publish Date

                                </div>

                            </th>

                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">

                                <div className="flex items-center justify-center gap-2">

                                    <PaperClipIcon className="h-5 w-5" />

                                    Attachment

                                </div>

                            </th>

                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">

                                <div className="flex items-center justify-center gap-2">

                                    <Cog6ToothIcon className="h-5 w-5" />

                                    Actions

                                </div>

                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                        {stories.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="py-20 text-center"
                                >

                                    <div className="flex flex-col items-center">

                                        <FolderOpenIcon className="h-16 w-16 text-slate-300" />

                                        <h3 className="mt-4 text-lg font-semibold text-slate-700">
                                            No Stories Found
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-500">
                                            There are currently no success stories available.
                                        </p>

                                    </div>

                                </td>

                            </tr>

                        ) : (

                            stories.map((story, index) => (

                                <tr
                                    key={story.id}
                                    className={`transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                                        }`}
                                >

                                    {/* Image */}

                                    <td className="px-6 py-2">

                                        {story.images?.length ? (

                                            <div>

                                                <img
                                                    src={imageUrl(story.images)}
                                                    alt={story.title}
                                                    className="h-12 w-12 object-cover rounded-xl"
                                                />

                                            </div>

                                        ) : (

                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100">

                                                <PhotoIcon className="h-6 w-6 text-slate-400" />

                                            </div>

                                        )}

                                    </td>

                                    {/* Title */}

                                    <td className="px-6 py-2 w-[550px]">

                                        <h3 className="font-semibold text-slate-800 line-clamp-1">

                                            {story.title}

                                        </h3>

                                    </td>

                                    {/* Date */}

                                    <td className="px-6 py-2 text-center">

                                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                                            <CalendarDaysIcon className="h-4 w-4" />

                                            {new Date(story.publish_date).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}

                                        </span>

                                    </td>

                                    {/* Attachment */}

                                    <td className="px-6 py-2 text-center">

                                        {story.attachment ? (

                                            <a
                                                href={attachmentUrl(story.attachment)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-200"
                                            >

                                                <PaperClipIcon className="h-4 w-4" />

                                                View Documents

                                            </a>

                                        ) : (

                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">

                                                No File

                                            </span>

                                        )}

                                    </td>

                                    {/* Actions */}

                                    <td className="relative px-6 py-2">

                                        <div className="flex justify-center">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenMenu(openMenu === story.id ? null : story.id)
                                                }
                                                className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                                            >
                                                <EllipsisVerticalIcon className="h-6 w-6" />
                                            </button>

                                            {openMenu === story.id && (

                                                <div className="absolute right-12 top-8 z-20 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                                                    <button
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            onView(story);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-blue-700 transition hover:bg-blue-50"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                      
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            onEdit(story);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm transition hover:bg-amber-50 text-amber-600"
                                                    >
                                                        <PencilSquareIcon className="h-5 w-5" />
                                                        
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            onDelete(story.id);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm transition hover:bg-red-50 text-red-600"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                       
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

        </div>
    );
}