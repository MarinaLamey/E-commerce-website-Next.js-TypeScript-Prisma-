"use client"
import { Product } from "@/app/generated/prisma";
import HeadingComps from "@/componant/HeadingComps/HeadingComps";
import Cart from "@/componant/Cart/Cart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
interface OffersClientSection{
    title:string;
    user:number;
    categoryId:number;
    initialData:Product[];
}
export  const OffersClient = ({title , user , categoryId , initialData} : OffersClientSection) => {

  return (
    <>
    <HeadingComps hValue={title}  path={`/Offers?category=${categoryId}&pageNumber=1`} />
       
       <div className=' h-fit  '  >
         
       
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
         
              {(initialData || []).map((item:Product) => (
                      <SwiperSlide key={item.id}>
                      <Cart item={item} user={user} />
                      </SwiperSlide> 
                        ))}
             </Swiper>
           
       
         
         </div>
         </>
  )
}
