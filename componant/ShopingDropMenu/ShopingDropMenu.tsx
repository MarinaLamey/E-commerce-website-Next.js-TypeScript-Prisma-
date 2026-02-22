"use client";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { useProductStore } from "@/store/useProductStore";
import { useCategoriesStore } from "@/store/useCategoriesStore";
import { Product } from "@/app/generated/prisma";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
interface ShopDropMenu {
  productList :Product[];
  currentPageKey:string;
}
export default function ShopDropMenu({productList , currentPageKey}:ShopDropMenu) {
 const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const sortProduct = useProductStore((state) => state.sortProduct);
  const sortCategoryProduct = useCategoriesStore((state) => state.sortCategoryProduct)
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  //
  
  //
  const sortFromLowTohight = async(type : string) => {
    const params = new URLSearchParams(searchParams.toString());
  if (type === "asc"){
    
  await  sortProduct(productList, currentPageKey , type);
  await sortCategoryProduct(productList, currentPageKey , type)
 if (currentPageKey === "search") {
      params.set("sort", type);
      params.set("pageNumber", "1"); // ارجعي لصفحة 1 دايماً عند الترتيب
      router.push(`${pathname}?${params.toString()}`);
    }
  }else{

    await  sortProduct(productList, currentPageKey , type);
    await sortCategoryProduct(productList, currentPageKey , type)
   if (currentPageKey === "search") {
      params.set("sort", type);
      params.set("pageNumber", "1"); // ارجعي لصفحة 1 دايماً عند الترتيب
      router.push(`${pathname}?${params.toString()}`);
    }
  }
   ;
    
    setIsOpen(false);
  }

  const itemClasses = "block w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors border-none outline-none";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        type="button"
        className="inline-flex w-full items-center justify-center gap-x-2 rounded-md bg-white px-4 py-2 text-lg text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all active:scale-95 font-bold"
      >
        Sort by
        <svg
          className={`size-5 text-black transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-[#771012] shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out
          ${isOpen 
            ? "opacity-100 scale-100 translate-y-0 visible" 
            : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
          }`}
      >
        <div className="py-1 flex flex-col" role="menu">
          
          <Link href="/BestSeller?pageNumber=1" className={itemClasses} role="menuitem">
            Best Seller
          </Link>

          <Link href="/AllOffersPage?pageNumber=1" className={itemClasses} role="menuitem">
            Offers
          </Link>

          <button 
            className={itemClasses} 
            onClick={() => sortFromLowTohight("asc")}
          >
            Price: Low to High
          </button>

          <button 
            className={itemClasses} 
            onClick={() => sortFromLowTohight("desc")}
          >
            Price: High to Low
          </button>

        </div>
      </div>
    </div>
  );
}