import {
    FaTimes,
    FaGlobe,
    FaCheckCircle,
    FaTimesCircle,
    FaImage,
} from "react-icons/fa";

export default function SupporterView({
    supporter,
    onClose,
}) {
    if (!supporter) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>

                        <h2 className="text-2xl font-bold text-green-800">
                            Supporter Details
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            View supporter information
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 transition text-white bg-red-400 hover:bg-red-500"
                    >
                        <FaTimes size={18} />
                    </button>

                </div>

                {/* Body */}

                <div className="grid gap-8 p-8 md:grid-cols-2">

                    {/* Logo */}

                    <div>

                        {supporter.logo ? (

                            <img
                                src={supporter.logo}
                                alt={supporter.name}
                                className="h-80 w-full rounded-2xl border bg-white object-contain p-6"
                            />

                        ) : (

                            <div className="flex h-80 items-center justify-center rounded-2xl border bg-gray-100">

                                <div className="text-center">

                                    <FaImage
                                        size={60}
                                        className="mx-auto text-gray-300"
                                    />

                                    <p className="mt-3 text-gray-500">
                                        No Logo
                                    </p>

                                </div>

                            </div>

                        )}

                    </div>

                    {/* Information */}

                    <div className="space-y-6">

                        {/* Name */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-500">
                                Organization Name
                            </label>

                            <p className="text-2xl font-bold text-gray-800">
                                {supporter.name}
                            </p>

                        </div>

                        {/* Website */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-500">
                                Website
                            </label>

                            {supporter.website ? (

                                <a
                                    href={supporter.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                                >

                                    <FaGlobe />

                                    {supporter.website}

                                </a>

                            ) : (

                                <span className="text-gray-400">
                                    No website
                                </span>

                            )}

                        </div>

                        {/* Status */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-500">
                                Status
                            </label>

                            {supporter.is_active ? (

                                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                    <FaCheckCircle />

                                    Active

                                </span>

                            ) : (

                                <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

                                    <FaTimesCircle />

                                    Inactive

                                </span>

                            )}

                        </div>

                        {/* Created */}

                        {supporter.created_at && (

                            <div>

                                <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    Created At
                                </label>

                                <p className="text-gray-700">
                                    {new Date(supporter.created_at).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}

                                    {" • "}

                                    {new Date(supporter.created_at).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}