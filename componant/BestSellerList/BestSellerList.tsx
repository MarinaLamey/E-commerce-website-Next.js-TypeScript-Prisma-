"use client";
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import Cart from "@/componant/Cart/Cart";
import { memo } from "react";
import LottieHandler from '../feedback/LottieHandler'
import { useProductStore } from "@/store/useProductStore"
import Pagination from "../pagination/Pagination";
import { motion, AnimatePresence, Variants } from "framer-motion";
interface BestSelletProps {
    pageNumber: number | undefined;
    userId: number | undefined;
}

const cardVariants: Variants ={
    hidden: { 
        opacity: 0, 
        y: 30,
        scale: 0.95  
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.04, 
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1], 
        },
    }),
};

export const BestSellerList = memo(({ pageNumber, userId }: BestSelletProps) => {
    const product = useProductStore((state) => state.bestsellerProducts);
    const count = useProductStore((state) => state.bestsellerCount);
    const pages = Math.ceil(count / PRODUCT_PER_PAGE);

    return (
      
        <div className='w-full lg:w-3/4 mx-auto gap-4 p-3 md:p-6 rounded-2xl shadow-sm' 
             style={{ minHeight: '600px', backgroundColor: '#fff' }}>
         
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10'>
                <AnimatePresence mode="wait">
                    {product.length > 0 ? (
                        product.map((item, index) => (
                            <motion.div
                                key={`${pageNumber}-${item.id}`}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                                className="w-full"
                            >
                                <Cart item={item} user={userId} />
                            </motion.div>
                        ))
                    ) : null}
                </AnimatePresence>
            </div>

            <div className="mt-16 mb-8 flex justify-center">
                <Pagination 
                    pageN={Number(pageNumber)} 
                    pages={pages} 
                    route="/BestSeller" 
                />
            </div>
            
            {product.length === 0 && (
                <div className="w-full flex flex-col justify-center items-center py-20">
                    <LottieHandler type={'Empty'} message={`Stay tuned! Best sellers are coming soon.`} />
                </div>
            )}
        </div>
    );
});