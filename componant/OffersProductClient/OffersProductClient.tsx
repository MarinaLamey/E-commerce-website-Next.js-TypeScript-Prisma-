"use client"
import { SideBarFilter } from "@/componant/SideBarFillter/SideBarFillter";
import { HeadingCompName } from "@/componant/HeadingCompName/HeadingCompName";
import { OffersList } from "@/componant/OffersList/OffersList";
import { useProductStore } from "@/store/useProductStore";
import { useEffect } from "react";
import { ShopingPageHeading } from "@/componant/ShopingPageHeading/ShopingPageHeading";

interface OffersClientProp{
  UserId:number | undefined;
  userFName:string | undefined;
  initialData:any;
  pageNumber:number;
  route:string;
}
export const OffersProductClient = ({userFName , UserId  , initialData , pageNumber ,  route }:OffersClientProp) => {

      const loadProduct = useProductStore((state) => state.fetchOffers);
      const clear = useProductStore((state) => state.clearAllCaches)
           
           useEffect(() => {
           if(initialData){
            loadProduct(initialData.products , initialData.productOffersCount)
           }
           const refreshStock = async () => {
         try {
           const productIds = initialData.products.map((p: any) => p.id).join(',');
           const response = await fetch(`/api/products/stock-check?ids=${productIds}`);
           const stockMap = await response.json();
           
           // Update stock
           useProductStore.getState().updateStockOnly(stockMap);
         } catch (error) {
           console.error("Failed to sync stock:", error);
         }
       };
   
       refreshStock();
           return () => {
           clear()
           }
           },[loadProduct , initialData ])
  return (
       <div className="w-full relative flex justify-center items-center flex-col mt-8">
            <ShopingPageHeading productList={initialData.products || []} productCount={initialData.productOffersCount} currentPageKey="Offers" />
             <HeadingCompName Name='Offers'/>
             <div className='  w-full flex flex-col lg:flex-row gap-6 justify-center px-4 md:px-6 lg:px-8 mb-10 max-w-[1800px] mx-auto '>
            <SideBarFilter userName={userFName}  />
             <OffersList  userId={Number(UserId)} pageNumber={pageNumber} route={route}   />
             </div>
             </div>
  )
}
