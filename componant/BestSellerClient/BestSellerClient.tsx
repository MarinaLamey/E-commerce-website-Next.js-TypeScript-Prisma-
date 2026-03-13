"use client"
import { useEffect } from "react";
import { ShopingPageHeading } from "@/componant/ShopingPageHeading/ShopingPageHeading";
import { SideBarFilter } from "@/componant/SideBarFillter/SideBarFillter";
import { BestSellerList } from "@/componant/BestSellerList/BestSellerList";
import { HeadingCompName } from "@/componant/HeadingCompName/HeadingCompName";
import { useBestseller } from "@/hooks/products/useBestseller";
interface BestSellerClientProp{
  pageNumber:number ;
  userDataId:number | undefined;
  userFirstName:string | undefined;
  initialData:any;
}

export const BestSellerClient = ({pageNumber , userDataId ,userFirstName, initialData}:BestSellerClientProp) => {
 const { data, isLoading } = useBestseller(initialData , pageNumber);
  return (
    <div className="w-full relative flex justify-center items-center flex-col">
      <ShopingPageHeading productList={initialData.products || []} productCount={initialData.ProductsCount} currentPageKey="bestseller" />
      <HeadingCompName Name='BestSeller'/>
      <div className=' w-full flex flex-col lg:flex-row gap-6 justify-center px-4 md:px-6 lg:px-8 mb-10 max-w-[1800px] mx-auto '>
     <SideBarFilter userName={userFirstName}  />
      <BestSellerList pageNumber={pageNumber} userId={Number(userDataId)}  data={data}/>
      </div>
      </div>
  )
}
