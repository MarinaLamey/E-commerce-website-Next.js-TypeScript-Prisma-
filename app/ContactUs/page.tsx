"use client";
import React, { useState } from 'react';
import "./contactus.css"
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'; // icons شيك

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen  text-white selection:bg-[#eb7d7f] bgColor">
      {/* Hero Section - Minimalist */}
      <section className="pt-20 pb-12 text-center px-4">
        <h1 className="font-['Oswald'] text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-black">
          Get In <span className="text-[#771011]">Touch</span>
        </h1>
        <p className="font-['Roboto'] text-gray-500 max-w-2xl mx-auto text-lg">
          Have a complaint or feedback? Our team is here to ensure your Legacy experience remains flawless.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] hover:border-[#771011]/50 transition-colors group">
              <div className="w-12 h-12 bg-[#771011] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="font-['Oswald'] text-xl uppercase tracking-widest mb-2 text-black">Email Us</h3>
              <p className="font-['Roboto'] text-gray-400 text-sm">support@legacy-brand.com</p>
              <p className="font-['Roboto'] text-gray-400 text-sm">complaints@legacy-brand.com</p>
            </div>

            <div className="p-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] hover:border-[#771011]/50 transition-colors group">
              <div className="w-12 h-12 bg-[#771011] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="text-white" size={24} />
              </div>
              <h3 className="font-['Oswald'] text-xl uppercase tracking-widest mb-2 text-black">Visit Office</h3>
              <p className="font-['Roboto'] text-gray-400 text-sm">123 Design District, Cairo, Egypt</p>
            </div>

            <div className="p-8 bg-white/30 backdrop-blur-xl border border-white/20 rounded-[2rem] hover:border-[#771011]/50 transition-colors group">
              <div className="w-12 h-12 bg-[#771011] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="font-['Oswald'] text-xl uppercase tracking-widest mb-2 text-black">Working Hours</h3>
              <p className="font-['Roboto'] text-gray-400 text-sm">Sun - Thu: 9 AM - 6 PM</p>
              <p className="font-['Roboto'] text-red-500 text-xs mt-2 uppercase font-bold tracking-tighter italic underline">Response within 24 hours</p>
            </div>
          </div>

          {/* 2. The Complaint Form - ـ Glass Form */}
          <div className="lg:col-span-2">
            <div className="p-8 md:p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              {/* Decorative Blur */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#771011]/20 blur-[100px] rounded-full" />
              
              <form className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-['Oswald'] text-xs uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name</label>
                    <input  
                      type="text" 
                      placeholder="Enter your name"
                      className="bg-white/20 border border-white/30 p-4 rounded-2xl focus:border-[#771011] outline-none transition-all font-['Roboto'] text-black placeholder:text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-['Oswald'] text-xs uppercase tracking-[0.2em] text-gray-500 ml-1">Order Number (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="#LGC-0000"
                      className="bg-white/20 border border-white/30  text-black  p-4 rounded-2xl focus:border-[#771011] outline-none transition-all font-['Roboto']  placeholder:text-gray-700"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-['Oswald'] text-xs uppercase tracking-[0.2em] text-gray-500 ml-1">Subject</label>
                  <select className="bg-white/20 border border-white/30 p-4 rounded-2xl focus:border-[#771011] outline-none transition-all font-['Roboto'] text-black appearance-none cursor-pointer">
                    <option className="bg-[#0a0a0a]">General Inquiry</option>
                    <option className="bg-[#0a0a0a]">Product Complaint</option>
                    <option className="bg-[#0a0a0a]">Delivery Issue</option>
                    <option className="bg-[#0a0a0a]">Payment Problem</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-['Oswald'] text-xs uppercase tracking-[0.2em] text-gray-500 ml-1">Message / Complaint</label>
                  <textarea 
                    rows={6}
                    placeholder="Describe your issue in detail..."
                    className="bg-white/20 border border-white/30 p-4 rounded-2xl focus:border-[#771011] outline-none transition-all font-['Roboto'] text-black placeholder:text-gray-700 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#771011] hover:bg-white hover:text-black text-white font-['Oswald'] py-5 rounded-2xl text-xl font-bold transition-all duration-500 flex items-center justify-center gap-3 group active:scale-95 shadow-lg shadow-[#771011]/20"
                >
                  {loading ? "SENDING..." : (
                    <>
                      SEND MESSAGE
                      <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;