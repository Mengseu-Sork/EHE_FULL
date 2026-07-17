import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaTimes } from "react-icons/fa";


export default function CTA() {

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedPost, setSelectedPost] = useState(null);

    const storageUrl = import.meta.env.VITE_STORAGE_URL;


    useEffect(() => {

        loadPosts();

    }, []);

    const loadPosts = async () => {
        try {
            const res = await api.get("/news?limit=4");

            const data = Array.isArray(res.data)
                ? res.data
                : res.data.data || [];

            setPosts(data);
        } catch (err) {
            console.error(err);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-8 md:py-16 lg:py-16 bg-slate-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-16">

                    <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                        Stories From The Community
                    </span>

                    <h2 className="mt-5 text-lg md:text-3xl lg:text-4xl font-bold text-slate-900">
                        Our Latest Impact
                    </h2>

                    <p className="mt-4 text-sm md:text-lg text-slate-600">
                        Discover how EHE works alongside communities to protect
                        natural resources, improve livelihoods, and promote
                        health and education throughout Cambodia.
                    </p>

                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="
                                group
                                bg-white
                                rounded-3xl
                                overflow-hidden
                                shadow-sm
                                hover:shadow-xl
                                transition-all
                                duration-300
                                hover:-translate-y-2
                            "
                        >

                            {/* Image */}
                            <div className="relative overflow-hidden">

                                <img
                                    src={
                                        post.images?.length
                                            ? `${storageUrl}/${post.images[0]}`
                                            : "/images/no-image.png"
                                    }
                                    alt={post.title}
                                    className="
                                        w-full
                                        h-52 md:h-60 lg:h-64
                                        object-cover
                                        group-hover:scale-105
                                        transition-transform
                                        duration-500
                                    "
                                />

                                <span
                                    className="
                                        absolute top-4 left-4
                                        bg-emerald-600
                                        text-white
                                        px-3 py-1.5
                                        rounded-full
                                        text-xs md:text-sm
                                        font-semibold
                                    "
                                >
                                    {post.category}
                                </span>

                            </div>

                            {/* Content */}
                            <div className="p-5 md:p-6">

                                <p className="text-sm text-slate-500 mb-3">
                                    📅 {new Date(post.published_at).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </p>

                                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3 line-clamp-1">
                                    {post.title}
                                </h3>

                                <p className="text-slate-600 text-sm md:text-base leading-7 line-clamp-3">
                                    {post.body}
                                </p>

                                <button
                                    onClick={() => setSelectedPost(post)}
                                    className="
                                        inline-flex
                                        items-center
                                        mt-5 text-sm
                                        text-emerald-600
                                        font-semibold cursor-pointer
                                        hover:text-emerald-700
                                    "
                                >
                                    Read More →
                                </button>

                            </div>

                        </article>
                    ))}

                </div>

                {/* View All Button */}
                <div className="text-center mt-6 md:mt-12">
                    <Link
                        to="/kh/news"
                        className="
                            inline-flex
                            items-center
                            text-sm md:text-base
                            px-6 py-3
                            rounded-xl
                            bg-emerald-600
                            text-white
                            font-semibold
                            hover:bg-emerald-700
                            transition
                        "
                    >
                        View All Stories
                    </Link>
                </div>

            </div>

            {selectedPost && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={() => setSelectedPost(null)}
                >
                    <div
                        className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-4 py-2 md:px-6 md:py-3 flex items-start justify-between gap-2">

                            <h1 className="flex-1 text-sm font-semibold leading-5 md:leading-7 text-slate-900 md:mt-2 md:text-lg">

                                {selectedPost.title}

                            </h1>

                            <button
                                onClick={() => setSelectedPost(null)}
                                className="flex h-6 md:h-10 w-6 md:w-10 items-center justify-center rounded-full cursor-pointer bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-600"
                            >
                                <FaTimes className="text-sm" />
                            </button>

                        </div>

                        {selectedPost.images?.length ? (

                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{
                                    delay: 6000,
                                    disableOnInteraction: false,
                                }}
                                loop={selectedPost.images.length > 1}
                                spaceBetween={20}
                                slidesPerView={1}

                            >

                                {selectedPost.images.map((image, index) => (

                                    <SwiperSlide key={index}>

                                        <img
                                            src={`${storageUrl}/${image}`}
                                            alt={`Image ${index + 1}`}
                                            className="h-[250px] md:h-[350px] w-full object-cover"
                                        />

                                    </SwiperSlide>

                                ))}

                            </Swiper>

                        ) : (

                            <div className="flex h-[350px] items-center justify-center bg-gray-100 text-gray-500">

                                No Images

                            </div>

                        )}

                        <div className="p-4 md:p-6">

                            {/* Category & Date */}

                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">

                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-xs md:text-sm font-semibold text-emerald-700">

                                    {selectedPost.category}

                                </span>

                                <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">

                                    📅

                                    {selectedPost.published_at
                                        ? new Date(selectedPost.published_at).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )
                                        : "-"}

                                </div>

                            </div>

                            {/* Body */}

                            <div className="prose prose-slate mt-3 md:mt-6 max-w-none leading-6 md:leading-8 text-slate-700 text-xs md:text-sm">

                                <p className="whitespace-pre-line">

                                    {selectedPost.body}

                                </p>

                            </div>

                            {/* Footer */}

                            <div className="mt-5 flex justify-end pt-4">

                                <button
                                    onClick={() => setSelectedPost(null)}
                                    className="rounded-xl bg-amber-400 cursor-pointer px-6 py-2 font-semibold text-white transition hover:bg-amber-500"
                                >
                                    Close
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}