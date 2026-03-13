"use client";
import { useEffect } from "react";
import HeadingComps from "@/componant/HeadingComps/HeadingComps";
import Cart from "@/componant/Cart/Cart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useProductStore } from "@/store/useProductStore";
// Import Framer Motion
import { motion, Variants } from "framer-motion";

interface BestSellerProps {
  user: number | undefined;
  initialData: any;
}

// Define Scroll Animation Variants
const scrollUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60 
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

export const BestsellerSection = ({ user, initialData }: BestSellerProps) => {
  const loadProduct = useProductStore((state) => state.fetchBestsellers);
  const products = useProductStore((state) => state.bestsellerProducts);
  const clear = useProductStore((state) => state.clearAllCaches);

  useEffect(() => {
    // Initialize data from server-side props
    if (initialData) {
      loadProduct(initialData.products, initialData.ProductsCount, 1);
    }

    // Background stock synchronization
    const refreshStock = async () => {
      try {
        const productIds = initialData.products.map((p: any) => p.id).join(',');
        const response = await fetch(`/api/products/stock-check?ids=${productIds}`);
        const stockMap = await response.json();

        // Update zustand store with fresh stock data
        useProductStore.getState().updateStockOnly(stockMap);
      } catch (error) {
        console.error("Failed to sync stock:", error);
      }
    };

    refreshStock();

    // Cleanup store on unmount
    return () => {
      clear();
    };
  }, [initialData, loadProduct, clear]);

  return (
    <motion.div
      // Motion properties for scroll-triggered animation
      variants={scrollUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className='container flex flex-col justify-center mx-auto relative text-center mt-4 rounded-xl md:rounded-2xl p-6! gap-10 overflow-hidden'
      style={{
        backgroundColor: "#fff",
        marginTop: '15px',
        background: 'radial-gradient(circle, rgba(255,188,188,1) 25%, rgba(250,182,182,1) 47%, rgba(119,16,17,0.8) 100%)'
      }}
    >
      <HeadingComps hValue={"BestSeller"} path={"/BestSeller?pageNumber=1"} />

      <div className='h-fit'>
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
          {(products || []).map((item) => (
            <SwiperSlide key={item.id}>
              {/* Product Cart Animation can be added inside the Cart component if needed */}
              <Cart item={item} user={user} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
};