import { useEffect, useState } from "react";
import api from "../../api/api";
import bg from "../../assets/images/about/icon1.jpg";

export default function Video() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const storageUrl =
        import.meta.env.VITE_API_URL.replace("/api", "") + "/storage";

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        try {
            const { data } = await api.get("/videos");
            setVideos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

                .ehe-serif {
                    font-family: 'Fraunces', serif;
                }

                .ehe-sans {
                    font-family: 'Inter', sans-serif;
                }

                .ehe-card {
                    transition: all .3s ease;
                }

                .ehe-card:hover {
                    transform: translateY(-4px);
                }
            `}</style>

            {/* Hero */}
            <section
                className="relative h-[40vh] lg:h-[70vh] flex items-center justify-start bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

                <div className="relative max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-3xl">
                        <span className="inline-flex px-4 py-2 rounded-full text-[10px] md:text-xs bg-emerald-500/20 border border-emerald-400/30 text-emerald-100">
                            Videos
                        </span>

                        <h1 className="mt-2 md:mt-6 text-xl md:text-5xl font-bold text-white leading-tight">
                            Environment &
                            <span className="block text-emerald-400">
                                Health Education
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-2 md:mt-8 max-w-2xl text-sm leading-7 text-slate-200 md:text-lg">

                            EHE works alongside communities across Cambodia to protect
                            natural resources, strengthen local leadership, improve
                            livelihoods, and promote health and education for sustainable
                            development.

                        </p>
                    </div>
                </div>
            </section>

            {/* Videos */}
            <section className="mx-auto max-w-full px-4 md:px-8 py-8 md:py-12">

                <div className="mb-6 md:mb-12 text-center">

                    <h2 className="text-lg md:text-3xl font-bold text-green-800">
                        Featured Videos
                    </h2>

                    <p className="mt-4 text-slate-500 text-xs md:text-sm">
                        Watch the latest activities and success stories from our
                        programmes.
                    </p>

                </div>
                {loading ? (

                    <div className="text-center">
                        Loading videos...
                    </div>

                ) : videos.length === 0 ? (

                    <div className="text-center text-slate-500">
                        No videos found.
                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                        {videos.map((video) => (

                            <div
                                key={video.id}
                                className="group overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                            >

                                <video
                                    controls
                                    preload="metadata"
                                    className="h-full w-full object-cover"
                                    src={`${storageUrl}/${video.video_file}`}
                                />

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}