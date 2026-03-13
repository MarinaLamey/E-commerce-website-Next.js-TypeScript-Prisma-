"use client";

import { motion, AnimatePresence , Variants } from "framer-motion";
import { CATEGORY_PER_PAGE } from "@/utils/constants";
import CategoryItem from "../category/CategoryItem";
import Pagination from "../pagination/Pagination";
import { memo } from "react";
import { CategoryListType } from "@/type/categoryTyping";

const rightToLeftVariants : Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 // ـ
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0, //  
    transition: {
      delay: i * 0.1, // Stagger effect
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // Cubic-bezier
    },
  }),
};

export const CategoriesList = memo(({ pageNumber  , data }: CategoryListType) => {
  
  const pages = Math.ceil( data?.categoriesCount || 0 / CATEGORY_PER_PAGE);

  return (
    <div className='w-full flex flex-col items-center justify-between gap-3'>
      {/* Container الـ Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <AnimatePresence mode="popLayout"> 
          {data.categories.map((item, index) => (
            <motion.div
              key={`${pageNumber}-${item.id}`}
              variants={rightToLeftVariants}
              initial="hidden"
              animate="visible"
              custom={index} 
            >
              <CategoryItem img={item.imgSrc} name={item.name} id={item.id} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Pagination pageN={Number(pageNumber)} route="/categories" pages={pages} />
    </div>
  );
});