import { Link } from "react-router-dom";

export default function ProgramCard({
    title,
    description,
    color,
}) {
    return (
        <div
            className={`
                group bg-white rounded-3xl py-6 px-4
                border-t-4 ${color}
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-2
            `}
            >
            <h3 className="text-base font-bold text-slate-900 mb-4">
                {title}
            </h3>

            <p className="text-slate-600 leading-7 text-sm">
                {description}
            </p>

            <Link
                to="/kh/programs"
                className="mt-6 inline-block text-emerald-600 font-semibold hover:text-emerald-700"
            >
                Learn More →
            </Link>
        </div>
    );
}