import ngoForumLogo from "../../assets/partner/logo.jpg";
import undpLogo from "../../assets/partner/UNDP.jpg";
import unicefLogo from "../../assets/partner/UNICEF.jpg";
import ministryLogo from "../../assets/partner/Ministry.jpg";

import bg from "../../assets/images/about/bg.jpg";
import setion from "../../assets/images/about/setion.jpg";
import image from "../../assets/images/about/image.jpg";
import icon1 from "../../assets/images/about/icon1.jpg";
import icon2 from "../../assets/images/about/icon2.jpg";
import icon3 from "../../assets/images/about/icon3.jpg";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const partners = [
    {
        name: "The NGO Forum on Cambodia",
        logo: ngoForumLogo,
    },
    {
        name: "UNDP",
        logo: undpLogo,
    },
    {
        name: "UNICEF",
        logo: unicefLogo,
    },
    {
        name: "Ministry of Health",
        logo: ministryLogo,
    },
    {
        name: "The NGO Forum on Cambodia",
        logo: ngoForumLogo,
    },
    {
        name: "UNDP",
        logo: undpLogo,
    },
    {
        name: "UNICEF",
        logo: unicefLogo,
    },
    {
        name: "Ministry of Health",
        logo: ministryLogo,
    },
];

export default function About() {

    const approach = [
        {
            title: "Vision & Purpose",
            description: "We strive for a society where the Cambodian people live with dignity in a healthy and sustainable environment."
        },
        {
            title: "Community-Led Mission",
            description: "We work in close partnership with grassroots communities, actively supporting and empowering their local plans and initiatives."
        },
        {
            title: "Integrity & Justice",
            description: "We operate with total transparency and accountability toward our board, partners, and donors while relentlessly fighting for social equality."
        },
        {
            title: "Environmental & Mutual Respect",
            description: "We value biodiversity, forests, and local cultures, fostering deep mutual respect for human rights and the natural world within our teams."
        }
    ];

    const history = [
        {
            year: "2007",
            image: setion,
            description: "EHE was officially established and registered as a local non-governmental organization with the Ministry of Interior on March 1, 2007. EHE quickly began working directly with local representatives heavily affected by land concessions and environmental degradation to defend their resource rights."
        },
        {
            year: "2012",
            image: icon1,
            description: "Deepened collaboration with grassroots groups to design and execute community advocacy strategies. EHE focused intensely on capacity-building to help affected communities organize, form networks, and systematically reclaim and protect local natural resources."
        },
        {
            year: "2017",
            image: icon2,
            description: "Broadened organizational scope to foster holistic community development. EHE stepped up efforts to support vulnerable households by promoting women's local leadership, community-led education, hygiene and health improvements, and stronger local grassroots governance."
        },
        {
            year: "2023",
            image: icon3,
            description: "Cemented key alliance building, expanding long-term engagement with the Prey Lang Community Network and other civil society groups. EHE continues to unify local and national networks to strengthen civil society voices and scale sustainable community development initiatives."
        }
    ];


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

            <style>{`
                .history-swiper .swiper-button-prev,
                .history-swiper .swiper-button-next {
                    width: 50px;
                    height: 50px;
                    background: #fb923c;
                    border-radius: 9999px;
                    color: white;
                    top: 105px; /* align with circle */
                    transform: translateY(0);
                }

                .history-swiper .swiper-button-prev {
                    left: 0px;
                }

                .history-swiper .swiper-button-next {
                    right: 0px;
                }

                .history-swiper .swiper-button-prev,
                .history-swiper .swiper-button-next {
                    top: 105px;
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
                            About EHE
                        </span>

                        <h1 className="mt-2 md:mt-6 text-xl md:text-5xl font-bold text-white leading-tight">
                            Environment and Health
                            <span className="block text-emerald-400">
                                Education Organization
                            </span>
                        </h1>

                        <p className="mt-3 md:mt-8 max-w-3xl text-sm md:text-xl text-gray-200 leading-8">
                            EHE has worked alongside communities across Cambodia to protect natural resources, strengthen local leadership, improve livelihoods, and promote health and education for sustainable development.
                        </p>



                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-12 ehe-sans bg-gray-50">
                <div className="max-w-full mx-auto px-4 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
                        <img
                            src={image}
                            alt="Community"
                            className="w-full h-[30vh] lg:h-[50vh] rounded-sm object-cover"
                        />

                        <div>
                            <span
                                className="uppercase text-sm tracking-[0.15em] font-semibold"
                                style={{ color: "#8B3A2B" }}
                            >
                                Who We Are
                            </span>

                            <h2
                                className="ehe-serif mt-4 text-xl md:text-3xl text-green-700 font-bold"
                            >
                                Rooted in the communities we serve
                            </h2>

                            <p className="mt-6 leading-6 text-[#3F4A44] text-justify">
                                Established in 2007, Environment and Health Education Organization (EHE)

                                is a Cambodian non-governmental organization dedicated to empowering

                                communities and promoting sustainable development.
                            </p>

                            <p className="mt-4 leading-6 text-[#3F4A44] text-justify">
                                EHE works closely with local communities, civil society networks,

                                and development partners to protect natural resources, strengthen

                                community participation, improve health and education, and support

                                equitable and sustainable livelihoods.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="py-8 md:py-16 relative overflow-hidden bg-[#e7ffed]">
                <div className="max-w-full mx-auto px-6">

                    <div className="text-center max-w-3xl mx-auto">
                        <span className="uppercase tracking-[0.2em] text-sm text-green-700 font-semibold">
                            Our Core Foundations
                        </span>

                        <h2 className="ehe-serif text-xl md:text-3xl mt-4 text-green-950 font-bold">
                            Vision, Mission & Values
                        </h2>

                        <p className="mt-6 leading-8 text-gray-600">
                            The strategic pillars and moral principles that guide EHE's daily operations, community engagements, and advocacy efforts across Cambodia.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 md:mt-16">
                        {approach.map((item, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-3xl p-8 border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-green-700 text-white flex items-center justify-center text-xl font-bold">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <div className="w-12 h-1 mt-6 rounded-full bg-green-700" />

                                    <h3 className="mt-6 text-[16px] md:text-xl font-semibold text-green-950">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 text-gray-600 leading-7 text-xs md:text-sm">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="absolute inset-0 rounded-3xl border-2 border-green-500 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-8 md:py-16 bg-slate-50 overflow-hidden">

                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16">

                    {/* Heading */}
                    <div className="text-center max-w-3xl mx-auto mb-16">

                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                            Our History
                        </span>

                        <h2 className="mt-6 text-xl md:text-3xl font-bold text-green-800">
                            Our Journey
                        </h2>

                        <p className="mt-4 text-slate-600 leading-8">
                            Over the years, EHE has grown alongside communities,
                            supporting environmental protection, education,
                            health awareness, and sustainable development.
                        </p>

                    </div>

                    <div className="relative">

                        {/* Global Timeline Line */}
                        <div className="hidden xl:block absolute top-[105px] left-0 right-0 border-t-4 border-dashed border-orange-400 z-0"></div>

                        <Swiper
                            modules={[Navigation, Autoplay]}
                            navigation
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            speed={800}
                            spaceBetween={30}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1200: {
                                    slidesPerView: 3,
                                },
                            }}
                            className="history-swiper"
                        >
                            {history.map((item, index) => (
                                <SwiperSlide key={index}>

                                    <div className="relative text-center pb-8">

                                        {/* Circle Image */}
                                        <div
                                            className="
                                            relative
                                            mx-auto
                                            w-52 h-52
                                            rounded-full
                                            overflow-hidden
                                            border-[5px]
                                            border-orange-400
                                            bg-white
                                            shadow-xl
                                            z-10
                                        "
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.year}
                                                className="
                                                w-full
                                                h-full
                                                object-cover
                                                transition-transform
                                                duration-700
                                                hover:scale-110
                                            "
                                            />
                                        </div>

                                        {/* Description */}
                                        <p
                                            className="
                                            mt-8
                                            text-slate-600
                                            leading-6
                                            max-w-sm
                                            mx-auto
                                            min-h-[110px]
                                        "
                                        >
                                            {item.description}
                                        </p>

                                        {/* Year */}
                                        <h3
                                            className="
                                            text-xl
                                            md:text-4xl
                                            font-extrabold
                                            text-slate-800
                                        "
                                        >
                                            {item.year}
                                        </h3>

                                        {/* Dot */}
                                        <div
                                            className="
                                            mt-6
                                            w-5
                                            h-5
                                            rounded-full
                                            bg-orange-400
                                            mx-auto
                                            shadow-lg
                                        "
                                        />

                                    </div>

                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>

                </div>

            </section>

            {/* Partners */}
            <section className="py-16 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-100 rounded-full blur-3xl opacity-50" />

                <div className="relative max-w-full mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold uppercase tracking-wider">
                            Collaboration
                        </span>

                        <h2 className="ehe-serif text-xl md:text-3xl mt-6 text-green-950">
                            Partners & Supporters
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Together with development partners, government agencies,
                            NGOs, and local communities, we create sustainable solutions
                            for health, education, and environmental protection.
                        </p>
                    </div>

                    {/* Partner Cards */}
                    <div className="relative overflow-hidden mt-8 md:mt-16">
                        <div className="flex animate-marquee gap-6 md:gap-10">
                            {[...partners, ...partners].map((partner, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 flex items-center justify-center"
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-12 md:h-20 object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}