import heroImage from "../../assets/images/home/bg.jpg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();
    return (
        <section
            className="relative h-[40vh] lg:h-[70vh] flex items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

            <div className="relative max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-3xl">
                    <span className="inline-flex px-4 py-2 rounded-full text-[10px] md:text-xs bg-emerald-500/20 border border-emerald-400/30 text-emerald-100">
                        Empowering Communities Since 2007
                    </span>

                    <h1 className="mt-2 md:mt-6 text-xl md:text-5xl font-bold text-white leading-tight">
                        Building Hope,
                        <span className="block text-emerald-400">
                            Changing Lives
                        </span>
                    </h1>

                    <p className="mt-2 md:mt-6 text-sm md:text-xl text-gray-200">
                        Creating sustainable solutions through education,
                        healthcare, environmental protection and community
                        development.
                    </p>

                    <div className="mt-4 md:mt-10 flex gap-4">
                        <button
                            onClick={() => navigate("#")}
                            className="px-4 md:px-8 py-2 md:py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 cursor-pointer">
                            Donate Now
                        </button>

                        <button
                            onClick={() => navigate("/about")}
                            className="px-4 md:px-8 py-2 md:py-4 border border-white/30 text-white rounded-xl backdrop-blur cursor-pointer">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}