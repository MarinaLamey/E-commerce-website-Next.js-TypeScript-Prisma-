"use client";
import { motion, AnimatePresence, Variants } from "framer-motion"; 
import Cart from "../Cart/Cart"
import { useCategoriesStore } from "@/store/useCategoriesStore"
import LottieHandler from '../feedback/LottieHandler'
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import { memo } from "react";
import Pagination from "../pagination/Pagination";

interface ProductListProps {
  id: number;
  userId: number | undefined;
  pageNumber: number | undefined;
}

const cardVariants : Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export const ProductList = memo(({ id, userId, pageNumber }: ProductListProps) => {
  const categoryProducts = useCategoriesStore((state) => state.categoryProducts);
  const categoryProductsCount = useCategoriesStore((state) => state.categoryProductCount);
  const pages = Math.ceil(categoryProductsCount / PRODUCT_PER_PAGE);

  return (
    <div className='w-full lg:flex-1 min-h-[600px] bg-white  rounded-2xl shadow-sm' >
      
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10'>
        <AnimatePresence mode="wait">
          {categoryProducts.length > 0 ? (
            categoryProducts.map((product, index) => (
              <motion.div
                key={`${id}-${product.id}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <Cart item={product} user={userId} />
              </motion.div>
            ))
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-16 mb-10 flex justify-center">
        <Pagination pageN={Number(pageNumber)} route={`/categories/${id}`} pages={pages} />
      </div>
      
      {categoryProducts.length < 1 && (
        <div className="w-full flex justify-center items-center py-20">
           <LottieHandler type={'Empty'} message={`No products found in this category`} />
        </div>
      )}
    </div>
  );
});