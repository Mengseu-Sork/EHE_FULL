import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
    Bars3Icon,
    HomeIcon,
    ClockIcon,
    FolderIcon,
    NewspaperIcon,
    UserGroupIcon,
    RectangleGroupIcon,
    ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

import logo from "../../assets/images/logo.jpg";

export default function AdminLayout() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/admin/login");
    };

    const menu = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: HomeIcon,
        },
        {
            name: "History",
            path: "/admin/history",
            icon: ClockIcon,
        },
        {
            name: "Projects",
            path: "/admin/projects",
            icon: FolderIcon,
        },
        {
            name: "News",
            path: "/admin/news",
            icon: NewspaperIcon,
        },
        {
            name: "Supporters",
            path: "/admin/supporters",
            icon: UserGroupIcon,
        },
    ];

    return (
        <div className="flex min-h-screen bg-slate-100">

            {/* Sidebar */}
            <aside
                className={`bg-green-900 text-white flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"
                    }`}
            >
                {/* Logo */}
                <div className="flex h-24 items-center justify-between border-b border-white/10 px-4">

                    <div className="flex items-center gap-3 ml-7">

                        {sidebarOpen && (

                            <div>

                                <h1 className="text-xl font-bold text-white">
                                    EHE Admin
                                </h1>

                                <p className="text-xs text-green-200">
                                    Administration Panel
                                </p>

                            </div>

                        )}

                    </div>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="rounded-lg p-2 transition hover:bg-emerald-800 cursor-pointer"
                    >
                        <Bars3Icon className="h-6 w-6 text-white" />
                    </button>

                </div>

                {/* Menu */}
                <nav className="flex-1 p-4 space-y-2">

                    {menu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center ${sidebarOpen
                                        ? "justify-start"
                                        : "justify-center"
                                    } gap-3 rounded-xl px-4 py-3 transition-all ${isActive
                                        ? "bg-green-700 text-white"
                                        : "text-emerald-100 hover:bg-green-700"
                                    }`
                                }
                            >
                                <Icon className="h-6 w-6 flex-shrink-0" />

                                {sidebarOpen && (
                                    <span className="font-medium">
                                        {item.name}
                                    </span>
                                )}
                            </NavLink>
                        );
                    })}

                </nav>

                {/* Logout */}
                <div className="border-t border-white/10 p-4">

                    <button
                        onClick={logout}
                        className={`flex items-center cursor-pointer ${sidebarOpen
                            ? "justify-start"
                            : "justify-center"
                            } gap-3 rounded-xl bg-red-500 px-4 py-3 transition hover:bg-red-700`}
                    >
                        <ArrowLeftOnRectangleIcon className="h-6 w-6" />

                        {sidebarOpen && (
                            <span className="font-medium">
                                Logout
                            </span>
                        )}
                    </button>

                </div>

            </aside>

            {/* Main */}
            <div className="flex flex-1">

                {/* Content */}
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}