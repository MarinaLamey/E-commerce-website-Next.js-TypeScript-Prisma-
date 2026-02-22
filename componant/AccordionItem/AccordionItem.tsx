"use client";
import { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

 export const AccordionItem = ({ title, children, icon }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 px-2 text-left hover:bg-gray-50 transition-colors rounded-lg group"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-gray-500 group-hover:text-[#771011] transition-colors">{icon}</span>}
          
          <span className={`font-medium ${isOpen ? "text-[#771011]" : "text-gray-700"}`}>
            {title}
          </span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#771011]" : ""
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-4 pl-10 flex flex-col gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};