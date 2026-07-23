import { useEffect, useState } from "react";
import api from "../../api/api";
import Header from "../components/header";

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
            <Header />

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

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

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