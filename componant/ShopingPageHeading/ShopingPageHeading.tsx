"use client"
import { Product } from "@/app/generated/prisma"
import ShopDropMenu from "../ShopingDropMenu/ShopingDropMenu"
import { useCategoriesStore } from "@/store/useCategoriesStore"
import { useProductStore } from "@/store/useProductStore"

interface ShopingPageHeading {
  productList:Product[];
  currentPageKey:string;
  productCount:number;
}
export const ShopingPageHeading = ({productList , productCount , currentPageKey}:ShopingPageHeading) => {

  return (
  <div className=" relative w-full flex justify-center items-center  p-5 ">
 <div className='   relative w-full flex flex-row items-center justify-between z-40 '>
      <div className='text-4xl font-bold '>
       {productCount} Product
      </div>
      <div className='rounded-lg  w-fit '>
     <ShopDropMenu productList={productList} currentPageKey={currentPageKey}/>
      </div>
 </div>
 </div> 
  )
}
