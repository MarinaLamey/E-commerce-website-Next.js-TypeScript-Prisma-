"use client"
import { SideBarFilter } from "@/componant/SideBarFillter/SideBarFillter";
import { HeadingCompName } from "@/componant/HeadingCompName/HeadingCompName";
import { OffersList } from "@/componant/OffersList/OffersList";
import { useOffersById } from "@/hooks/products/useOffersById";
import { ShopingPageHeading } from "@/componant/ShopingPageHeading/ShopingPageHeading";

interface OffersClientProp{
  UserId:number | undefined;
  userFName:string | undefined;
  initialData:any;
  pageNumber:number;
  route:string;
  category:number | undefined ;
}
export const OffersProductClient = ({userFName , UserId  , initialData , category ,pageNumber ,  route }:OffersClientProp) => {

  const categoryId = category || 0;

  const {data} = useOffersById(initialData , categoryId  , pageNumber );
 
  return (
       <div className="w-full relative flex justify-center items-center flex-col mt-8">
            <ShopingPageHeading productList={initialData.products || []} productCount={initialData.productOffersCount} currentPageKey="Offers" />
             <HeadingCompName Name='Offers'/>
             <div className='  w-full flex flex-col lg:flex-row gap-6 justify-center px-4 md:px-6 lg:px-8 mb-10 max-w-[1800px] mx-auto '>
            <SideBarFilter userName={userFName}  />
             <OffersList  userId={Number(UserId)} pageNumber={pageNumber} route={route} data={data}  />
             </div>
             </div>
  )
}
