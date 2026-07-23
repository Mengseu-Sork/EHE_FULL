import ProgramCard from "./ProgramCard";

export default function Programs() {
    const programs = [
        {
            title: "Community-Based Organizations",
            color: "border-emerald-500",
            description:
                "Strengthening community leadership, governance, and organizational capacity to enable communities to manage their own development.",
        },
        {
            title: "Self-Reliant Economic Development",
            color: "border-blue-500",
            description:
                "Promoting sustainable agriculture, community enterprises, food security, and climate-resilient livelihoods for rural communities.",
        },
        {
            title: "Community Networks & Campaign Action",
            color: "border-amber-500",
            description:
                "Supporting collective action, advocacy, and community participation to protect land, forests, natural resources, and human rights.",
        },
        {
            title: "Partnership & Policy Advocacy",
            color: "border-purple-500",
            description:
                "Collaborating with civil society organizations, government partners, and stakeholders to promote inclusive and sustainable development.",
        },
    ];

    return (
        <section className="py-8 lg:py-16">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                        Our Programs
                    </span>

                    <h2 className="mt-5 text-lg md:text-3xl font-bold text-slate-900">
                        What We Do
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        We work alongside communities to protect natural resources,
                        strengthen livelihoods, and improve health and education
                        opportunities throughout Cambodia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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