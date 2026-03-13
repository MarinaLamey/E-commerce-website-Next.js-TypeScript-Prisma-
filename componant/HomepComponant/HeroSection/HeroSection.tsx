"use client";
import Image from "next/image";
import "./herosection.css";
import Button from "@/componant/Button/Button";
import { motion , Variants} from "framer-motion";

const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3,  
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const imageVariants : Variants= {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 70, 
        damping: 15, 
        duration: 1 
      },
    },
  };

  const features = [
    { stats: "100%", title: "HAPPY", subTitle: "CUSTOMERS" },
    { stats: "3000+", title: "FAST", subTitle: "DELIVERY" },
    { stats: "100%", title: "SECURE", subTitle: "PAYMENT" },
    { stats: "100+", title: "PROBLEM", subTitle: "SOLVING" },
  ];

  return (
    <motion.div 
      className="relative w-full min-h-screen overflow-hidden bgColor py-10 md:py-0 flex items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container z-40 mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-4">
        
        <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <motion.div variants={textVariants} className="flex flex-row justify-center lg:justify-start items-center navbarlogo font-medium">
            <span className="text-white drop-shadow-logodrop text-4xl md:text-6xl contents">N-</span>
            <h2 className="navbarlogo text-3xl md:text-5xl font-medium">NegmCartilla</h2>
          </motion.div>

          <motion.p variants={textVariants} className="navbarlogo w-full text-2xl md:text-4xl lg:text-5xl mt-5 font-medium">
            All You Need In One Place
          </motion.p>

          <motion.p variants={textVariants} className="w-full md:w-[80%] lg:w-full leading-[1.6] text-base md:text-lg font-normal text-gray-400 mt-5">
            Your ultimate online shopping destination, offering a diverse range of products tailored to your lifestyle and needs.
          </motion.p>

          <motion.div variants={textVariants} className="pt-8 md:pt-12">
            <Button buttonValue={"Shop Now"} to={`/categories?pageNumber=1`} />
          </motion.div>
        </div>

        <div className="w-full lg:w-[50%] flex flex-col items-center justify-center order-1 lg:order-2 gap-8">
          
          <motion.div variants={imageVariants} className="w-full flex items-center justify-center">
            <Image 
              src="/imgs/7704466.png" 
              width={700} 
              height={700} 
              className='object-cover drop-shadow-2xl' 
              alt="image" 
              priority 
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 w-full"
            variants={containerVariants} 
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={textVariants} 
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center transition-colors cursor-default"
              >
                <span className="block font-['Oswald'] text-base md:text-lg font-bold text-[#771011] mb-1">
                  {item.stats}
                </span>
                <h3 className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider leading-tight">
                  {item.title} <br /> {item.subTitle}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default HeroSection;