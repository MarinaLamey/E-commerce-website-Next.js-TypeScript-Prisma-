"use client";
import React, { useState } from 'react';
import { PackagePlus, ImageIcon, Tag, Hash, FileText, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAdminProductStore } from '@/store/useAdminProductStore';

interface Category { id: number; name: string; }

export default function ProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const addToProduct = useAdminProductStore((state) => state.addProduct);

  const [formData, setFormData] = useState({
    name: "", description: "", price: 0, stock:0 , 
    imgSrc: "", categoryId: 0, isOffer: false, isBestseller: false
  });
console.log(formData)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addToProduct(formData)
    console.log("Submitting:", formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem]">
          <h2 className="font-['Oswald'] text-xl mb-6 flex items-center gap-2 uppercase">
            <FileText className="text-[#771011]" size={20} /> Product Details
          </h2>
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Product Name</label>
              <input 
                required
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                type="text" className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#771011] outline-none" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Description</label>
              <textarea 
                rows={5}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#771011] outline-none resize-none" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] grid grid-cols-2 gap-6">
           <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Price (EGP)</label>
              <input type="number" step="0.01" onChange={(e) => setFormData({...formData, price:Number(e.target.value) })} className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#771011]" />
           </div>
           <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Stock</label>
              <input type="number" onChange={(e) => setFormData({...formData, stock:Number( e.target.value)})} className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#771011]" />
           </div>
        </div>
      </div>

      {/* القسم الأيمن: الإعدادات والصورة */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem]">
          <h2 className="font-['Oswald'] text-xl mb-6 flex items-center gap-2 uppercase justify-center">
            <ImageIcon className="text-[#771011]" size={20} /> Media
          </h2>
          <input 
            type="text" 
            placeholder="Image URL"
            onChange={(e) => setFormData({...formData, imgSrc: e.target.value})}
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-xs outline-none focus:border-[#771011]"
          />
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] space-y-6">
          <select 
            required
            onChange={(e) => setFormData({...formData, categoryId: Number(e.target.value) })}
            className="w-full bg-[#0a0a0a] border border-white/10 p-4 rounded-2xl outline-none focus:border-[#771011]"
          >
            <option value="">Select Category</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>

          <div className="space-y-4 pt-4 border-t border-white/5">
             <Checkbox label="On Offer" checked={formData.isOffer} onChange={(val :boolean) => setFormData({...formData, isOffer: val})} />
             <Checkbox label="Bestseller" checked={formData.isBestseller} onChange={(val : boolean) => setFormData({...formData, isBestseller: val})} />
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-[#771011] disabled:bg-gray-700 hover:bg-white hover:text-black text-white font-['Oswald'] py-5 rounded-2xl text-xl font-bold transition-all"
        >
          {loading ? "PUBLISHING..." : "PUBLISH PRODUCT"}
        </button>
      </div>
    </form>
  );
}

const Checkbox = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="hidden peer" />
    <div className="w-6 h-6 border-2 border-white/10 rounded-lg peer-checked:bg-[#771011] peer-checked:border-[#771011] transition-all flex items-center justify-center">
      <CheckCircle2 size={14} className="text-white opacity-0 peer-checked:opacity-100" />
    </div>
    <span className="text-sm font-['Oswald'] uppercase tracking-widest group-hover:text-[#771011]">{label}</span>
  </label>
);