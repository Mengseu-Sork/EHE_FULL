import { useState } from "react";
import bg from "../../assets/images/new.jpg";


const CATEGORIES = [
  "All",
  "Education",
  "Healthcare",
  "Economic Development",
  "Water & Sanitation",
];

const ARTICLES = [
  {
    id: 1,
    category: "Education",
    title: "New Education Center Opens in Rural Kenya",
    date: "June 15, 2026",
    excerpt:
      "A new learning facility brings quality education access to over 500 children in the region.",
    image: "https://picsum.photos/seed/education-center/640/420",
  },
  {
    id: 2,
    category: "Healthcare",
    title: "Mobile Health Clinics Reach Remote Villages",
    date: "June 10, 2026",
    excerpt:
      "Our mobile health teams are bringing essential checkups and care directly to underserved communities.",
    image: "https://picsum.photos/seed/healthcare-visit/640/420",
  },
  {
    id: 3,
    category: "Economic Development",
    title: "Microloan Program Empowers Local Entrepreneurs",
    date: "June 5, 2026",
    excerpt:
      "Small business grants are helping families build sustainable income and break the cycle of poverty.",
    image: "https://picsum.photos/seed/econ-dev-team/640/420",
  },
  {
    id: 4,
    category: "Water & Sanitation",
    title: "Clean Water Wells Transform Daily Life",
    date: "May 28, 2026",
    excerpt:
      "New wells cut water collection time from hours to minutes, freeing children to attend school.",
    image: "https://picsum.photos/seed/water-well/640/420",
  },
];

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section
        className="relative h-[40vh] lg:h-[70vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-10 w-full">
          {/* Badge */}
          <span className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-400/30 px-4 py-1 text-[10px] md:text-xs font-medium text-emerald-100 backdrop-blur">
            Latest Stories
          </span>

          {/* Title */}
          <h1 className="mt-6 text-xl md:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
            News &
            <span className="text-emerald-400"> Updates</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Stay informed about our latest projects, community impact,
            success stories, and important announcements as we continue
            working toward a more sustainable future.
          </p>
        </div>
      </section>

      {/* Category Select */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
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
              {CATEGORIES.map((category) => (
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
      <section className="px-4 sm:px-6 py-8 sm:py-10">
        <div className="max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-44 sm:h-52 md:h-60 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-emerald-600 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs md:text-sm font-semibold">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3">
                  📅 {post.date}
                </p>

                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 sm:mb-3 line-clamp-1">
                  {post.title}
                </h3>

                <p className="text-slate-600 text-sm md:text-base leading-6 sm:leading-7 line-clamp-3">
                  {post.excerpt}
                </p>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center mt-4 sm:mt-5 text-sm sm:text-base cursor-pointer text-emerald-600 font-semibold hover:text-emerald-700"
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Selected post modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-48 sm:h-64 md:h-96 object-cover"
            />
            <div className="p-4 sm:p-6">
              <p className="text-sm text-slate-500 mb-2">
                📅 {selectedPost.date}
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                {selectedPost.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-6 sm:leading-7">
                {selectedPost.excerpt}
              </p>
              <button
                onClick={() => setSelectedPost(null)}
                className="mt-5 sm:mt-6 px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
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