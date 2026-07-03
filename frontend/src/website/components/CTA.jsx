import { Link } from "react-router-dom";
import { useState } from "react";

export default function CTA() {
    const posts = [
        {
            id: 1,
            category: "Water & Sanitation",
            date: "February 28, 2024",
            title: "Clean Water Project Brings Relief to 10,000 People",
            description:
                "The completion of new wells and water purification systems has provided clean and safe drinking water to thousands of families.",
            image:
                "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
        },
        {
            id: 2,
            category: "Emergency Relief",
            date: "February 20, 2024",
            title: "Emergency Response Supporting Communities",
            description:
                "Rapid response teams deployed emergency shelter, food, and medical care to affected communities.",
            image:
                "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
        },
        {
            id: 3,
            category: "Environment",
            date: "February 15, 2024",
            title: "Protecting Forests and Natural Resources",
            description:
                "Communities work together to conserve biodiversity and strengthen sustainable resource management.",
            image:
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        },
        {
            id: 4,
            category: "Education",
            date: "January 30, 2024",
            title: "Supporting Education for Rural Children",
            description:
                "Improving access to quality education and creating opportunities for lifelong learning.",
            image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
        },
        {
            id: 5,
            category: "Health",
            date: "January 25, 2024",
            title: "Community Health Awareness Program",
            description:
                "Promoting health, sanitation, and healthy lifestyles through community engagement.",
            image:
                "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800",
        },
        {
            id: 6,
            category: "Community Development",
            date: "January 10, 2024",
            title: "Strengthening Local Communities",
            description:
                "Building leadership, participation, and sustainable livelihoods across Cambodia.",
            image:
                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
        },
    ];

    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <section className="py-10 md:py-16 lg:py-16 bg-slate-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">

                    <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                        Stories From The Community
                    </span>

                    <h2 className="mt-5 text-xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                        Our Latest Impact
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-slate-600">
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
                                    src={post.image}
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
                                    📅 {post.date}
                                </p>

                                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3 line-clamp-1">
                                    {post.title}
                                </h3>

                                <p className="text-slate-600 text-sm md:text-base leading-7 line-clamp-3">
                                    {post.description}
                                </p>

                                <button
                                    onClick={() => setSelectedPost(post)}
                                    className="
                                        inline-flex
                                        items-center
                                        mt-5
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
                <div className="text-center mt-12">
                    <Link
                        to="/news"
                        className="
                            inline-flex
                            items-center
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
                        className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedPost.image}
                            alt={selectedPost.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />

                        <div className="p-6 md:p-8">

                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                                {selectedPost.category}
                            </span>

                            <p className="mt-3 text-sm text-slate-500">
                                📅 {selectedPost.date}
                            </p>

                            <h2 className="mt-4 text-lg md:text-2xl font-bold text-slate-900">
                                {selectedPost.title}
                            </h2>

                            <p className="mt-6 text-slate-600 leading-8">
                                {selectedPost.description}
                            </p>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedPost(null)}
                                    className="
                                    mt-8
                                    px-6 py-2
                                    rounded-xl
                                    bg-orange-300
                                    text-white
                                    font-semibold
                                    hover:bg-orange-500
                                "
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