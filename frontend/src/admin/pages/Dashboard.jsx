import { useEffect, useState } from "react";
import {
    FolderIcon,
    UsersIcon,
    BuildingOffice2Icon,
    ClockIcon,
    CalendarDaysIcon,
    ChartBarSquareIcon,
    PresentationChartLineIcon,
    EyeIcon,
    GlobeAltIcon,
    UserGroupIcon,
    VideoCameraIcon,
    NewspaperIcon,
} from "@heroicons/react/24/outline";

import api from "../../api/api";
import VisitorChart from "../components/dashboard/VisitorChart";

export default function Dashboard() {

    const currentYear = new Date().getFullYear();

    const [year, setYear] = useState(currentYear);

    const [stats, setStats] = useState({
        projects: 0,
        supporters: 0,
        histories: 0,
        videos: 0,

        total_visitors: 0,
        today_visitors: 0,
        this_month_visitors: 0,

        visitor_chart: [],
    });

    useEffect(() => {
        loadDashboard();
    }, [year]);

    const loadDashboard = async () => {
        try {

            const { data } = await api.get("/dashboard", {
                params: {
                    year,
                },
            });

            setStats(data);

        } catch (error) {
            console.error(error);
        }
    };

    const cards = [
        {
            title: "Projects",
            value: stats.projects,
            bg: "bg-emerald-100",
            text: "text-emerald-600",
            icon: FolderIcon,
        },
        {
            title: "Supporters",
            value: stats.supporters,
            bg: "bg-blue-100",
            text: "text-blue-600",
            icon: BuildingOffice2Icon,
        },
        {
            title: "Histories",
            value: stats.histories,
            bg: "bg-amber-100",
            text: "text-amber-600",
            icon: ClockIcon,
        },
        {
            title: "Videos",
            value: stats.videos,
            bg: "bg-amber-100",
            text: "text-amber-600",
            icon: VideoCameraIcon,
        },
        {
            title: "News & Events",
            value: stats.videos,
            bg: "bg-amber-100",
            text: "text-amber-600",
            icon: NewspaperIcon,
        },

    ];

    return (
        <div className="space-y-4 overflow-auto h-[95vh]">

            {/* Hero */}

            <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-500 p-6 text-white shadow-xl">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <p className="text-sm uppercase tracking-[0.3em] text-emerald-100">
                            NGO Dashboard
                        </p>

                        <h1 className="mt-2 text-2xl font-black">
                            Welcome Back 👋
                        </h1>

                        <p className="mt-2 max-w-2xl text-emerald-100">
                            Monitor your projects, supporters and website visitor
                            analytics from one dashboard.
                        </p>

                    </div>

                    <div className="mt-8 lg:mt-0">

                        <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md shadow-lg">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                                <CalendarDaysIcon className="h-7 w-7 text-white" />
                            </div>

                            <div className="flex-1">
                                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100">
                                    Analytics Year
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-white">
                                    {year}
                                </h2>
                            </div>

                            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-100">
                                Active
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Statistics */}

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-5">

                {cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={card.title}
                            className="rounded-3xl bg-white p-6 shadow transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        {card.title}
                                    </p>

                                    <h2 className="mt-3 text-2xl font-black text-slate-800">
                                        {card.value}
                                    </h2>

                                </div>

                                <div className={`rounded-2xl p-4 ${card.bg}`}>

                                    <Icon
                                        className={`h-8 w-8 ${card.text}`}
                                    />

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* Visitor Summary */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <div className="group rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Total Visitors
                            </p>

                            <h2 className="mt-3 text-2xl font-black text-slate-800">
                                {stats.total_visitors}
                            </h2>

                            <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                Website Traffic
                            </span>

                        </div>

                        <div className="rounded-2xl bg-emerald-500 p-4 shadow-lg">

                            <EyeIcon className="h-8 w-8 text-white" />

                        </div>

                    </div>

                </div>

                <div className="group rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Today's Visitors
                            </p>

                            <h2 className="mt-3 text-2xl font-black text-slate-800">
                                {stats.today_visitors}
                            </h2>

                            <span className="mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                Today
                            </span>

                        </div>

                        <div className="rounded-2xl bg-blue-500 p-4 shadow-lg">

                            <CalendarDaysIcon className="h-8 w-8 text-white" />

                        </div>

                    </div>

                </div>

                <div className="group rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                This Month
                            </p>

                            <h2 className="mt-3 text-2xl font-black text-slate-800">
                                {stats.this_month_visitors}
                            </h2>

                            <span className="mt-3 inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                                Monthly
                            </span>

                        </div>

                        <div className="rounded-2xl bg-purple-500 p-4 shadow-lg">

                            <ChartBarSquareIcon className="h-8 w-8 text-white" />

                        </div>

                    </div>

                </div>

                <div className="group rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                This Year
                            </p>

                            <h2 className="mt-3 text-2xl font-black text-slate-800">
                                {year}
                            </h2>

                            <span className="mt-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                Analytics
                            </span>

                        </div>

                        <div className="rounded-2xl bg-orange-500 p-4 shadow-lg">

                            <GlobeAltIcon className="h-8 w-8 text-white" />

                        </div>

                    </div>

                </div>

            </div>

            {/* Analytics */}

            <div className="rounded-3xl bg-white shadow">

                <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">

                            <PresentationChartLineIcon className="h-7 w-7 text-white" />

                        </div>

                        <div>

                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                Analytics
                            </span>

                            <h2 className="mt-2 text-2xl font-bold text-green-800">
                                Visitor Analytics
                            </h2>

                        </div>

                    </div>

                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-emerald-600 focus:outline-none"
                    >
                        {Array.from(
                            { length: 6 },
                            (_, i) => currentYear - i
                        ).map((y) => (
                            <option
                                key={y}
                                value={y}
                            >
                                {y}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="p-6">

                    <VisitorChart
                        data={stats.visitor_chart}
                    />

                </div>

            </div>

        </div>
    );
}