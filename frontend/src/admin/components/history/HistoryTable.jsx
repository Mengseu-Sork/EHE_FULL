import {
    FaEdit,
    FaTrash,
    FaCalendarAlt,
    FaImage,
    FaEye,
    FaEllipsisV,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";


export default function HistoryTable({
    histories,
    onView,
    onEdit,
    onDelete,
}) {
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
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

            {/* Header */}

            <div className="flex items-center justify-between border-b bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5">

                <div>

                    <h2 className="text-xl font-bold text-white">
                        History Timeline
                    </h2>

                    <p className="mt-1 text-sm text-green-100">
                        Manage organization history and milestones
                    </p>

                </div>

                <div className="rounded-xl bg-white/20 px-4 py-2 text-white">

                    <p className="text-base uppercase">
                        {histories.length} Records
                    </p>

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">

                        <tr className="text-xs font-semibold uppercase tracking-wider text-gray-600">

                            <th className="px-6 py-4 text-left">
                                Image
                            </th>

                            <th className="px-6 py-4 text-left">
                                Title
                            </th>

                            <th className="px-6 py-4 text-center">
                                Year
                            </th>

                            <th className="px-6 py-4 text-left">
                                Description
                            </th>

                            <th className="px-6 py-4 text-center">
                                Status
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">

                        {histories.length > 0 ? (

                            histories.map((item, index) => (

                                <tr
                                    key={item.id}
                                    className="transition hover:bg-green-50"
                                >

                                    {/* Image */}

                                    <td className="px-6 py-2">

                                        {item.image ? (

                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-12 w-12 rounded-xl border border-gray-200 object-cover shadow"
                                            />

                                        ) : (

                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">

                                                <FaImage size={28} />

                                            </div>

                                        )}

                                    </td>

                                    {/* Title */}

                                    <td className="px-6 py-2">

                                        <h3 className="w-[200px] line-clamp-1 font-semibold text-gray-900">
                                            {item.title || "Untitled"}
                                        </h3>

                                    </td>

                                    {/* Year */}

                                    <td className="px-6 py-2 text-center">

                                        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700">

                                            <FaCalendarAlt />

                                            {item.year}

                                        </span>

                                    </td>

                                    {/* Description */}

                                    <td className="px-6 py-2">

                                        <div className="w-[450px] line-clamp-1 text-sm leading-6 text-gray-600">

                                            {item.description}

                                        </div>

                                    </td>

                                    {/* Status */}

                                    <td className="px-6 py-2 text-center">

                                        {item.is_active ? (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700">

                                                <span className="h-2.5 w-2.5 rounded-full bg-green-600"></span>

                                                Active

                                            </span>

                                        ) : (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

                                                <span className="h-2.5 w-2.5 rounded-full bg-red-600"></span>

                                                Inactive

                                            </span>

                                        )}

                                    </td>

                                    {/* Actions */}
                                    <td className="relative px-6 py-2">

                                        <div ref={menuRef} className="flex justify-center">

                                            <button
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu === item.id
                                                            ? null
                                                            : item.id
                                                    )
                                                }
                                                className="rounded-lg p-2 text-gray-600 transition cursor-pointer hover:bg-gray-100"
                                            >
                                                <FaEllipsisV />
                                            </button>

                                            {openMenu === item.id && (

                                                <div className="absolute right-8 top-8 z-50 w-12 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

                                                    <button
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            onView(item);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-blue-500 transition hover:bg-blue-50 hover:text-blue-600"
                                                    >
                                                        <FaEye />

                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            onEdit(item);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-amber-500 transition hover:bg-amber-50 hover:text-amber-600"
                                                    >
                                                        <FaEdit />

                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            onDelete(item);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                                                    >
                                                        <FaTrash />

                                                    </button>

                                                </div>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan={8}
                                    className="py-20 text-center"
                                >

                                    <div className="flex flex-col items-center">

                                        <div className="mb-5 rounded-full bg-gray-100 p-6">

                                            <FaImage
                                                size={42}
                                                className="text-gray-400"
                                            />

                                        </div>

                                        <h3 className="text-xl font-bold text-gray-700">

                                            No History Found

                                        </h3>

                                        <p className="mt-2 text-gray-500">

                                            Click the "Add History" button to create your first history record.

                                        </p>

                                    </div>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}