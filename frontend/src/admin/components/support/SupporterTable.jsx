import { useEffect, useRef, useState } from "react";
import {
    FaEllipsisV,
    FaEye,
    FaEdit,
    FaTrash,
    FaGlobe,
    FaImage,
} from "react-icons/fa";

export default function SupporterTable({
    supporters,
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

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-800">

                        <tr className="text-xs font-semibold uppercase tracking-widest text-white">

                            <th className="w-16 px-6 py-4 text-center">
                                #
                            </th>

                            <th className="px-6 py-4 text-left">
                                Supporter
                            </th>

                            <th className="w-60 px-6 py-4 text-left">
                                Website
                            </th>

                            <th className="w-36 px-6 py-4 text-center">
                                Status
                            </th>

                            <th className="w-24 px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">

                        {supporters.length > 0 ? (

                            supporters.map((item, index) => (

                                <tr
                                    key={item.id}
                                    className="transition duration-200 even:bg-gray-50/40 hover:bg-green-50"
                                >

                                    {/* No */}

                                    <td className="px-6 py-3 text-center">

                                        <span className="font-semibold text-gray-500">
                                            {index + 1}
                                        </span>

                                    </td>

                                    {/* Supporter */}

                                    <td className="px-6 py-3">

                                        <div className="flex items-center gap-4">

                                            {item.logo ? (

                                                <img
                                                    src={item.logo}
                                                    alt={item.name}
                                                    className="h-14 w-14 rounded-xl border border-gray-200 bg-white object-contain p-2 shadow-sm"
                                                />

                                            ) : (

                                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">

                                                    <FaImage className="text-gray-400" />

                                                </div>

                                            )}

                                            <div>

                                                <h3 className="font-semibold text-gray-800">

                                                    {item.name}

                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Support Organization
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* Website */}

                                    <td className="px-6 py-3">

                                        {item.website ? (

                                            <a
                                                href={item.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                                            >

                                                <FaGlobe />

                                                Visit Website

                                            </a>

                                        ) : (

                                            <span className="text-gray-400">
                                                —
                                            </span>

                                        )}

                                    </td>

                                    {/* Status */}

                                    <td className="px-6 py-3 text-center">

                                        <span
                                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium ${item.is_active
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >

                                            <span
                                                className={`h-2.5 w-2.5 rounded-full ${item.is_active
                                                        ? "bg-green-600"
                                                        : "bg-red-600"
                                                    }`}
                                            />

                                            {item.is_active ? "Active" : "Inactive"}

                                        </span>

                                    </td>

                                    {/* Action */}

                                    <td className="relative px-6 py-3">

                                        <div
                                            ref={
                                                openMenu === item.id
                                                    ? menuRef
                                                    : null
                                            }
                                            className="flex justify-center"
                                        >

                                            <button
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu === item.id
                                                            ? null
                                                            : item.id
                                                    )
                                                }
                                                className="rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm transition hover:border-green-300 hover:bg-green-50"
                                            >

                                                <FaEllipsisV className="text-gray-600" />

                                            </button>

                                            {openMenu === item.id && (

                                                <div className="absolute right-8 top-10 z-50 w-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

                                                    <button
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            onView(item);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-blue-50"
                                                    >
                                                        <FaEye className="text-blue-600" />
                                                        
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            onEdit(item);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-3 text-gray-700 transition hover:bg-amber-50"
                                                    >
                                                        <FaEdit className="text-amber-600" />
                                                        
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            onDelete(item);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition hover:bg-red-50"
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
                                    colSpan={5}
                                    className="py-20"
                                >

                                    <div className="flex flex-col items-center">

                                        <div className="rounded-full bg-green-50 p-6">

                                            <FaImage
                                                size={42}
                                                className="text-green-600"
                                            />

                                        </div>

                                        <h3 className="mt-5 text-xl font-semibold text-gray-800">
                                            No Supporters Found
                                        </h3>

                                        <p className="mt-2 text-gray-500">
                                            Click "Add Supporter" to create your first supporter.
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