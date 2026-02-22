"use client"
import Link from "next/link";
import { useCategoriesStore } from "@/store/useCategoriesStore"; 
interface PaginationProps {
  pageN: number  ;
  route: string;
  pages: number;
}
   
const Pagination = ({ pageN,  route , pages}: PaginationProps) => {
  const connector = route.includes('/search') ? '&' : '?';
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  const prev = pageN - 1;
  const next = pageN + 1;

  return (
 <div className='flex items-center justify-center gap-3 mt-8 mb-12 select-none'>
  {pageN !== 1 && (
    <Link 
      href={`${route}${connector}pageNumber=${prev}`} 
      className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-transparent text-[#771011] hover:bg-gray-100 hover:border-[#771011]/20 transition-all duration-300 shadow-sm bg-white"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    </Link>
  )}

  <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
    {pagesArray.map(page => (
      <Link 
        key={page}
        href={`${route}${connector}pageNumber=${page}`} 
        className={`
          min-w-[45px] h-[45px] flex items-center justify-center 
          rounded-xl font-['Oswald'] text-lg font-bold transition-all duration-300
          ${pageN === page 
            ? "bg-[#771011] text-white shadow-lg shadow-[#771011]/30 scale-105" 
            : "text-gray-400 hover:bg-gray-50 hover:text-[#e6683c]"
          }
        `}
      >
        {page < 10 ? `0${page}` : page}
      </Link>
    ))}
  </div>

  {pageN !== pages && (
    <Link 
      href={`${route}${connector}pageNumber=${next}`} 
      className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-transparent text-[#771011] hover:bg-gray-100 hover:border-[#771011]/20 transition-all duration-300 shadow-sm bg-white"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </Link>
  )}
</div>
  )
}

export default Pagination;