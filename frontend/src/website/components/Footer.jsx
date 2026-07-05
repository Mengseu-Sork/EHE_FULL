import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline";

import {
    FaFacebookF,
    FaLinkedinIn,
    FaYoutube,
    FaTelegramPlane,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menus = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Programs", path: "/programs" },
    { name: "Our Projects", path: "/projects" },
    { name: "News & Events", path: "/news" },
    { name: "Contact", path: "/contact" },
];

const socialLinks = [
    {
        icon: FaFacebookF,
        url: "https://www.facebook.com/profile.php?id=61563473199822",
    },
    {
        icon: FaLinkedinIn,
        url: "#",
    },
    {
        icon: FaYoutube,
        url: "#",
    },
    {
        icon: FaTelegramPlane,
        url: "#",
    },
];

import logo from "../../assets/images/logo.jpg";

export default function Footer() {
    return (
        <footer className="bg-green-900 text-white">
            <div className="max-w-full mx-auto px-8 lg:px-12 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Organization */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={logo}
                                alt="EHE"
                                className="w-16 h-16 rounded-full bg-white p-1"
                            />

                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    EHE
                                </h3>

                                <p className="text-green-100 text-sm">
                                    Environment & Health Education
                                </p>
                            </div>
                        </div>

                        <p className="text-green-100 leading-8">
                            Empowering communities through environmental sustainability,
                            health awareness, and quality education initiatives across Cambodia.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-semibold text-[#D4AF37] mb-6">
                            Quick Links
                        </h4>

                        <ul className="grid grid-cols-2 gap-4 md:gap-6">
                            {menus.map((menu) => (
                                <li key={menu.path}>
                                    <NavLink
                                        to={menu.path}
                                        className={({ isActive }) =>
                                            `transition ${isActive
                                                ? "text-[#D4AF37] font-semibold"
                                                : "text-green-100 hover:text-[#D4AF37]"
                                            }`
                                        }
                                    >
                                        {menu.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-3 lg:col-span-2">
                        <h4 className="text-xl font-semibold text-[#D4AF37] mb-6">
                            Contact Information
                        </h4>

                        <div className="space-y-5">

                            <div className="space-y-6">

                                {/* Address */}
                                <a
                                    href="https://maps.google.com/?q=Kampong+Village,+Sangkat+Kampong+Rotes,+Krong+Stung+Sen,+Kampong+Thom,+Cambodia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 group underline"
                                >
                                    <MapPinIcon className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1 transition group-hover:scale-110" />

                                    <span className="text-green-100 leading-7 group-hover:text-white transition">
                                        Kampong Village, Sangkat Kampong Rotes,
                                        Krong Stung Sen, Kampong Thom Province, Cambodia
                                    </span>
                                </a>

                                {/* Phone */}
                                <a
                                    href="tel:+85512673634"
                                    className="flex items-center gap-4 group underline"
                                >
                                    <PhoneIcon className="w-6 h-6 text-[#D4AF37] transition group-hover:scale-110" />

                                    <span className="text-green-100 group-hover:text-white transition">
                                        (+855) 12 673 634
                                    </span>
                                </a>

                                {/* Email */}
                                <a
                                    href="mailto:eheo.kgthom@gmail.com"
                                    className="flex items-center gap-4 group underline"
                                >
                                    <EnvelopeIcon className="w-6 h-6 text-[#D4AF37] transition group-hover:scale-110" />

                                    <span className="text-green-100 break-all group-hover:text-white transition">
                                        eheo.kgthom@gmail.com
                                    </span>
                                </a>

                            </div>
                        </div>

                        <div className="flex justify-center md:justify-start gap-3 mt-8">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#052E24] transition-all duration-300 flex items-center justify-center"
                                    >
                                        <Icon className="w-6 h-6" />
                                    </a>
                                );
                            })}
                        </div>

                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-green-800 mt-12 pt-8 text-center">
                    <p className="text-green-200 text-sm">
                        © 2026 Environment & Health Education (EHE).
                    </p>
                </div>
            </div>
        </footer>
    );
}