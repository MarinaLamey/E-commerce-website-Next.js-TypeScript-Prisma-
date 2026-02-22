import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { BestSellerResponse } from "@/apiCalls/productCalls";
import { BestSellerClient } from "@/componant/BestSellerClient/BestSellerClient";
import { getBestellerProduct } from "@/apiCalls/productCalls";
import "./bestsellerpage.css"
import { Product } from "../generated/prisma";
type Params = Promise<string>;
type SearchParams = Promise<{
  [key: string]: string | undefined;
}>;

async function BestSeller(props: {
  params: Params;
  searchParams: SearchParams;
}) {
     const { pageNumber } = await props.searchParams;
      const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const userData = verifyTokenForPage(token);


    const initialData:BestSellerResponse = await getBestellerProduct(Number(pageNumber));
   
return(
    <div
      className=" w-full min-h-screen   relative  mx-auto mb-5 " >
     <BestSellerClient 
     pageNumber={Number(pageNumber)} 
     userDataId={Number(userData?.id)}
     userFirstName={userData?.firstName} 
     initialData={initialData}/>
    </div>
)
}

export default BestSeller;