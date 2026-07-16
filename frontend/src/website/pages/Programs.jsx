
import { useState, React } from "react";
import {
    GlobeAltIcon,
    HeartIcon,
    UsersIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    SparklesIcon,
    MapPinIcon,
    ArrowUpRightIcon
} from "@heroicons/react/24/outline";

import bg from "../../assets/images/program/bg.jpg";

export default function ProgramsPage() {

    const programs = [
        {
            title: "Natural Resource Protection",
            icon: GlobeAltIcon,
            color: "emerald",
            description:
                "Strengthening community capacity to protect forests, biodiversity, land, water resources, and indigenous natural heritage through sustainable natural resource management."
        },
        {
            title: "Education and Health",
            icon: AcademicCapIcon,
            color: "blue",
            description:
                "Improving access to quality education, promoting healthy lifestyles, and increasing community awareness of public health and well-being."
        },
        {
            title: "Community Development",
            icon: UsersIcon,
            color: "amber",
            description:
                "Empowering communities through leadership development, local participation, sustainable livelihoods, and improved social and economic resilience."
        },
        {
            title: "Community Capacity Building",
            icon: BriefcaseIcon,
            color: "purple",
            description:
                "Building the knowledge and skills of local communities, indigenous peoples, women, and youth to effectively manage their own development initiatives."
        },
        {
            title: "Community Network Strengthening",
            icon: HeartIcon,
            color: "rose",
            description:
                "Supporting community organizations and local networks to collaborate, advocate, and share knowledge for sustainable development."
        },
        {
            title: "Community Mobilization",
            icon: MapPinIcon,
            color: "teal",
            description:
                "Encouraging active participation of citizens in environmental conservation, social development, and community decision-making processes."
        }
    ];

    return (
        <div className="bg-[#fafbfc] min-h-screen font-sans antialiased text-slate-900 selection:bg-emerald-500 selection:text-white overflow-x-hidden">

            {/* Cinematic Immersive Hero Section */}
            <section className="relative h-[40vh] lg:h-[70vh] flex items-center justify-start bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

                <div className="relative w-full max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-32 z-20">
                    <div className="max-w-4xl">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold bg-white/10 backdrop-blur-md text-emerald-400 border border-white/10 tracking-widest uppercase mb-6 shadow-xl">
                            <SparklesIcon className="w-3.5 h-3.5 text-emerald-400" />
                            Local Non-Governmental Organization
                        </span>
                        <h1 className="text-xl sm:text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05] mb-4 md:mb-6">
                            Our Program
                        </h1>
                        <p className="text-sm sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl drop-shadow-md">
                            Working closely with local communities to protect natural resources, improve livelihoods, education, health, and promote social justice and equality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section Header */}
            <section className="relative py-8 bg-gradient-to-b from-white via-emerald-50/40 to-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    <div className="max-w-3xl mx-auto text-center">

                        <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs md:text-sm font-semibold tracking-widest uppercase">
                            Our Programs
                        </span>

                        <h2 className="mt-6 text-lg md:text-3xl font-extrabold text-slate-900 leading-7">
                            Building Strong Communities
                            <span className="block text-emerald-600">
                                Through Sustainable Development
                            </span>
                        </h2>

                        <div className="mt-4 md:mt-6 flex justify-center">
                            <div className="w-20 h-1 rounded-full bg-emerald-600"></div>
                        </div>

                        <p className="mt-4 md:mt-8 text-sm md:text-base leading-6 md:leading-8 text-slate-600">
                            EHE works alongside local communities to improve education,
                            health, environmental protection, and sustainable livelihoods.
                            Our integrated programs empower children, youth, families,
                            and vulnerable communities through long-term development
                            initiatives.
                        </p>

                    </div>

                </div>
            </section>

            {/* Program Areas */}
            <section className="py-6 md:py-8 bg-white">
                <div className="max-w-full mx-auto px-6 lg:px-8">

                    <div className="text-center mb-6">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs md:text-sm font-semibold text-emerald-700">
                            What We Do
                        </span>

                        <h2 className="mt-3 md:mt-5 text-lg lg:text-3xl font-bold text-slate-900">
                            Our Program Areas
                        </h2>

                        <p className="mt-3 md:mt-6 max-w-3xl mx-auto text-sm md:text-base text-slate-600 leading-6 md:leading-8">
                            We implement integrated community development programs that
                            strengthen livelihoods, improve education and health, conserve
                            natural resources, and empower local communities for a
                            sustainable future.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {programs.map((program, index) => {
                            const Icon = program.icon;

                            return (
                                <div
                                    key={index}
                                    className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >

                                    <div
                                        className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl
                                            ${program.color === "emerald" && "bg-emerald-100 text-emerald-600"}
                                            ${program.color === "blue" && "bg-blue-100 text-blue-600"}
                                            ${program.color === "rose" && "bg-rose-100 text-rose-600"}
                                            ${program.color === "amber" && "bg-amber-100 text-amber-600"}
                                            ${program.color === "purple" && "bg-purple-100 text-purple-600"}
                                            ${program.color === "teal" && "bg-teal-100 text-teal-600"}
                                        `}
                                    >
                                        <Icon className="h-8 w-8" />
                                    </div>

                                    <h3 className="text-base md:text-xl font-bold text-slate-900">
                                        {program.title}
                                    </h3>

                                    <p className="mt-2 md:mt-4 text-sm md:text-base leading-7 text-slate-600">
                                        {program.description}
                                    </p>

                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>
        </div>
    );
}