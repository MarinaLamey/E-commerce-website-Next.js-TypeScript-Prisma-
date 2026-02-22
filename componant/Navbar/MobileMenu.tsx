"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function MobileMenu({ userData, initialCategories }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCats, setShowCats] = useState(false);

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 text-black transition-all duration-300"
      >
        {isOpen ? <X size={28} color="#771011" /> : <Menu size={28} />}
      </button>

      {/* Dropdown Menu Overlay */}
      <div 
        className={`absolute left-0 top-[69px] w-full bg-white shadow-2xl z-[1000] border-t border-gray-100 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-height-screen opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
        style={{ maxHeight: isOpen ? "100vh" : "0" }}
      >
        <div className="flex flex-col p-6 space-y-6 bg-white overflow-y-auto" style={{ maxHeight: "calc(100vh - 70px)" }}>
          
          {/* Main Links */}
          <ul className="flex flex-col gap-5 text-lg font-medium text-gray-800">
            <li>
              <Link 
                href="/" 
                className="block py-2 hover:text-[#771011] transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            
            <li className="border-y border-gray-50 py-2">
              <div 
                className="flex justify-between items-center cursor-pointer py-2 hover:text-[#771011]"
                onClick={() => setShowCats(!showCats)}
              >
                <span>Categories</span>
                <ChevronDown size={20} className={`transition-transform duration-300 ${showCats ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Nested Categories Dropdown */}
              <div className={`overflow-hidden transition-all duration-300 ${showCats ? 'max-h-[500px] mt-4' : 'max-h-0'}`}>
                <div className="grid grid-cols-2 gap-3 pb-4">
                  {initialCategories?.allCategories?.map((cat: any) => (
                    <Link 
                        key={cat.id} 
                        href={`/categories/${cat.id}?pageNumber=1`}
                        className="bg-gray-50 p-3 rounded-lg text-sm text-center active:bg-[#771011] active:text-white transition-all"
                        onClick={() => setIsOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <Link 
                href="/ContactUs" 
                className="block py-2 hover:text-[#771011]" 
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </li>
            
            {userData?.isAdmin && (
              <li className="pt-4 border-t border-gray-100">
                <Link 
                  href="/admin/dashboard" 
                  className="flex items-center justify-center gap-2 bg-[#771011] text-white p-3 rounded-xl font-bold" 
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* User Section (Optional for Mobile) */}
          {!userData && (
             <div className="pt-4 flex flex-col gap-3">
                <Link 
                  href="/loginpage" 
                  className="w-full text-center py-3 border border-[#771011] text-[#771011] rounded-xl font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}