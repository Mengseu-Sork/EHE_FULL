import { useEffect, useState } from "react";
import api from "../../api/api";
import Header from "../components/Header";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

export default function StoriesHub() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [selectedStory, setSelectedStory] = useState(null);

    useEffect(() => {
        fetchStories(currentPage);
    }, [currentPage]);

    const fetchStories = async (page = 1) => {
        setLoading(true);

        try {
            const res = await api.get(`/stories?page=${page}`);

            console.log(res.data);

            setStories(res.data.data);
            setCurrentPage(res.data.current_page);
            setLastPage(res.data.last_page);
        } catch (error) {
            console.error("Error fetching stories:", error);
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (images) => {
        if (!images)
            return "https://placehold.co/600x400?text=No+Image";

        let imageList = images;

        if (typeof images === "string") {
            try {
                imageList = JSON.parse(images);
            } catch {
                imageList = [images];
            }
        }

        if (!Array.isArray(imageList) || imageList.length === 0)
            return "https://placehold.co/600x400?text=No+Image";

        const image = imageList[0];

        return image.startsWith("http")
            ? image
            : `${STORAGE_URL}/${image}`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="mx-auto max-w-full px-6 py-6 md:py-12">

                <div className="mb-3 md:mb-6 text-center">
                    <h1 className="text-lg md:text-3xl font-extrabold text-green-700">
                        Success Stories
                    </h1>

                    <p className="mx-auto mt-2 md:mt-5 max-w-4xl text-sm md:text-base leading-6 md:leading-8 text-slate-600">
                        Stay informed with the latest news, field activities, success
                        stories, and project updates from EHE as we work together to build
                        healthier communities and a more sustainable future.
                    </p>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-lg">
                        Loading...
                    </div>
                ) : stories.length === 0 ? (
                    <div className="py-20 text-center text-gray-500">
                        No stories found.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

                            {stories.map((story) => (
                                <div
                                    key={story.id}
                                    className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <img
                                        src={getImageUrl(story.images)}
                                        alt={story.title}
                                        className="h-56 w-full object-cover"
                                    />

                                    <div className="p-6">

                                        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                                            <CalendarDaysIcon className="h-5 w-5 text-green-600" />

                                            {new Date(
                                                story.publish_date
                                            ).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </div>

                                        <h2 className="line-clamp-1 text-base md:text-lg font-bold text-gray-900">
                                            {story.title}
                                        </h2>

                                        <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                                            {story.description}
                                        </p>

                                        {/* Footer */}
                                        <div className="mt-3 md:mt-6 flex items-center justify-between">
                                            <button
                                                onClick={() => setSelectedStory(story)}
                                                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs md:text-sm font-semibold cursor-pointer text-white transition hover:bg-emerald-700">
                                                Read More

                                                <svg
                                                    className="h-4 w-4 transition group-hover:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Pagination */}
                        <div className="mt-3 md:mt-8 flex items-center justify-center gap-4">

                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                                className={`rounded-lg text-xs px-3 py-1 font-medium ${currentPage === 1
                                    ? "cursor-not-allowed bg-gray-100 text-gray-500"
                                    : "bg-green-600 text-white hover:bg-green-700"
                                    }`}
                            >
                                Previous
                            </button>

                            <span className="font-semibold text-xs">
                                Page {currentPage} of {lastPage}
                            </span>

                            <button
                                disabled={currentPage === lastPage}
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                className={`rounded-lg text-xs px-3 py-1 font-medium ${currentPage === lastPage
                                    ? "cursor-not-allowed bg-gray-100 text-gray-500"
                                    : "bg-green-600 text-white hover:bg-green-700"
                                    }`}
                            >
                                Next
                            </button>

                        </div>
                    </>
                )}
            </div>

            {/* Selected Story Modal */}
            {selectedStory && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-600/50 p-4 backdrop-blur-md transition-all duration-200"
                    onClick={() => setSelectedStory(null)}
                >
                    <div
                        className="relative flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Floating Close Button */}
                        <button
                            onClick={() => setSelectedStory(null)}
                            className="absolute right-4 top-4 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-red-600 backdrop-blur-md transition-all hover:bg-slate-200 active:scale-95"
                            aria-label="Close modal"
                        >
                            <svg className="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Main Scrollable Content */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Media Carousel */}
                            {(() => {
                                let images = [];
                                try {
                                    images = Array.isArray(selectedStory.images)
                                        ? selectedStory.images
                                        : JSON.parse(selectedStory.images || "[]");
                                } catch (e) {
                                    images = [];
                                }

                                return images.length > 0 ? (
                                    <div className="relative aspect-video w-full bg-slate-900">
                                        <Swiper
                                            modules={[Pagination, Autoplay]}
                                            pagination={{ clickable: true }}
                                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                                            loop={images.length > 1}
                                            className="h-full w-full [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-pagination-bullet-active]:bg-white"
                                        >
                                            {images.map((image, index) => {
                                                const src = image.startsWith("http")
                                                    ? image
                                                    : `${STORAGE_URL}/${image}`;

                                                return (
                                                    <SwiperSlide key={index}>
                                                        <img
                                                            src={src}
                                                            alt={selectedStory.title || "Story header media"}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                    </div>
                                ) : (
                                    <div className="flex aspect-video w-full flex-col items-center justify-center bg-slate-100 text-slate-400">
                                        <svg className="h-10 w-10 stroke-current opacity-60" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                        <span className="mt-2 text-xs font-medium tracking-wide uppercase">No Image Available</span>
                                    </div>
                                );
                            })()}

                            <div className="bg-white px-4 md:px-8 py-4 md:py-8">

                                {/* Meta */}
                                <div className="flex flex-wrap items-center gap-3">

                                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3M4 11h16M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                                            />
                                        </svg>

                                        {new Date(selectedStory.publish_date).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}

                                    </span>

                                </div>

                                {/* Title */}

                                <h1 className="mt-3 text-base font-semibold leading-7 md:text-lg">
                                    {selectedStory.title}
                                </h1>

                                {/* Decorative Line */}

                                <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-green-600 to-emerald-400"></div>

                                {/* Overview */}

                                <div className="mt-4">

                                    <h2 className="text-base md:text-lg font-bold text-green-700">
                                        Description
                                    </h2>

                                    <p className="mt-2 text-slate-700">
                                        {selectedStory.description}
                                    </p>

                                </div>

                                {/* Attachment */}

                                {selectedStory.attachment && (

                                    <div className="mt-4">

                                        <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 py-3 px-6">

                                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                                                <div className="flex items-center gap-4">

                                                    <div>

                                                        <h3 className="text-base md:text-lg font-bold text-slate-900">
                                                            Supporting Document
                                                        </h3>

                                                        <p className="mt-1 text-xs text-slate-600">
                                                            View or download the attached document for
                                                            additional information.
                                                        </p>

                                                    </div>

                                                </div>

                                                <a
                                                    href={`${STORAGE_URL}/${selectedStory.attachment}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-xs gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                                                >
                                                    View Document

                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>

                                                </a>

                                            </div>

                                        </div>

                                    </div>

                                )}

                            </div>
                        </div>

                        {/* Sticky Bottom Actions */}
                        <div className="flex items-center justify-end border-t border-slate-100 bg-white px-6 py-4">
                            <button
                                onClick={() => setSelectedStory(null)}
                                className="rounded-xl px-6 py-2.5 text-sm border text-white font-semibold bg-amber-500 shadow-md transition-all hover:bg-amber-600 active:scale-95"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}