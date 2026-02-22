"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrderStore } from '@/store/useOrdersStore';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const { createOrder, loading } = useOrderStore();
 const clear = useCartStore((state) => state.clearAllCaches);

  const [formData, setFormData] = useState({
    City: 'Cairo',
    Adress: '',
    Phone: ''
  });
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Adress || !formData.Phone) {
      return toast.error("Please fill all fields!");
    }

    const success = await createOrder(formData);
    
    if (success) {
      toast.success("Order Placed Successfully!");
      
      
      useCartStore.getState().clearAllCaches() 
      clear()
      onClose();
      
      router.replace("/profile/orders?pageNumber=1");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#771011]/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#771011] p-8 text-white">
              <h2 className="font-['Oswald'] text-3xl font-bold uppercase tracking-tighter">
                Confirm <span className="text-[#e6683c]">Legacy</span> Order
              </h2>
              <p className="text-white/70 text-sm mt-1">Finalize your purchase details below.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* City Selection */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#771011] uppercase tracking-widest">Select City</label>
                <select 
                  value={formData.City}
                  onChange={(e) => setFormData({...formData, City: e.target.value})}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#e6683c] focus:bg-white outline-none transition-all font-bold text-gray-700 appearance-none"
                >
                  <option value="Cairo">Cairo (40 EGP Shipping)</option>
                  <option value="Giza">Giza (60 EGP Shipping)</option>
                  <option value="Alex">Alexandria (60 EGP Shipping)</option>
                  <option value="Other">Other Cities (100 EGP Shipping)</option>
                </select>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#771011] uppercase tracking-widest">Delivery Address</label>
                <input 
                  type="text"
                  required
                  placeholder="Street name, Building, Apartment..."
                  value={formData.Adress}
                  onChange={(e) => setFormData({...formData, Adress: e.target.value})}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#771011] focus:bg-white outline-none transition-all font-medium"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#771011] uppercase tracking-widest">Phone Number</label>
                <input 
                  type="tel"
                  required
                  placeholder="01xxxxxxxxx"
                  value={formData.Phone}
                  onChange={(e) => setFormData({...formData, Phone: e.target.value})}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#771011] focus:bg-white outline-none transition-all font-medium"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#771011] hover:bg-[#e6683c] text-white font-['Oswald'] py-5 rounded-2xl text-xl transition-all shadow-xl shadow-[#771011]/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <span className="animate-pulse">PROCESSING...</span>
                ) : (
                  "CONFIRM & PURCHASE"
                )}
              </button>
              
              <button 
                type="button"
                onClick={onClose}
                className="w-full text-gray-400 text-xs font-bold uppercase hover:text-[#771011] transition-colors"
              >
                Go back to cart
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}