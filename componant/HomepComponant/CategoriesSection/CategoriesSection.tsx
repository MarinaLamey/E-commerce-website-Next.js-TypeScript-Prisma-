"use client";
import Link from "next/link";
import HeadingComps from "@/componant/HeadingComps/HeadingComps";
import "./categories.css";
import { useCategoriesStore } from "@/store/useCategoriesStore";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { motion, Variants } from "framer-motion"; 

const CategoriesSection = () => {
  const allCategories = useCategoriesStore((state) => state.allCategories);

  const scrollVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <motion.div 
      className="container mx-auto relative mt-9 flex flex-col gap-10 p-3! overflow-hidden"
      variants={scrollVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} 
    >
      <HeadingComps hValue={"Categories"} path={"/categories?pageNumber=1"} />
      
      <div className="w-full relative overflow-hidden h-[400px]">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={5}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 4 },
          }}
        >
          {allCategories.map((cat) => (
            <SwiperSlide
              key={cat.id}
              className="flex flex-col items-center justify-between h-full p-4"
            >
              <Link href={`/categories/${cat.id}`}>
                <div className="relative mx-auto rounded-full flex items-center justify-center bg-neutral-200 w-62.5 h-62.5"> 
                  <div className="relative w-50 h-50">
                    <Image
                      src={cat.imgSrc}
                      fill
                      className="catshadow rounded-full object-cover"
                      alt="category"
                      priority={cat.id < 3}
                    />
                  </div>
                </div>
                <div className="h-1/5 flex items-center justify-center p-8">
                  <h4 className="text-xl md:text-2xl font-bold">{cat.name}</h4>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper> 
      </div>
    </motion.div>
  );
};

export default CategoriesSection;