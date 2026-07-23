import Header from "../components/Header";

import { useEffect, useState } from "react";
import api from "../../api/api";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaTimes } from "react-icons/fa";

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");

  const [selectedPost, setSelectedPost] = useState(null);

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const storageUrl = import.meta.env.VITE_STORAGE_URL;


  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const loadPosts = async (pageNumber) => {
    try {
      const res = await api.get(`/news?page=${pageNumber}`);

      setPosts(res.data.data);
      setLastPage(res.data.last_page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);


  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category).filter(Boolean)),
  ];


  return (
    <div className="min-h-screen">

      {/* Hero */}
      <Header />

      {/* Category Select */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Title */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Filter activity
            </h3>
          </div>
          <div className="relative w-full max-w-sm">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    pr-10
                    text-sm
                    font-medium
                    text-slate-700
                    shadow-sm
                    transition-all
                    duration-200
                    hover:border-emerald-400
                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-100
                    focus:outline-none
                  "
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="px-4 sm:px-6 py-8">
        <div className="max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">

          {filtered.map((post) => (
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
                                        text-xs
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

        <div className="flex justify-center gap-2 mt-6 md:mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded text-xs md:text-sm bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 text-xs md:text-sm">
            Page {page} of {lastPage}
          </span>

          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded text-xs md:text-sm bg-emerald-600 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      {/* Selected post modal */}
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

    </div>
  );
}