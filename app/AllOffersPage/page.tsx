import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { getAllOffers } from "@/apiCalls/productCalls";
import { OffersProductClient } from "@/componant/OffersProductClient/OffersProductClient";
interface PageProps {
    params: Promise<{ [key: string]: string | string[] | undefined }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function AllOffersPage ({ searchParams }:PageProps ) {
        const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const userData = verifyTokenForPage(token);
    const {  pageNumber } = await searchParams;
    

   
  const initialData = await getAllOffers(Number(pageNumber));

  return (
   <div
         className=" w-full min-h-screen    relative  mx-auto mb-5 "
        
       >
         <OffersProductClient userFName={userData?.firstName} UserId={Number(userData?.id)} initialData={initialData} pageNumber={Number(pageNumber)} route={"/AllOffersPage"} />
       </div>
  )
}

export default AllOffersPage;
