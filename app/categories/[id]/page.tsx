import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { getCategoryProducts } from "@/apiCalls/productCalls";
import CategoryProductsClient from "@/componant/CategoryProductsClient/CategoryProductsClient";


type Props = {
  params: Promise<{ id: string }>; 
  searchParams: Promise<{ pageNumber?: string }>;
};

async function CategoryProductsPage({ params, searchParams }: Props) {
  
  const { id } = await params;
  const sParams = await searchParams;
  
 
  const pageNumber = Number(sParams.pageNumber) || 1;

  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const userData = verifyTokenForPage(token);


const initialData = await getCategoryProducts(Number(id) , Number(pageNumber));
  return (
    <div className="w-full min-h-screen relative mx-auto mb-5">
  <CategoryProductsClient 
        id={Number(id)}
        pageNumber={pageNumber}
        initialData={initialData}
        userName={userData?.firstName || "Guest"}
        userId={userData ? Number(userData.id) : undefined}
      />
    </div>
  );
}

export default CategoryProductsPage;