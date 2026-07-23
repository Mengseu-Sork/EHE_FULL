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
    { name: "Home", path: "/kh/home" },
    { name: "About Us", path: "/kh/about" },
    { name: "Our Programs", path: "/kh/programs" },
    { name: "News", path: "/kh/news" },
    { name: "Public Documents", path: "/kh/documents" },
    { name: "Success Stories", path: "/kh/stories" },
    { name: "Videos", path: "/kh/videos" },
    { name: "Contact", path: "/kh/contact" },
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
            <div className="max-w-full mx-auto px-8 lg:px-12 py-8 lg:py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">

                    {/* Organization */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={logo}
                                alt="EHE"
                                className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-white p-1"
                            />

                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-white">
                                    EHE
                                </h3>

                                <p className="text-green-100 text-sm">
                                    Environment & Health Education
                                </p>
                            </div>
                        </div>

                        <p className="text-green-100 leading-6 md:leading-8 text-xs md:text-sm">
                            Empowering communities through environmental sustainability,
                            health awareness, and quality education initiatives across Cambodia.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg md:text-xl font-semibold text-[#D4AF37] mb-6">
                            Quick Links
                        </h4>

                        <ul className="grid grid-cols-2 gap-4 md:gap-6 text-xs md:text-sm">
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
                        <h4 className="text-lg md:text-xl font-semibold text-[#D4AF37] mb-3 md:mb-6">
                            Contact Information
                        </h4>

                        <div className="space-y-4">

                            <div className="space-y-4">

                                {/* Address */}
                                <a
                                    href="https://maps.google.com/?q=Kampong+Village,+Sangkat+Kampong+Rotes,+Krong+Stung+Sen,+Kampong+Thom,+Cambodia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 group underline"
                                >
                                    <MapPinIcon className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1 transition group-hover:scale-110" />

                                    <span className="text-green-100 leading-7 text-xs md:text-sm group-hover:text-white transition">
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

                                    <span className="text-green-100 text-xs md:text-sm group-hover:text-white transition">
                                        (+855) 12 673 634
                                    </span>
                                </a>

                                {/* Phone */}
                                <a
                                    href="tel:+85516673634"
                                    className="flex items-center gap-4 group underline"
                                >
                                    <PhoneIcon className="w-6 h-6 text-[#D4AF37] transition group-hover:scale-110" />

                                    <span className="text-green-100 text-xs md:text-sm group-hover:text-white transition">
                                        (+855) 16 673 634
                                    </span>
                                </a>

                                {/* Email */}
                                <a
                                    href="mailto:eheo.kgthom@gmail.com"
                                    className="flex items-center gap-4 group underline"
                                >
                                    <EnvelopeIcon className="w-6 h-6 text-[#D4AF37] transition group-hover:scale-110" />

                                    <span className="text-green-100 text-xs md:text-sm break-all group-hover:text-white transition">
                                        eheo.kgthom@gmail.com
                                    </span>
                                </a>

                            </div>
                        </div>

                        <div className="flex justify-center md:justify-start gap-3 mt-6">
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
                <div className="border-t border-green-800 mt-8 pt-6 text-center">
                    <p className="text-green-200 text-xs md:text-sm">
                        © 2026 Environment & Health Education (EHE).
                    </p>
                </div>
            </div>
        </footer>
    );
}