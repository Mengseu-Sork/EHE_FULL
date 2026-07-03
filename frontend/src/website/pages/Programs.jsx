
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

import p1 from "../../assets/images/program/p1.jpg";
import p2 from "../../assets/images/program/p2.jpg";
import p3 from "../../assets/images/program/p3.jpg";
import p4 from "../../assets/images/program/p4.jpg";
import p5 from "../../assets/images/program/p5.jpg";
import p6 from "../../assets/images/program/p6.jpg";
import p7 from "../../assets/images/program/p7.jpg";

export default function ProgramsPage() {
    const [selectedActivity, setSelectedActivity] = useState(null);

    const programGroups = [
        {
            title: "Integrated Early Childhood Care and Development Program (IECCD)",
            description:
                "By 2029, boys and girls under 6 years old who are beneficiaries will receive care and development with potential and opportunities to continue their education.",
            activities: [
                {
                    title: "Health and Nutrition",
                    image: p1,
                    description: "Improve child nutrition and health through community-based services. EHE works alongside local communities to improve education, health, environmental protection, and sustainable livelihoods. Our integrated programs empower children, youth, families, and vulnerable communities through long-term development initiatives."
                },
                {
                    title: "Clean Water & Sanitation",
                    image: p2,
                    description: "Increase access to safe water and sanitation facilities."
                },
                {
                    title: "Early Learning",
                    image: p3,
                    description: "Promote quality early childhood learning opportunities."
                },
            ]
        },

        {
            title: "Integrated Quality Basic Education Program (IQBE)",
            description:
                "By 2029, boys and girls aged 6–15 in target areas have access to quality basic education.",
            activities: [
                {
                    title: "Quality Learning",
                    image: p4,
                    description: "Improve teaching and learning quality."
                },
                {
                    title: "Equal Access to Education",
                    image: p5,
                    description: "Ensure inclusive and equitable education."
                }
            ]
        },

        {
            title: "Skills For Professional Program (S4P)",
            description:
                "By 2029, young women and men gain market-relevant skills for employment.",
            activities: [
                {
                    title: "Challenges Facing Youth",
                    image: p6,
                    description: "Address barriers to education and employment."
                },
                {
                    title: "Strategic Issues",
                    image: p7,
                    description: "Develop vocational and entrepreneurship skills."
                }
            ]
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
            <section className="relative py-8 md:py-16 bg-gradient-to-b from-white via-emerald-50/40 to-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    <div className="max-w-3xl mx-auto text-center">

                        <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold tracking-widest uppercase">
                            Our Programs
                        </span>

                        <h2 className="mt-6 text-xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                            Building Strong Communities
                            <span className="block text-emerald-600">
                                Through Sustainable Development
                            </span>
                        </h2>

                        <div className="mt-6 flex justify-center">
                            <div className="w-20 h-1 rounded-full bg-emerald-600"></div>
                        </div>

                        <p className="mt-8 text-lg leading-8 text-slate-600">
                            EHE works alongside local communities to improve education,
                            health, environmental protection, and sustainable livelihoods.
                            Our integrated programs empower children, youth, families,
                            and vulnerable communities through long-term development
                            initiatives.
                        </p>

                    </div>

                </div>
            </section>

            <section className="py-6 bg-slate-50">
                <div className="max-w-full mx-auto px-6">

                    {programGroups.map((program, index) => (

                        <div key={index} className="mb-8 md:mb-16">

                            <div className="text-center mb-12">

                                <h2 className="mt-3 text-xl md:text-3xl font-bold text-slate-900">
                                    {program.title}
                                </h2>

                                <div className="w-20 h-1 bg-emerald-600 rounded-full mx-auto mt-5"></div>

                                <p className="max-w-3xl mx-auto mt-6 text-slate-600 leading-8">
                                    {program.description}
                                </p>

                            </div>

                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                                {program.activities.map((activity, i) => {
                                    const Icon = activity.icon;

                                    return (
                                        <div
                                            key={i}
                                            className="group overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                                        >
                                            {/* Image */}
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={activity.image}
                                                    alt={activity.title}
                                                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />

                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex flex-col h-[230px]">

                                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition overflow-hidden line-clamp-1">
                                                    {activity.title}
                                                </h3>

                                                <p className="text-slate-600 text-sm leading-7 line-clamp-3">
                                                    {activity.description}
                                                </p>

                                                {/* Divider */}
                                                <div className="my-5 border-t border-slate-100" />

                                                {/* Button */}
                                                <button
                                                    onClick={() => setSelectedActivity(activity)}
                                                    className="flex items-center justify-between text-emerald-600 font-semibold group/button">
                                                    <span className="cursor-pointer">Learn More →</span>
                                                </button>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                    ))}

                </div>
            </section>

            {selectedActivity && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

                        <img
                            src={selectedActivity.image}
                            alt={selectedActivity.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />

                        <div className="p-4 md:p-8">

                            <div className="flex justify-between items-start">

                                <h2 className="text-lg md:text-3xl font-bold text-green-700">
                                    {selectedActivity.title}
                                </h2>

                            </div>

                            <p className="mt-3 md:mt-6 text-slate-700 leading-8">
                                {selectedActivity.description}
                            </p>

                            <div className="mt-4 md:mt-8 text-right">
                                <button
                                    onClick={() => setSelectedActivity(null)}
                                    className="px-6 py-2 rounded-xl bg-orange-300 text-white hover:bg-orange-500"
                                >
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}