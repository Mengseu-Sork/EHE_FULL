import {
    FaTimes,
    FaCalendarAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaImage,
    FaInfoCircle,
} from "react-icons/fa";

export default function HistoryView({
    history,
    onClose,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">

            <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

                {/* Header */}

                <div className="relative bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 px-8 py-6 text-white">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.15),transparent_45%)]" />

                    <div className="relative flex items-center justify-between">

                        <div>

                            <p className="text-sm uppercase tracking-[0.25em] text-green-100">
                                Organization Timeline
                            </p>

                            <h2 className="mt-2 text-xl font-bold">
                                History Detail
                            </h2>

                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-xl bg-white/10 p-3 cursor-pointer transition hover:bg-white/20"
                        >
                            <FaTimes size={20} />
                        </button>

                    </div>

                </div>

                {/* Content */}

                <div className="overflow-y-auto p-6">

                    {/* Image */}

                    <div>

                        {history.image ? (

                            <img
                                src={history.image}
                                alt={history.title}
                                className="h-80 w-full rounded-2xl object-cover"
                            />

                        ) : (

                            <div className="flex h-80 items-center justify-center rounded-2xl bg-gray-100">

                                <div className="text-center">

                                    <FaImage
                                        size={50}
                                        className="mx-auto text-gray-300"
                                    />

                                    <p className="mt-3 text-gray-500">
                                        No Image Available
                                    </p>

                                </div>

                            </div>

                        )}

                    </div>

                    {/* Information */}

                    <div className="mt-6 space-y-5">

                        {/* Year */}

                        <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3">

                            <FaCalendarAlt className="text-blue-600" />

                            <div>

                                <p className="font-semibold text-gray-800">
                                    {history.year}
                                </p>

                            </div>

                        </div>

                        {/* Title */}

                        <div>

                            <h3 className="text-2xl font-bold text-gray-800">
                                {history.title || "Untitled"}
                            </h3>

                        </div>

                        {/* Description */}

                        <div className="rounded-xl">

                            <div className="max-h-72 overflow-y-auto">

                                <p className="whitespace-pre-wrap leading-7 text-gray-600">
                                    {history.description}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}