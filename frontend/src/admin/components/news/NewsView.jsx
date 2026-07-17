
import {
    FaCalendarAlt,
    FaFolderOpen,
    FaNewspaper,
    FaClock,
    FaImages
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const storageUrl = import.meta.env.VITE_STORAGE_URL;

export default function NewsView({ news, onClose }) {

    if (!news) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-5">

                    <div>

                        <h2 className="text-2xl font-bold text-white">

                            News Details

                        </h2>

                        <p className="mt-1 text-sm text-green-100">

                            View article information

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg cursor-pointer bg-white/20 px-4 py-2 text-white transition hover:bg-white/30"
                    >
                        ✕

                    </button>

                </div>

                {/* Body */}

                <div className="space-y-8 p-6">

                    {/* Images */}

                    <div>

                        {news.images?.length ? (

                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{
                                    delay: 6000,
                                    disableOnInteraction: false,
                                }}
                                loop={news.images.length > 1}
                                spaceBetween={20}
                                slidesPerView={1}
                                className="rounded-xl"
                            >

                                {news.images.map((image, index) => (

                                    <SwiperSlide key={index}>

                                        <img
                                            src={`${storageUrl}/${image}`}
                                            alt={`Image ${index + 1}`}
                                            className="h-[350px] w-full rounded-xl object-cover"
                                        />

                                    </SwiperSlide>

                                ))}

                            </Swiper>

                        ) : (

                            <div className="rounded-xl border border-dashed py-16 text-center text-gray-500">

                                No Images

                            </div>

                        )}

                    </div>

                    {/* Information */}

                    <div className="grid gap-5 md:grid-cols-2">

                        {/* Title */}

                        <div className="col-span-2 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-5 shadow-sm">

                            <div className="flex items-center  gap-4">

                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">

                                    <FaNewspaper className="text-lg text-white" />

                                </div>

                                <div className="min-w-0 flex-1">

                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600">

                                        News Title

                                    </span>

                                </div>

                            </div>


                            <h2 className="mt-2 text-base leading-tight">

                                {news.title}

                            </h2>

                            <div className="mt-5 border-t border-gray-200"></div>

                        </div>

                        {/* Category */}

                        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-blue-100 p-3">

                                    <FaFolderOpen className="text-xl text-blue-600" />

                                </div>

                                <div>

                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">

                                        Category

                                    </p>

                                    <span className="mt-2 inline-flex rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">

                                        {news.category}

                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Published */}

                        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-emerald-100 p-3">

                                    <FaCalendarAlt className="text-xl text-emerald-600" />

                                </div>

                                <div>

                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">

                                        Published Date

                                    </p>

                                    <h4 className="mt-1 text-lg font-semibold text-gray-800">

                                        {news.published_at
                                            ? new Date(news.published_at).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )
                                            : "-"}

                                    </h4>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Body */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-500">

                            News Content

                        </label>

                        <div className="rounded-xl bg-gray-50 p-5 whitespace-pre-wrap leading-8">

                            {news.body || "No content"}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}