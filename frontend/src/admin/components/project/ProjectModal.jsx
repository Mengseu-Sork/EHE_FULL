import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ProjectModal({ project, onClose }) {
    if (!project) return null;

    const storageUrl = `${import.meta.env.VITE_API_URL.replace("/api", "")}/storage`;

    const statusColors = {
        Active: "bg-green-600 text-white",
        Ongoing: "bg-blue-600 text-white",
        Completed: "bg-purple-600 text-white",
        Pending: "bg-yellow-600 text-white",
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 z-10 rounded-full cursor-pointer bg-white p-2 shadow hover:bg-gray-100"
                >
                    <XMarkIcon className="h-6 w-6 text-red-700" />
                </button>

                {/* Image */}
                <img
                    src={
                        project.image
                            ? `${storageUrl}/${project.image}`
                            : "/images/no-image.png"
                    }
                    alt={project.title}
                    className="h-64 w-full object-cover"
                />

                {/* Content */}
                <div className="p-8">

                    <div className="flex flex-wrap items-center gap-3">

                        <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
                            {project.category}
                        </span>

                        <span
                            className={`rounded-full px-4 py-1 text-sm font-semibold ${statusColors[project.status] ||
                                "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {project.status}
                        </span>

                    </div>

                    <h2 className="mt-5 text-xl font-bold text-slate-900">
                        {project.title}
                    </h2>

                    <div className="mt-8">

                        <h3 className="mb-3 text-lg font-bold text-green-700">
                            Description
                        </h3>

                        <div className="whitespace-pre-line leading-8 text-slate-600">
                            {project.description}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}