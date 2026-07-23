import hero1 from "../../assets/images/home/bg.jpg";
import hero2 from "../../assets/images/about/bg.jpg";
import hero3 from "../../assets/images/project/bg.jpg";
import hero4 from "../../assets/images/contact.jpg";
import hero5 from "../../assets/images/program/bg.jpg";
import hero6 from "../../assets/images/about/icon1.jpg";
import hero7 from "../../assets/images/new.jpg";

import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import {
    Pagination,
    Autoplay,
    EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
    const navigate = useNavigate();

    const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7];

    return (
        <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            pagination={{ clickable: true }}
            autoplay={{
                delay: 6000,
                disableOnInteraction: false,
            }}
            loop={heroImages.length > 1}
            slidesPerView={1}
            speed={1200}
            className="h-[40vh] lg:h-[70vh]"
        >
            {heroImages.map((image, index) => (
                <SwiperSlide key={index}>
                    <section
                        className="relative h-[40vh] lg:h-[70vh] flex items-center bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/30 to-black/20" />
                    </section>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}