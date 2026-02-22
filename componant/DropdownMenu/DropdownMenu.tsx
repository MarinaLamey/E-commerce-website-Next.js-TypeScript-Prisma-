"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import profilePic from "../../public/imgs/Negma.jpeg";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/useCartStore";

const menu =[
  {name: "Profile" , to:"/ProfilePage"},
  {name: "Orders" , to:"/profile/orders?pageNumber=1"},
  {name: "WishList" , to:"/Wishlistpage?pageNumber=1"},
  {name: "Logout" , to:"/loginpage" }
]
const DropdownMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
 
 const resetCart = useCartStore((state) => state.resetCart)

  const handleItemClick = (item: typeof menu[0]) => {
    setIsOpen(false);

    if (item.name === "Logout") {
      logoutFunction();
    } else {
      router.push(item.to);
      router.refresh()
    }
  };

  const logoutFunction = async() => {
    try{
      resetCart()
         await axios.get(`http://localhost:3000/api/user/logout`)
         router.push("/loginpage");
          router.refresh()
        
    }catch(error){
      toast.warning("Something went wrong");
        console.log(error);
    }
   

    
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Image
          src={profilePic}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full object-cover cursor-pointer"
        />
      </button>

      <div
        className={`absolute !top-[60px] !right-0 !md:right-[-100px] md:w-48 bg-white rounded-lg shadow-lg shadow-red-300 z-50 transform transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}`}
      >
        <ul className="!py-2 flex flex-col">
          {menu.map((item , index) => (
         <li 
         key={index}
           onClick={() => handleItemClick(item)}
          className="!px-4 !py-2 cursor-pointer transition-shadow duration-200 hover:bg-gray-100 hover:shadow-md">
            {item.name}
          </li>
          ))
        
}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
