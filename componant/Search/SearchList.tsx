"use client";
import { motion, AnimatePresence , Variants } from "framer-motion"; 
import Cart from "../Cart/Cart";
import LottieHandler from '../feedback/LottieHandler';
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import { memo, useEffect, useState, useMemo } from "react";
import Pagination from "../pagination/Pagination";
import { SearchProps } from "@/apiCalls/searchCall";

interface SearchListProps {
  products: SearchProps;
  userId: number | undefined;
  pageNumber: number | undefined;
  searchText: string | undefined;
  sort: string | undefined;
}

const cardVariants:Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export const SearchLList = memo(({ userId, pageNumber, searchText, products, sort }: SearchListProps) => {
  const [displayProducts, setDisplayProducts] = useState(products.products);
  const [isSyncing, setIsSyncing] = useState(false);

  const ProductsCount = products.ProductCount;
  const pages = Math.ceil(ProductsCount / PRODUCT_PER_PAGE);

  useEffect(() => {
    setDisplayProducts(products.products);
  }, [products.products]);

  useEffect(() => {
    const refreshStock = async () => {
      if (!products.products.length) return;

      try {
        setIsSyncing(true);
//To fetch alpi once not more
        const productIds = products.products.map((p: any) => p.id).join(',');
        
        const response = await fetch(`/api/products/stock-check?ids=${productIds}`);
        if (!response.ok) throw new Error("Stock fetch failed");
        
        const stockMap = await response.json(); 
        // expected: { "1": 10, "2": 0, "3": 5 }

        // update only ids sended
        setDisplayProducts((prev) =>
          prev.map((product) => ({
            ...product,
            stock: stockMap[product.id] !== undefined ? stockMap[product.id] : product.stock
          }))
        );
      } catch (error) {
        console.error("Professional Error: Failed to sync stock with server", error);
      } finally {
        setIsSyncing(false);
      }
    };

    refreshStock();
  }, [products.products]); // will change when the main product (not stock updated ) changed

  return (
    <div className='w-full md:w-3/4 gap-2 p-2 rounded-lg shadowColor' style={{ minHeight: '600px', backgroundColor: '#fff' }}>
      
      {/* Grid*/}
      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        <AnimatePresence mode="popLayout">
          {displayProducts.length > 0 ? (
            displayProducts.map((product, index) => (
              <motion.div
                key={product.id} 
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                layout 
                custom={index}
              >
                <Cart item={product} user={userId} />
                {isSyncing && (
                  <span className="text-[10px] text-gray-400 absolute top-2 right-2 animate-pulse">
                    Syncing...
                  </span>
                )}
              </motion.div>
            ))
          ) : null}
        </AnimatePresence>

        {displayProducts.length < 1 && (
          <div className="col-span-full">
            <LottieHandler type={'Empty'} message={`There are no products`} />
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-10">
        <Pagination 
          pageN={Number(pageNumber)} 
          route={`/search?q=${searchText || ''}&sort=${sort || ''}`} 
          pages={pages} 
        />
      </div>
    </div>
  );
});

SearchLList.displayName = "SearchLList"; //  helping with depugging memo