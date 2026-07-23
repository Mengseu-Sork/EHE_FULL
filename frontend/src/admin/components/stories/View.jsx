import {
    XMarkIcon,
    BookOpenIcon,
    PhotoIcon,
    CalendarDaysIcon,
    PaperClipIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

import { Swiper, SwiperSlide } from "swiper/react";

import {
    Pagination,
    Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

export default function View({
    story,
    onClose,
}) {
    if (!story) return null;

    const getImageUrl = (image) => {
        if (!image) return "";

        return image.startsWith("http")
            ? image
            : `${STORAGE_URL}/${image}`;
    };

    const images = Array.isArray(story.images)
        ? story.images
        : JSON.parse(story.images || "[]");


    const attachmentUrl = story.attachment
        ? `${STORAGE_URL}/${story.attachment}`
        : null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between rounded-t-2xl border-b border-slate-200 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">

                            <BookOpenIcon className="h-6 w-6 text-white" />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-white">
                                Story Details
                            </h2>

                            <p className="mt-1 text-sm text-green-100">
                                View complete information about this success story.
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-white/10 p-2 cursor-pointer text-white transition-all duration-200 hover:rotate-90 hover:bg-white/20"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>

                </div>

                <div className="space-y-4 p-4">

                    {/* Images */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                        <div className="mb-5 flex items-center justify-between">

                            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800">

                                <PhotoIcon className="h-6 w-6 text-green-600" />

                                Story Images

                            </h3>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                                {images.length} Image(s)

                            </span>

                        </div>

                        {images.length > 0 ? (

                            <Swiper
                                modules={[Pagination, Autoplay]}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                }}
                                spaceBetween={20}
                                loop={images.length > 1}
                                className="rounded-2xl overflow-hidden shadow-lg"

                            >
                                {images.map((image, index) => (

                                    <SwiperSlide key={index}>

                                        <a
                                            href={getImageUrl(image)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >

                                            <img
                                                src={getImageUrl(image)}
                                                alt={`Story ${index + 1}`}
                                                className="h-[300px] w-full rounded-2xl object-cover transition duration-500 hover:scale-105"
                                            />

                                        </a>

                                    </SwiperSlide>

                                ))}
                            </Swiper>

                        ) : (

                            <div className="flex h-72 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50">

                                <div className="text-center">

                                    <PhotoIcon className="mx-auto h-14 w-14 text-slate-400" />

                                    <p className="mt-3 text-slate-500">

                                        No images available.

                                    </p>

                                </div>

                            </div>

                        )}

                    </div>


                    {/* Title */}

                    <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-3">

                        <div className="flex items-start gap-4">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">

                                <BookOpenIcon className="h-5 w-5 text-white" />

                            </div>

                            <div className="flex-1">

                                <h2 className="text-base font-semibold text-slate-800">

                                    {story.title}

                                </h2>

                            </div>

                        </div>

                    </div>

                    {/* Publish Date */}

                    <div className="grid gap-5 md:grid-cols-2">

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-green-100 p-3">

                                    <CalendarDaysIcon className="h-6 w-6 text-green-600" />

                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">

                                        Publish Date

                                    </p>

                                    <p className="font-semibold text-slate-800">

                                        {new Date(story.publish_date).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-blue-100 p-3">

                                    <PaperClipIcon className="h-6 w-6 text-blue-600" />

                                </div>

                                <div className="flex-1">

                                    <p className="text-sm text-slate-500">

                                        Attachment

                                    </p>

                                    {
                                        attachmentUrl ? (

                                            <a
                                                href={attachmentUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold text-blue-600 hover:underline"
                                            >
                                                Open Attachment
                                            </a>

                                        ) : (

                                            <span className="text-slate-500">

                                                No attachment

                                            </span>

                                        )
                                    }

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Description */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">

                            <DocumentTextIcon className="h-6 w-6 text-green-600" />

                            Description

                        </h3>

                        <div className="rounded-xl bg-slate-50 p-3 whitespace-pre-line leading-8 text-slate-700">

                            {story.description || "No description available."}

                        </div>

                    </div>


                    {/* Footer */}

                    <div className="flex justify-end border-t pt-6">

                        <button
                            onClick={onClose}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <XMarkIcon className="h-5 w-5" />
                            Close
                        </button>


                    </div>

                </div>

            </div>

        </div>

    );

}