"use client";

import { motion, AnimatePresence , Variants} from "framer-motion";
import Cart from "../Cart/Cart";
import LottieHandler from '../feedback/LottieHandler'
import { memo, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import { useProductStore } from "@/store/useProductStore";

interface OffersProps {
    userId: number | undefined;
    route: string;
    pageNumber: number;
}

const offerVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 20 
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1],
        },
    }),
};

export const OffersList =({ userId, pageNumber, route }: OffersProps) => {
    const myProducts = useProductStore((state) => state.offersProducts);
    const clear = useProductStore((state) => state.clearAllCaches);
    const count = useProductStore((state) => state.offerCount);
    const pages = Math.ceil(count / PRODUCT_PER_PAGE);
    

    return (
    
        <div className='w-full lg:w-3/4 mx-auto min-h-[600px] p-3 md:p-6 rounded-2xl shadow-sm bg-white'>
           
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12'>
                <AnimatePresence mode="wait">
                    {myProducts.length > 0 ? (
                        myProducts.map((product, index) => (
                            <motion.div
                                key={`${pageNumber}-${product.id}`}
                                variants={offerVariants}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                                className="w-full"
                            >
                                <Cart item={product} user={userId} />
                            </motion.div>
                        ))
                    ) : null}
                </AnimatePresence>
            </div>

            {/* Pagination Section */}
            <div className="mt-16 mb-6 flex justify-center">
                <Pagination 
                    pageN={Number(pageNumber)} 
                    pages={pages} 
                    route={route} 
                />
            </div>

            {/* Empty State Section */}
            {myProducts.length === 0 && (
                <div className="w-full py-20 flex flex-col items-center justify-center">
                    <LottieHandler 
                        type={'Empty'} 
                        message={`Currently, there are no active offers. Check back soon!`} 
                    />
                </div>
            )}
        </div>
    );
};