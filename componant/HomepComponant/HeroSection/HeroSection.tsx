"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "@/componant/Button/Button";
import { heroSectionImgs } from "@/utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "./herosection.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion , Variants} from "framer-motion";

const HeroSection = () => {
  const [isReady, setIsReady] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 }, 
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    { stats: "100%", title: "HAPPY", subTitle: "CUSTOMERS" },
    { stats: "3000+", title: "FAST", subTitle: "DELIVERY" },
    { stats: "100%", title: "SECURE", subTitle: "PAYMENT" },
    { stats: "100+", title: "PROBLEM", subTitle: "SOLVING" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bgColor py-10 md:py-0 flex items-center">
      <div className="container z-50 mx-auto pt-10 md:pt-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-4">
        <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <div className="flex flex-row justify-center lg:justify-start items-center navbarlogo font-medium">
            <span className="text-white drop-shadow-logodrop text-4xl md:text-6xl contents">
              N-
            </span>
            <h2 className="navbarlogo text-3xl md:text-5xl font-medium">
              NegmCartilla
            </h2>
          </div>

          <p className="navbarlogo w-full text-2xl md:text-4xl lg:text-5xl mt-5 font-medium">
            All You Need In One Place
          </p>

          <p className="w-full md:w-[80%] lg:w-full leading-[1.6] text-base md:text-lg font-normal text-gray-400 mt-5">
            Your ultimate online shopping destination, offering a diverse range
            of products tailored to your lifestyle and needs.
          </p>

          <div className="pt-8 md:pt-12">
            <Button buttonValue={"Shop Now"} to={`/categories?pageNumber=1`} />
          </div>
        </div>

        <div className="w-full lg:w-[50%] flex flex-col items-center justify-center order-1 lg:order-2 gap-8">
          {/* Swiper Slider */}
          <div className="w-full">
            <Swiper
              watchSlidesProgress={true}
              spaceBetween={20}
              modules={[Autoplay, Pagination]}
              speed={2000}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1.2, centeredSlides: true }, 
                1024: { slidesPerView: 2, centeredSlides: false },
              }}
              onInit={() => setIsReady(true)}
              className={`transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
            >
              {heroSectionImgs.map((holder, index) => (
                <SwiperSlide key={index} className="p-2">
                  <div className="relative w-full aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden border border-white/10">
                    <Image
                      src={holder.imgSrc}
                      alt={holder.imgalt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <p className="absolute text-white bottom-6 left-6 font-bold text-lg md:text-xl z-10">
                      {holder.imgalt}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"   
              viewport={{ once: true, amount: 0.2 }} 
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:bg-white/10 transition-all cursor-default"
                >
                  <span className="block font-['Oswald'] text-base md:text-lg font-bold text-[#771011] mb-1">
                    {item.stats}
                  </span>
                  <h3 className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider leading-tight">
                    {item.title} <br /> {item.subTitle}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
