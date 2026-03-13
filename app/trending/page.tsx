"use client";
import { useTrendingProducts } from "@/hooks/useAllproductsView";
import Image from "next/image";
import Link from "next/link";
import { Flame, Eye } from "lucide-react";
import { Product } from "../generated/prisma";
import { TrendingProduct } from "@/utils/dtos";
export default function TrendingPage() {
  const { data: trendingItems, isLoading: isTrendingLoading } = useTrendingProducts();

  if (isTrendingLoading) {
    return <div className="p-20 text-center font-bold animate-pulse">Loading Trending Products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="flex items-center gap-3 mb-12">
        <div className="bg-orange-100 p-3 rounded-2xl">
          <Flame className="text-orange-600" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black uppercase font-['Oswald']">Trending Now</h1>
          <p className="text-gray-500">The most viewed products across the store</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {trendingItems?.map((product:TrendingProduct , index : number) => (
          <Link 
            key={product.id} 
            href={`/Product/${product.id}`}
            className="group bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-100 border border-gray-50 hover:-translate-y-2 transition-all duration-300 relative"
          >
            <div className="absolute -top-3 -left-3 bg-[#771011] text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-lg z-10 border-4 border-white">
              #{index + 1}
            </div>

            <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-gray-50">
              <Image
                src={product.imgSrc || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
              {product.name}
            </h3>

            <div className="flex justify-between items-center">
              <span className="text-[#771011] font-bold text-lg">${product.price}</span>
              <div className="flex items-center gap-1 text-gray-400 text-sm bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                <Eye size={14} />
                <span>{product.views}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {(!trendingItems || trendingItems.length === 0) && (
        <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
          <p className="text-gray-400">No trending products found at the moment.</p>
        </div>
      )}
    </div>
  );
}