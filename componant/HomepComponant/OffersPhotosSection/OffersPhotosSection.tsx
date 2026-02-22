"use client";

import { motion , Variants } from "framer-motion";
import "./offersPhotosSection.css";
import Image from "next/image";
import { Offers } from "@/utils/constants";
import Link from "next/link";

const rightToLeftVariants:Variants = {
  hidden: { 
    opacity: 0, 
    x: 50, //
    filter: "blur(4px)" 
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], 
    },
  }),
};

export const OffersPhotosSection = () => {
  return (
    <div className="container mx-auto relative w-full mb-10 p-4 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Offers.map((item, itemIndex) => (
          <motion.div
            key={ itemIndex} 
            variants={rightToLeftVariants}
            initial="hidden"
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }}  
            custom={itemIndex}    
            className="relative group" // 
          >
            <Link href={item.to} className="block w-full h-[300px] md:h-[350px]">
              <div className="relative w-full h-full rounded-2xl border-2 border-white/20 overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                
                <Image 
                  src={item.imgSrc}
                  alt="offersImage"
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};