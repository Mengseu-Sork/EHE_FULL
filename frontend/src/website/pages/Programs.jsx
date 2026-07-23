import {
    GlobeAltIcon,
    HeartIcon,
    UsersIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    SparklesIcon,
    MapPinIcon,
    ArrowUpRightIcon,
    BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

import api from "../../api/api";
import { useEffect, useState, React } from "react";

import Header from "../components/Header";

export default function ProgramsPage() {

    const programs = [
        {
            title: "Community-Based Organizations",
            icon: UsersIcon,
            color: "emerald",
            description:
                "Strengthening community-based organizations through collective leadership, community organizing, and capacity development to enable local communities to manage their own development and protect their rights."
        },
        {
            title: "Sustainable Livelihoods",
            icon: BriefcaseIcon,
            color: "blue",
            description:
                "Supporting climate-resilient agriculture, community enterprises, savings groups, and local economic initiatives that improve household income, food security, and self-reliance."
        },
        {
            title: "Natural Resource Management",
            icon: GlobeAltIcon,
            color: "teal",
            description:
                "Protecting forests, biodiversity, land, water resources, and indigenous territories through community participation, sustainable resource management, and environmental conservation."
        },
        {
            title: "Education & Community Health",
            icon: AcademicCapIcon,
            color: "amber",
            description:
                "Promoting quality education, healthy communities, clean water, sanitation, environmental awareness, and community well-being through inclusive and sustainable development initiatives."
        },
        {
            title: "Community Networks & Advocacy",
            icon: HeartIcon,
            color: "rose",
            description:
                "Building strong community networks and supporting collective action to advocate for land rights, environmental protection, social justice, and meaningful participation in local decision-making."
        },
        {
            title: "Partnership & Policy Engagement",
            icon: BuildingOffice2Icon,
            color: "purple",
            description:
                "Collaborating with government institutions, civil society organizations, NGO networks, development partners, and communities to strengthen policy dialogue and promote sustainable development."
        }
    ];

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get("/projects");
            setProjects(data);
        } catch (error) {
            console.error("Failed to load projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const storageUrl = `${import.meta.env.VITE_API_URL.replace("/api", "")}/storage`;

    const statusColors = {
        Active: "bg-green-500",
        Ongoing: "bg-blue-500",
        Completed: "bg-purple-500",
        Pending: "bg-yellow-500",
    };


    return (
        <div className="bg-[#fafbfc] min-h-screen font-sans antialiased text-slate-900 selection:bg-emerald-500 selection:text-white overflow-x-hidden" >

            {/* Cinematic Immersive Hero Section */}
            < Header />

            {/* Section Header */}
            < section className="relative py-8 bg-gradient-to-b from-white via-emerald-50/40 to-white" >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    <div className="max-w-4xl mx-auto text-center">

                        <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs md:text-sm font-semibold tracking-widest uppercase">
                            Our Programs
                        </span>

                        <h2 className="mt-6 text-lg md:text-3xl font-extrabold text-slate-900 leading-7">
                            Empowering Communities
                            <span className="block text-emerald-600 mt-3 md:mt-5">
                                For Sustainable Development & Resource Rights
                            </span>
                        </h2>

                        <div className="mt-4 md:mt-6 flex justify-center">
                            <div className="w-20 h-1 rounded-full bg-emerald-600"></div>
                        </div>

                        <p className="mt-4 md:mt-8 text-sm md:text-base leading-6 md:leading-8 text-slate-600">
                            EHE partners with grassroots communities and indigenous peoples to
                            strengthen community-based organizations, promote sustainable
                            livelihoods, protect land and natural resources, and build strong
                            community networks that advance collective leadership, social justice,
                            and long-term environmental sustainability.
                        </p>

                    </div>

                </div>
            </section >

            {/* Program Areas */}
            < section className="py-6 md:py-8 bg-white" >
                <div className="max-w-full mx-auto px-6 lg:px-8">

                    <div className="text-center mb-6">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs md:text-sm font-semibold text-emerald-700">
                            What We Do
                        </span>

                        <h2 className="mt-3 md:mt-5 text-lg lg:text-3xl font-bold text-slate-900">
                            Our Program Areas
                        </h2>

                        <p className="mt-3 md:mt-6 max-w-4xl mx-auto text-sm md:text-base text-slate-600 leading-6 md:leading-8">
                            EHE implements community-driven programs that strengthen local leadership,
                            promote sustainable livelihoods, protect natural resources, improve
                            education and community health, and build strong partnerships to advance
                            environmental sustainability, social justice, and resilient communities.
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
            </section >

            {/* Projects Introduction */}
            <section className="py-8 md:py-16 bg-white">

                <div className="max-w-4xl mx-auto px-4 text-center">

                    <span className="inline-flex px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs md:text-sm font-semibold uppercase tracking-wider">
                        Project Portfolio
                    </span>

                    <h2 className="mt-4 md:mt-6 text-lg md:text-2xl font-bold text-slate-900 leading-8">
                        Empowering Communities Through
                        <span className="block text-emerald-600 mt-1">
                            Sustainable Development Projects
                        </span>
                    </h2>

                    <div className="mt-5 flex justify-center">
                        <div className="h-1 w-20 rounded-full bg-emerald-600"></div>
                    </div>

                    <p className="mt-6 text-sm md:text-base leading-6 md:leading-8 text-slate-600">
                        Our projects are designed to empower grassroots communities and
                        indigenous peoples through sustainable livelihoods, natural
                        resource management, community leadership, education, health, and
                        environmental conservation. Working closely with local communities,
                        government institutions, civil society organizations, and
                        development partners, we create lasting solutions that strengthen
                        resilience, protect community rights, and promote sustainable
                        development.
                    </p>

                </div>

            </section>

            {/* Projects */}
            < section className="pb-6 md:pb-16" >

                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {projects.map((project, index) => {

                            return (
                                <div
                                    key={project.id}
                                    className="group overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden">

                                        <img
                                            src={
                                                project.image
                                                    ? `${storageUrl}/${project.image}`
                                                    : "/images/no-image.jpg"
                                            }
                                            alt={project.title}
                                            className="w-full h-44 sm:h-52 md:h-60 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                        {/* Status */}
                                        <span
                                            className={`absolute top-5 right-5 rounded-full ${statusColors[project.status] || "bg-gray-500"
                                                } px-3 py-1 text-xs font-semibold text-white`}
                                        >
                                            {project.status}
                                        </span>

                                    </div>

                                    {/* Content */}
                                    <div className="p-4 md:p-7">

                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 transition group-hover:text-emerald-600 line-clamp-1">
                                            {project.title}
                                        </h3>

                                        <p className="mt-3 text-slate-600 text-sm md:text-base leading-6 md:leading-7 line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Footer */}
                                        <div className="mt-6 flex items-center justify-between">

                                            <button onClick={() => setSelectedProject(project)}
                                                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs md:text-sm font-semibold cursor-pointer text-white transition hover:bg-emerald-700">
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

            </section >

            {/* Project Detail Modal */}
            {
                selectedProject && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                        onClick={() => setSelectedProject(null)}
                    >
                        <div
                            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={
                                    selectedProject.image
                                        ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/storage/${selectedProject.image}`
                                        : "/images/no-image.jpg"
                                }
                                alt={selectedProject.title}
                                className="h-56 md:h-96 w-full object-cover"
                            />

                            <div className="p-4 md:p-8">

                                <div className="flex flex-wrap items-center gap-3 mb-5">

                                    <span className="rounded-full bg-emerald-100 px-4 py-1 text-xs md:text-sm font-semibold text-emerald-700">
                                        {selectedProject.category}
                                    </span>

                                    <span
                                        className={`rounded-full px-4 py-1 text-xs md:text-sm font-semibold text-white ${statusColors[selectedProject.status] || "bg-gray-500"
                                            }`}
                                    >
                                        {selectedProject.status}
                                    </span>

                                </div>

                                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                                    {selectedProject.title}
                                </h2>

                                <p className="mt-4 whitespace-pre-line text-xs md:text-sm leading-8 text-slate-600">
                                    {selectedProject.description}
                                </p>

                                <div className="mt-4 flex justify-end">

                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="rounded-xl bg-orange-400 cursor-pointer px-6 py-2 font-semibold text-white hover:bg-orange-600"
                                    >
                                        Close
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}