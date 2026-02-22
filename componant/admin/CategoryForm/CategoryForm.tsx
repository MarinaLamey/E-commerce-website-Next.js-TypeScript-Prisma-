"use client";
import React, { useState } from 'react';
import { Tag, Loader2, PlusCircle, ImageIcon } from 'lucide-react';
import { useCategoryForm } from '@/hooks/admin/useCategoryForm';
import { useRouter } from 'next/navigation';
import { useAdminCategoryStore } from '@/store/useAdminCategoryStore';
export default function CategoryForm() {
const {addCategory , handleSubmit , loading , formData, setFormData } = useCategoryForm()

  return (
    <div className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] text-[#771011] font-black ml-1">
            Category Name
          </label>
          <div className="relative group">
            <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#771011] transition-colors" size={20} />
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. WINTER COLLECTION"
              className="w-full bg-[#0d0d0d] border border-white/5 p-5 pl-14 rounded-2xl outline-none focus:border-[#771011]/50 transition-all font-['Oswald'] text-lg uppercase"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] text-[#771011] font-black ml-1">
            Category Cover Image (URL)
          </label>
          <div className="relative group">
            <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#771011] transition-colors" size={20} />
            <input 
              required
              type="text" 
              value={formData.imgSrc}
              onChange={(e) => setFormData({...formData, imgSrc: e.target.value})}
              placeholder="https://image-link.com/photo.jpg"
              className="w-full bg-[#0d0d0d] border border-white/5 p-5 pl-14 rounded-2xl outline-none focus:border-[#771011]/50 transition-all font-['Roboto'] text-sm"
            />
          </div>
        </div>

        <button 
          disabled={loading || !formData.name || !formData.imgSrc}
          type="submit"
          className="w-full bg-[#771011] hover:bg-white hover:text-black text-white font-['Oswald'] py-5 rounded-2xl text-xl font-bold transition-all duration-500 shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><PlusCircle size={24} /> CREATE CATEGORY</>}
        </button>
      </form>
    </div>
  );
}