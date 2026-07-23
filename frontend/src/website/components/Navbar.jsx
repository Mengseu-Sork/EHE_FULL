import { NavLink, useLocation } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";


export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const location = useLocation();

    const navRef = useRef(null);

    const menus = [
        { name: "Home", path: "/kh/home" },
        { name: "About Us", path: "/kh/about" },
        { name: "Our Programs", path: "/kh/programs" },
        { name: "News", path: "/kh/news" },
        {
            name: "Resources Hub",
            children: [
                { name: "Public Documents", path: "/kh/documents" },
                { name: "Success Stories", path: "/kh/stories" },
                { name: "Videos", path: "/kh/videos" },
            ],
        },
        { name: "Contact", path: "/kh/contact" },
    ];

    return (
        <header ref={navRef} className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-20 flex items-center justify-between">
                    {/* Logo */}
                    <NavLink
                        to="/kh/home"
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
                        {menus.map((menu) =>
                            menu.children ? (
                                <div key={menu.name} className="relative group">
                                    {(() => {
                                        const isResourcesActive = menu.children.some(
                                            (child) => location.pathname === child.path
                                        );

                                        return (
                                            <>
                                                {/* Parent Menu */}
                                                <button
                                                    className={`relative flex items-center gap-1 py-2 font-semibold transition ${isResourcesActive
                                                            ? "text-emerald-600"
                                                            : "text-slate-700 hover:text-emerald-600"
                                                        }`}
                                                >
                                                    {menu.name}

                                                    <ChevronDown
                                                        className="w-4 h-4 transition-transform group-hover:rotate-180"
                                                    />

                                                    {/* Underline */}
                                                    <span
                                                        className={`absolute left-0 bottom-0 h-[3px] bg-emerald-600 rounded-full transition-all duration-300 ${isResourcesActive ? "w-full" : "w-0 group-hover:w-full"
                                                            }`}
                                                    />
                                                </button>

                                                {/* Dropdown */}
                                                <div className="absolute left-0 top-full mt-2 w-[150px] rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50">
                                                    {menu.children.map((child) => (
                                                        <NavLink
                                                            key={child.path}
                                                            to={child.path}
                                                            className={({ isActive }) =>
                                                                `block px-3 py-3 text-sm transition ${isActive
                                                                    ? "bg-emerald-50 text-emerald-600 font-semibold"
                                                                    : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                                                                }`
                                                            }
                                                        >
                                                            {child.name}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <NavLink
                                    key={menu.path}
                                    to={menu.path}
                                    className={({ isActive }) =>
                                        `relative py-2 font-semibold transition ${isActive
                                            ? "text-emerald-600"
                                            : "text-slate-700 hover:text-emerald-600"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {menu.name}

                                            <span
                                                className={`absolute left-0 bottom-0 h-[3px] bg-emerald-600 rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0"
                                                    }`}
                                            />
                                        </>
                                    )}
                                </NavLink>
                            )
                        )}
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
                        <div className="flex flex-col">

                            {menus.map((menu) =>
                                menu.children ? (
                                    <div key={menu.name}>

                                        {/* Parent */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu === menu.name
                                                        ? null
                                                        : menu.name
                                                )
                                            }
                                            className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-slate-700 hover:text-emerald-600 transition"
                                        >
                                            {menu.name}

                                            <ChevronDown
                                                className={`w-5 h-5 transition-transform duration-300 ${openMenu === menu.name
                                                    ? "rotate-180"
                                                    : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* Children */}
                                        {openMenu === menu.name && (
                                            <div className="ml-4 mb-2 border-l border-slate-200">

                                                {menu.children.map((child) => (
                                                    <NavLink
                                                        key={child.path}
                                                        to={child.path}
                                                        onClick={() => {
                                                            setMobileOpen(false);
                                                            setOpenMenu(null);
                                                        }}
                                                        className={({ isActive }) =>
                                                            `block px-5 py-3 text-sm transition ${isActive
                                                                ? "text-emerald-600 font-semibold bg-emerald-50"
                                                                : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                                                            }`
                                                        }
                                                    >
                                                        {child.name}
                                                    </NavLink>
                                                ))}

                                            </div>
                                        )}

                                    </div>
                                ) : (
                                    <NavLink
                                        key={menu.path}
                                        to={menu.path}
                                        onClick={() => setMobileOpen(false)}
                                        className={({ isActive }) =>
                                            `block px-4 py-3 font-medium transition ${isActive
                                                ? "text-emerald-600 border-l-4 border-emerald-600 bg-emerald-50"
                                                : "text-slate-700 hover:text-emerald-600"
                                            }`
                                        }
                                    >
                                        {menu.name}
                                    </NavLink>
                                )
                            )}

                            {/* Donate Button */}
                            <div className="pt-4 mt-4 border-t border-slate-200">

                                <NavLink
                                    to="#"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full text-center rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
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