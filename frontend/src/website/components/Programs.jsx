import ProgramCard from "./ProgramCard";

export default function Programs() {
    const programs = [
        {
            title: "Natural Resource Protection",
            color: "border-emerald-500",
            description:
                "Supporting communities to protect forests, biodiversity, land, and natural resources for future generations.",
        },
        {
            title: "Community Development",
            color: "border-blue-500",
            description:
                "Strengthening local leadership, community participation, and sustainable livelihoods across Cambodia.",
        },
        {
            title: "Health & Education",
            color: "border-amber-500",
            description:
                "Promoting health awareness, sanitation, and access to quality education for vulnerable communities.",
        },
    ];

    return (
        <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                        Our Programs
                    </span>

                    <h2 className="mt-5 text-xl md:text-3xl font-bold text-slate-900">
                        What We Do
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        We work alongside communities to protect natural resources,
                        strengthen livelihoods, and improve health and education
                        opportunities throughout Cambodia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <ProgramCard
                            key={index}
                            {...program}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}