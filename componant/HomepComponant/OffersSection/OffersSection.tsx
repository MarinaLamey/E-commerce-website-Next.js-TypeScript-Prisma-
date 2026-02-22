import { getCachedOffers } from "@/lib/services/offersService";
import { OffersClient } from "@/componant/OffersSectionClient/OffersSectionClient";
import { Product } from "@/app/generated/prisma";
interface OffersSection{
    title:string;
    user:number;
    categoryId:number;
}

export const OffersSection = async({ title    , user , categoryId}:OffersSection) => {
  


const heheho : Product[] = await getCachedOffers(categoryId);

  return (
    <div  className='  container flex flex-col justify-center mx-auto relative text-center mt-4  rounded-xl md:rounded-2xl p-6 gap-10 overflow-hidden' style={{backgroundColor:"#fff", marginTop:`${'15px'}` ,  background:`${'radial-gradient(circle, rgba(255,188,188,1) 25%, rgba(250,182,182,1) 47%, rgba(119,16,17,0.8) 100%)'}`}} >
   <OffersClient title={title} user={user} categoryId={categoryId} initialData={heheho}/>
  </div>
  )
}


