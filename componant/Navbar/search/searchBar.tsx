"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { SearchIcon } from "lucide-react";
import "../navbar.css";
 export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
   const [isOpen, setOpen] = useState(false);
   const router = useRouter();
 const [activesearch , setactivesearch] = useState(false)
 
  function ActiveSearch(){
    if (activesearch === false){
    setactivesearch(true)
    }else{
      setactivesearch(false)
    }
  }

  const handleSearch = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      router.push(`/search?q=${searchTerm}&pageNumber=${1}&sort=default`);
    }
  };
  return (
         <div className=''>
      <button onClick={() => ActiveSearch()} 
        aria-expanded={isOpen ? "true" : "false"}
          aria-controls="mobile-menu"
          >
      <Search color='black'  className='w-5 md:w-7 z-20 drop-shadow-logodrop1 cursor-pointer animationicon ' style={{transition:'1s'}}  />
        </button >
      { activesearch === true ? (<div
          className="absolute top-[60px] right-[-20px]  mt-2 w-[300px]  bg-white rounded-lg shadow-lg shadow-red-300 z-50 transform transition-all duration-300 ease-in-out mt-2 z-10 grid grid-cols-1 text-sm bg-white  "
        > 
         <form onSubmit={handleSearch} className="flex items-center sm:max-w-sm md:max-w-md lg:max-w-lg w-full mx-auto   rounded-xl">
      {/* Label hidden for screen readers */}
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      {/* Input Wrapper */}
      <div className="relative flex-1 rounded-xl">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 19l-4-4m0-7a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          id="search"
           onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-4 text-sm text-gray-900   rounded-xl
                     bg-transparent focus:ring-2 focus:ring-[#771011] focus:border-[#771011] outline-none"
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="ml-2 px-4  py-4  text-sm font-medium text-white bg-[#771011] rounded-xl 
                   hover:bg-red-800 focus:ring-2 focus:ring-[#771011] focus:outline-none"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 19l-4-4m0-7a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
        </div>
        )
 : ''}
 </div>
   
  );
};


