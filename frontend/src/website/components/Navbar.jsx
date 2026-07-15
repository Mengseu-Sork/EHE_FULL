import { NavLink } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef(null);

    const menus = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Our Programs", path: "/programs" },
        { name: "Our Projects", path: "/projects" },
        { name: "News & Events", path: "/news" },
        { name: "Videos", path: "/videos" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <header ref={navRef} className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-20 flex items-center justify-between">
                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 md:w-16 h-10 md:h-16 rounded-full flex items-center justify-center shadow-lg">
                            <img
                                src={new URL("../../assets/images/logo.jpg", import.meta.url).href}
                                alt="Logo"
                                className="w-10 md:w-16 h-10 md:h-16 rounded-full"
                            />
                        </div>

                        <div>
                            <h1 className="text-xl md:text-3xl font-bold text-green-700">
                                EHE
                            </h1>

                            <p className="text-xs text-slate-500">
                                Environment and Health Education
                            </p>
                        </div>
                    </NavLink>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {menus.map((menu) => (
                            <NavLink
                                key={menu.path}
                                to={menu.path}
                                className={({ isActive }) =>
                                    `relative py-2 text-[16px] transition ${isActive
                                        ? "text-emerald-600 font-semibold"
                                        : "text-slate-700 hover:text-emerald-600"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {menu.name}

                                        <span
                                            className={`absolute left-0 bottom-0 h-[3px] bg-emerald-600 rounded-full transition-all duration-300 ${isActive
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                                }`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="hidden lg:flex items-center gap-4">
                        <NavLink
                            to="#"
                            className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-lg"
                        >
                            Donate
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() =>
                            setMobileOpen(!mobileOpen)
                        }
                        className="lg:hidden"
                    >
                        <Bars3Icon className="w-8 h-8 text-slate-800" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="lg:hidden border-t border-slate-100 py-4 animate-fade-in">
                        <div className="flex flex-col gap-2">

                            {menus.map((menu) => (
                                <NavLink
                                    key={menu.path}
                                    to={menu.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 font-medium transition-all duration-300 ${isActive
                                            ? "text-[#D4AF37] border-l-4 border-[#D4AF37] pl-3"
                                            : "text-slate-700 hover:text-[#D4AF37]"
                                        }`
                                    }
                                >
                                    {menu.name}
                                </NavLink>
                            ))}

                            <div className="w-24 pt-3 mt-3 border-t border-slate-200">
                                <NavLink
                                    to="#"
                                    onClick={() => setMobileOpen(false)}
                                    className={({ isActive }) =>
                                        `block text-center px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${isActive
                                            ? "bg-emerald-700 text-white"
                                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                                        }`
                                    }
                                >
                                    Donate
                                </NavLink>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}