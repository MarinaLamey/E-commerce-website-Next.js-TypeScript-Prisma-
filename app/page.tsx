import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import "./globals.css"
import Image from "next/image";
import HeroSection from "@/componant/HomepComponant/HeroSection/HeroSection";
import BenefitsSection from "@/componant/HomepComponant/BenefitsSection/BenefitsSection";
import CategoriesSection from "@/componant/HomepComponant/CategoriesSection/CategoriesSection";
import { BestsellerSection } from "@/componant/HomepComponant/BestsellerSection/BestsellerSection";
import { OffersSection } from "@/componant/HomepComponant/OffersSection/OffersSection";
import { AdSection } from "@/componant/HomepComponant/AdSection/AdSection";
import { OffersPhotosSection } from "@/componant/HomepComponant/OffersPhotosSection/OffersPhotosSection";
import { getBestellerProduct } from "@/apiCalls/productCalls";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default async function Home () {
  
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value || "";
    const userData = verifyTokenForPage(token);
    //Fetch BestSeller for section
   
    const initialData = await getBestellerProduct(1);
   


  return (
    <>
     
 <main>
      <HeroSection/>
     <BenefitsSection/>
     <CategoriesSection/>
     <BestsellerSection user={Number(userData?.id)}   initialData={initialData}/>
     <OffersSection title="Electronics Offers"  user={Number(userData?.id)} categoryId={1}  />
     <OffersSection title="Beauty Offers" user={Number(userData?.id)} categoryId={5}  />
     <AdSection/>
     <OffersPhotosSection />
    </main>
    </>
  );
}
