import {
    FaEdit,
    FaEye,
    FaTrash,
    FaImage,
    FaEllipsisV,
} from "react-icons/fa";

import { useEffect, useRef, useState } from "react";


const storageUrl = import.meta.env.VITE_STORAGE_URL;

export default function NewsTable({
    news,
    loading,
    onView,
    onEdit,
    onDelete,
}) {

    const list = Array.isArray(news) ? news : [];
    const [openMenu, setOpenMenu] = useState(null);

    if (loading) {

        return (

            <div className="p-12 text-center">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

                <p className="mt-4 text-gray-500">
                    Loading news...
                </p>

            </div>

        );

    }

    return (

        <div className="overflow-hidden rounded-2xl">

            {/* Header */}

            <div className="flex items-center justify-between bg-gradient-to-r from-green-600 to-green-700 px-6 py-5">

                <div>

                    <h2 className="text-xl font-bold text-white">
                        News Articles
                    </h2>

                    <p className="text-sm text-green-100">
                        Manage all organization news
                    </p>

                </div>

                <span className="rounded-full bg-green-800/40 px-4 py-1 text-sm font-semibold text-white">

                    {list.length} Records

                </span>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-green-100">

                        <tr>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                Images
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                Title
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                Category
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                Description
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                Published
                            </th>

                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {list.length === 0 && (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="py-16 text-center"
                                >

                                    <FaImage className="mx-auto mb-3 text-5xl text-gray-300" />

                                    <h3 className="text-lg font-semibold text-gray-600">

                                        No News Found

                                    </h3>

                                    <p className="mt-2 text-sm text-gray-400">

                                        Click "Add News" to create your first article.

                                    </p>

                                </td>

                            </tr>

                        )}

                        {list.map((item) => (

                            <tr
                                key={item.id}
                                className="transition hover:bg-green-50"
                            >

                                {/* Images */}

                                <td className="px-5 py-2">

                                    <div className="flex items-center">

                                        {item.images?.length ? (

                                            <img
                                                src={`${storageUrl}/${item.images[0]}`}
                                                alt={item.title}
                                                className="h-10 w-10 rounded-lg object-cover shadow"
                                            />

                                        ) : (

                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">

                                                <FaImage className="text-gray-400" />

                                            </div>

                                        )}

                                    </div>
                                </td>

                                {/* Title */}

                                <td className="px-5 py-2 w-[300px]">

                                    <div className="font-semibold text-gray-800 line-clamp-1">

                                        {item.title}

                                    </div>

                                </td>

                                {/* Category */}

                                <td className="px-5 py-2">

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 line-clamp-1">

                                        {item.category}

                                    </span>

                                </td>

                                {/* Description */}

                                <td className="px-5 py-2 w-[400px]">

                                    <div className="line-clamp-1">

                                        {item.body}

                                    </div>

                                </td>

                                {/* Date */}

                                <td className="px-5 py-2 w-[150px]">

                                    {item.published_at
                                        ? new Date(item.published_at).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "Not Published"}

                                </td>

                                {/* Actions */}

                                <td className="px-5 py-2">

                                    <div className="relative flex justify-center">

                                        <button
                                            onClick={() =>
                                                setOpenMenu(openMenu === item.id ? null : item.id)
                                            }
                                            className="rounded-lg p-2 hover:bg-gray-100"
                                        >
                                            <FaEllipsisV />
                                        </button>

                                        {openMenu === item.id && (

                                            <div className="absolute right-2 top-4 z-20 w-10 rounded-lg border border-green-500 bg-white shadow-xl">

                                                <button
                                                    onClick={() => {
                                                        onView(item);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="flex w-full rounded-lg items-center gap-3 px-3 py-3 text-left hover:bg-blue-50"
                                                >
                                                    <FaEye className="text-blue-600" />

                                                </button>

                                                <button
                                                    onClick={() => {
                                                        onEdit(item);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="flex w-full rounded-lg items-center gap-3 px-3 py-3 text-left hover:bg-yellow-50"
                                                >
                                                    <FaEdit className="text-yellow-600" />

                                                </button>

                                                <button
                                                    onClick={() => {
                                                        onDelete(item);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="flex w-full rounded-lg items-center gap-3 px-3 py-3 text-left text-red-600 hover:bg-red-50"
                                                >
                                                    <FaTrash />

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