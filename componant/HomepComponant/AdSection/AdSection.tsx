"use client";
import { motion , Variants } from "framer-motion";
import Link from "next/link";
import ad from "../../../public/imgs/adsection.jpg";
import Image from "next/image";

export const AdSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, x: -100 }, 
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <Link href={`/Offers?category=${1}`}>
      <motion.div 
        className='container relative mx-auto mt-10 mb-10 overflow-hidden cursor-pointer'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" //
        viewport={{ once: true, amount: 0.3 }} // 
      >
        <div className='relative flex flex-nowrap'>
          
          <motion.div 
            variants={itemVariants}
            className='relative overflow-hidden rounded-[0px] md:rounded-xl w-full'
          >
            <Image src={ad} alt="Ad Image" className="object-cover w-full h-auto" />
          </motion.div>

          <motion.h3 
            variants={itemVariants}
            className='absolute font-bold text-2xl md:text-3xl text-white left-0 top-0 p-8 drop-shadow-lg'
          >
            Up to 20% off on
            <span className='ml-1' style={{ color: 'black' }}> Electronics</span>
          </motion.h3>

          <motion.div 
            variants={itemVariants}
            className='absolute px-2 py-1 bg-neutral-300 right-0 bottom-0 rounded-md text-neutral-400'
          >
            Ad
          </motion.div>
          
        </div>
      </motion.div>
    </Link>
  );
};