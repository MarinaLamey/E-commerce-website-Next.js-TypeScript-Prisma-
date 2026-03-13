"use client";
import { motion, Variants } from "framer-motion";

const scrollUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

export default function MotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={scrollUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}