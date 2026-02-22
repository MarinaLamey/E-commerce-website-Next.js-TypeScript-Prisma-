"use client"
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
import { memo } from "react";

const CategoriesSection = () => {
  const  allCategories = useCategoriesStore((state) => state.allCategories);

  return (
    
    <div className="container mx-auto relative mt-9  flex flex-col gap-10 p-3! overflow-hidden">
      <HeadingComps hValue={"Categories"} path={"/categories?pageNumber=1"} />
      <div className="w-full  relative  overflow-hidden h-[400px] ">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={5}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 }, // Tablet
            1024: { slidesPerView: 4}, // Desktop
            
          }}
        >
          {allCategories.map((cat) => (
            <SwiperSlide
              key={cat.id}
              className=" flex flex-col items-center justify-bettwen h-full p-4 "
            >
              <Link href={`/categories/${cat.id}`}>
              <div className="relative mx-auto  rounded-full  flex items-center justify-center bg-neutral-200 w-62.5 h-62.5"> 
                <div className=" relative w-50 h-50 ">
                  <Image
                    src={cat.imgSrc}
                    fill
                    className="catshadow rounded-full object-cover   "
                    alt="category"
                    priority={cat.id < 3}
                    />
                </div>
                </div>
                <div className=" h-1/5 flex items-center justify-center p-8 ">
                  <h4 className="text-xl  md:text-2xl font-bold">{cat.name}</h4>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper> 
      </div>
    </div>
  );
};

export default  CategoriesSection;
