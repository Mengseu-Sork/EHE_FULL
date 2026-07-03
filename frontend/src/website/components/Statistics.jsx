import {
    UsersIcon,
    GlobeAltIcon,
    HeartIcon,
    ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export default function Statistics() {
    const stats = [
        {
            icon: UsersIcon,
            value: "2007",
            title: "Established",
            description:
                "Serving communities across Cambodia since our founding.",
        },
        {
            icon: GlobeAltIcon,
            value: "100+",
            title: "Communities Reached",
            description:
                "Supporting local communities through sustainable development initiatives.",
        },
        {
            icon: HeartIcon,
            value: "17+",
            title: "Years of Experience",
            description:
                "Dedicated to environmental protection, health, and education.",
        },
        {
            icon: ArrowTrendingUpIcon,
            value: "50+",
            title: "Community Partners",
            description:
                "Working together with local groups, networks, and stakeholders.",
        },
    ];

    return (
        <section className="relative py-10 md:py-16 overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">

            {/* Background */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />

            <div className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-12">

                {/* Heading */}
                <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">

                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                        Our Journey
                    </span>

                    <h2 className="mt-6 text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">
                        Strengthening Communities,
                        <span className="block text-emerald-600 mt-2">
                            Protecting Natural Resources
                        </span>
                    </h2>

                    <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
                        Since 2007, EHE has worked closely with local communities
                        to protect natural resources, improve livelihoods,
                        promote health and education, and support sustainable
                        development throughout Cambodia.
                    </p>

                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {stats.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="
                                group
                                bg-white
                                rounded-2xl
                                p-4 md:p-6
                                border border-slate-100
                                shadow-sm
                                hover:shadow-lg
                                transition-all duration-300
                                text-center
                            "
                            >
                                <div
                                    className="
                                    w-12 h-12 md:w-14 md:h-14
                                    mx-auto mb-4
                                    rounded-xl
                                    bg-emerald-50
                                    flex items-center justify-center
                                    group-hover:bg-emerald-600
                                    transition-all
                                "
                                >
                                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-emerald-600 group-hover:text-white" />
                                </div>

                                <h3 className="text-xl md:text-3xl font-bold text-slate-900">
                                    {item.value}
                                </h3>

                                <h4 className="mt-2 text-xs md:text-base font-semibold text-slate-800">
                                    {item.title}
                                </h4>

                                <p className="hidden md:block mt-2 text-sm text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}