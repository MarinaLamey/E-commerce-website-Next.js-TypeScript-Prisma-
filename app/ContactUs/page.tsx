"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import "./contactus.css";
import { Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  // Parent container variants to control children stagger
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
        delayChildren: 0.1,
      },
    },
  };

  // Individual item variants (slide up effect)
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Background image subtle fade-in
  const bgVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.12, transition: { duration: 1.5 } }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#eb7d7f] bgColor overflow-hidden">
      
      {/* Background Image - Desktop Only */}
      <motion.div 
        variants={bgVariants}
        initial="hidden"
        animate="visible"
        className="fixed inset-0 z-0 pointer-events-none hidden lg:block"
      >
        <Image 
          src="/imgs/contactUs.png" 
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div 
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header Section */}
        <section className="pt-20 pb-12 text-center px-4">
          <motion.h1 variants={itemVariants} className="font-['Oswald'] text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-black">
            Get In <span className="text-[#771011]">Touch</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="font-['Roboto'] text-gray-500 max-w-2xl mx-auto text-lg">
            Have a complaint or feedback? Our team is here to ensure your Legacy experience remains flawless.
          </motion.p>
        </section>

        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards - Staggered */}
            <div className="lg:col-span-1 space-y-4">
              {[
                { icon: Mail, title: "Email Us", lines: ["support@legacy-brand.com", "complaints@legacy-brand.com"] },
                { icon: MapPin, title: "Visit Office", lines: ["123 Design District, Cairo, Egypt"] },
                { icon: Clock, title: "Working Hours", lines: ["Sun - Thu: 9 AM - 6 PM"], highlight: "Response within 24 hours" }
              ].map((card, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5, borderColor: "rgba(119, 16, 17, 0.5)" }}
                  className="p-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#771011] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <card.icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-['Oswald'] text-xl uppercase tracking-widest mb-2 text-black">{card.title}</h3>
                  {card.lines.map((line, i) => <p key={i} className="font-['Roboto'] text-gray-400 text-sm">{line}</p>)}
                  {card.highlight && <p className="font-['Roboto'] text-red-500 text-xs mt-2 uppercase font-bold italic underline">{card.highlight}</p>}
                </motion.div>
              ))}
            </div>

            {/* The Complaint Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="p-8 md:p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#771011]/20 blur-[100px] rounded-full" />
                
                <form className="relative z-10 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants} className="flex flex-col gap-2">
                      <label className="font-['Oswald'] text-xs uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name</label>
                      <input type="text" placeholder="Enter your name" className="bg-white/20 border border-white/30 p-4 rounded-2xl focus:border-[#771011] outline-none transition-all text-black placeholder:text-gray-700" />
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex flex-col gap-2">
                      <label className="font-['Oswald'] text-xs uppercase tracking-[0.2em] text-gray-500 ml-1">Order Number</label>
                      <input type="text" placeholder="#LGC-0000" className="bg-white/20 border border-white/30 text-black p-4 rounded-2xl focus:border-[#771011] outline-none transition-all placeholder:text-gray-700" />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-2">
                    <label className="font-['Oswald'] text-xs uppercase tracking-[0.2em] text-gray-500 ml-1">Subject</label>
                    <select className="bg-white/20 border border-white/30 p-4 rounded-2xl focus:border-[#771011] outline-none text-black appearance-none cursor-pointer">
                      <option className="bg-[#fff]">General Inquiry</option>
                      <option className="bg-[#fff]">Product Complaint</option>
                      <option className="bg-[#fff]">Delivery Issue</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-2">
                    <label className="font-['Oswald'] text-xs uppercase tracking-[0.2em] text-gray-500 ml-1">Message</label>
                    <textarea rows={6} placeholder="Describe your issue..." className="bg-white/20 border border-white/30 p-4 rounded-2xl focus:border-[#771011] outline-none text-black placeholder:text-gray-700 resize-none" />
                  </motion.div>

                  <motion.button 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#771011] hover:bg-white hover:text-black text-white font-['Oswald'] py-5 rounded-2xl text-xl font-bold transition-all duration-500 flex items-center justify-center gap-3 shadow-lg"
                  >
                    {loading ? "SENDING..." : <>SEND MESSAGE <Send size={20} /></>}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;