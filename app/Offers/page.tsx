import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { getOffersProduct } from "@/apiCalls/productCalls";
import { OffersProductClient } from "@/componant/OffersProductClient/OffersProductClient";
interface PageProps {
    params: Promise<{ [key: string]: string | string[] | undefined }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Offers  ({ searchParams }:PageProps ) {
        const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const userData = verifyTokenForPage(token);
    const { category , pageNumber } = await searchParams;
    

   
  const initialData = await getOffersProduct(Number(pageNumber) , Number(category));

  return (
   <div
         className=" w-full min-h-screen    relative  mx-auto mb-5 "
        
       >
        
         <OffersProductClient userFName={userData?.firstName} UserId={Number(userData?.id)} initialData={initialData} pageNumber={Number(pageNumber)} route={"/Offers"} />
       </div>
  )
}

export default Offers;
