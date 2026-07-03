import {
    GlobeAltIcon,
    UsersIcon,
    HeartIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/outline";

import heroBg from "../../assets/images/project/bg.jpg";

export default function Projects() {
    const projects = [
        {
            title: "Natural Resource Protection",
            category: "Environment",
            status: "Active",
            statusColor: "bg-green-500",
            image:
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
            description:
                "Supporting communities to protect forests, biodiversity, and natural resources through sustainable management and conservation efforts.",
        },
        {
            title: "Community Empowerment",
            category: "Community",
            status: "Ongoing",
            statusColor: "bg-blue-500",
            image:
                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200",
            description:
                "Strengthening local leadership, participation, and accountability for sustainable community development.",
        },
        {
            title: "Health Awareness Program",
            category: "Health",
            status: "Completed",
            statusColor: "bg-purple-500",
            image:
                "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200",
            description:
                "Improving health awareness, sanitation, hygiene, and access to community health services.",
        },
        {
            title: "Education & Capacity Building",
            category: "Education",
            status: "Active",
            statusColor: "bg-amber-500",
            image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200",
            description:
                "Providing training, awareness raising, and knowledge sharing to strengthen local capacity.",
        },
    ];

    return (
        <div className="bg-white">

            {/* Hero */}
            <section
                className="relative h-[40vh] lg:h-[70vh] flex items-center justify-start bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

                <div className="relative max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center rounded-full px-6 py-1 md:py-2 bg-emerald-500/20 border-emerald-400/30 text-[10px] md:text-xs text-emerald-100bg-emerald-500/20 border border-emerald-400/30 text-emerald-100">
                            🌿 Our Projects
                        </span>

                        <h1 className="mt-3 md:mt-7 text-lg md:text-5xl font-extrabold tracking-tight text-white">
                            Creating
                            <span className="block text-emerald-300 mt-1">
                                Sustainable Impact
                            </span>
                        </h1>

                        <p className="mt-3 md:mt-8 max-w-3xl mx-auto text-sm md:text-lg leading-8 text-green-100">
                            Through community-driven projects, EHE promotes environmental
                            protection, education, health awareness, sustainable livelihoods,
                            and social development throughout Cambodia.
                        </p>

                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-8 md:py-16">

                <div className="max-w-4xl mx-auto px-4 text-center">

                    <span className="inline-flex px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                        Project Portfolio
                    </span>

                    <h2 className="mt-5 text-xl md:text-3xl font-bold text-slate-900">
                        Driving Positive Change Together
                    </h2>

                    <p className="mt-5 text-slate-600 leading-8">
                        EHE works closely with communities, local authorities,
                        civil society organizations, and development partners
                        to create meaningful and lasting impact.
                    </p>

                </div>

            </section>

            {/* Projects */}
            <section className="pb-20">

                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {projects.map((project, index) => {

                            return (
                                <div
                                    key={index}
                                    className="group overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden">

                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-44 sm:h-52 md:h-60 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                        {/* Category */}
                                        <span className="absolute top-5 left-5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                                            {project.category}
                                        </span>

                                        {/* Status */}
                                        <span
                                            className={`absolute top-5 right-5 rounded-full ${project.statusColor} px-3 py-1 text-xs font-semibold text-white`}
                                        >
                                            {project.status}
                                        </span>

                                        {/* Number */}
                                        <div className="absolute bottom-6 right-6 text-5xl font-black text-white/20">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                    </div>

                                    {/* Content */}
                                    <div className="p-7">

                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 transition group-hover:text-emerald-600 line-clamp-1">
                                            {project.title}
                                        </h3>

                                        <p className="mt-4 text-slate-600 leading-7 line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Footer */}
                                        <div className="mt-6 flex items-center justify-between">

                                            <button className="flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold cursor-pointer text-white transition hover:bg-emerald-700">
                                                Learn More

                                                <svg
                                                    className="h-4 w-4 transition group-hover:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>

        </div>
    );
}