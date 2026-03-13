"use client"
import { useState , useEffect } from 'react'
import { LucideShoppingBag } from 'lucide-react'
import { useCart } from '@/hooks/cart/useCart';
import { CartItem, Product } from "@/app/generated/prisma";
import Link from 'next/link';
import "./carticon.css"
import "../navbar.css"

export type CartItemWithProduct = CartItem & {
  product: Product;
};

type CartResponse = {
 user:number;
}



export  const CartIcon = ({user}: CartResponse) => {
  const {cart } = useCart()
const totalQuantity = cart?.totalQuantity ?? 0;
console.log(cart)
//get user if not login not load cart qty 

 const [isAnimate, setIsAnimate] = useState(false);
    const quantityStyle = `basketQuantity  ${
        isAnimate ? `pumpCartQuantity` : ""
      }`;
  useEffect(() => {
   
     
     if (!totalQuantity) {
          return;
        }
        setIsAnimate(true);
        
        const debounce = setTimeout(() => {
          setIsAnimate(false);
        }, 300);
       return () => clearTimeout(debounce);
  }, [totalQuantity  , user]);

     
    

       
  return (
    <Link href='/cartpage'>
     <div className='basketContainer relative ' >
        <div className={` ${quantityStyle}`}>
          {totalQuantity}
        </div>
  
   <LucideShoppingBag  color='black'  className=' w-5  drop-shadow-logodrop cursor-pointer animationicon' style={{transition:'1s'}}/>
    </div>
   </Link>  
  )
}
