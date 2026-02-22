"use client";
import Link from "next/link";
import { useCategoriesStore } from "@/store/useCategoriesStore";
import { AccordionItem } from "../AccordionItem/AccordionItem";
import "./sideBar.css";
import Image from "next/image";
import profilePic from "../../public/imgs/Negma.jpeg";

interface SideBarFillter {
  userName: string | undefined;
}

export const SideBarFilter = ({ userName }: SideBarFillter) => {
  const allCategories = useCategoriesStore((state) => state.allCategories);

  return (
    <div className="w-full lg:w-[300px] h-full lg:h-fit lg:sticky lg:top-24 rounded-2xl shadow-sm border border-gray-100 bg-white overflow-hidden">
      <aside className="p-5 md:p-6 flex flex-col">
        
        {/* Header  */}
        <div className="hidden lg:flex items-center gap-3 px-2 mb-8 border-b pb-4 border-gray-50">
          <div className="w-10 h-10 bg-[#771101] rounded-xl flex items-center justify-center shadow-md shadow-[#771101]/20">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900">NegmCartilla</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4">
          <div>
            <p className="px-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Catalog
            </p>

            <AccordionItem 
              title="Categories" 
              
            >
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-2 py-2">
                {allCategories.map((cate) => (
                  <Link key={cate.id} href={`/categories/${cate.id}?pageNumber=1`} className="block py-2 px-3 text-sm text-gray-600 hover:text-[#771011] hover:bg-gray-50 rounded-lg transition-all">
                    {cate.name}
                  </Link>
                ))}
              </div>
            </AccordionItem>
          </div>
          
          <AccordionItem title="Discover" icon={/* SVG Icon */ null}>
            <div className="flex flex-col gap-1 py-2">
              <Link href={`/BestSeller?pageNumber=1`} className="block py-2 px-3 text-sm text-gray-600 hover:text-[#771011] hover:bg-gray-50 rounded-lg">Best Seller</Link>
              <Link href={`/AllOffersPage?pageNumber=1`} className="block py-2 px-3 text-sm text-gray-600 hover:text-[#771011] hover:bg-gray-50 rounded-lg">Hot Offers</Link>
            </div>
          </AccordionItem>
        </nav>

        {/* User Profile Info */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 relative">
            <Image src={profilePic} alt="Profile" fill className="object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-gray-800 truncate">{userName}</span>
            <span className="text-[10px] text-gray-400 font-medium">Verified Account</span>
          </div>
        </div>
      </aside>
    </div>
  );
};