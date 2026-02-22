import { cookies } from "next/headers";
import { ProductPage } from "@/componant/ProductPage/ProductPage";
import { notFound } from "next/navigation";
import { HeadingCompName } from "@/componant/HeadingCompName/HeadingCompName";
import { verifyTokenForPage } from "@/utils/verifyToken";

async function Product({ params }: { params: Promise<{ id: string }> }) {
  const id  = (await params).id;
  console.log(id)
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value || "";
    const userData = verifyTokenForPage(token);

  if (!id) notFound();

  return (
    <div className="min-h-screen  pb-20">
      <div className="w-full flex items-center justify-center mt-10 ">
   <HeadingCompName Name={"Product Page"} />
      </div>
      
      <ProductPage id={Number(id)} />
      <div className="max-w-6xl mx-auto px-4 mt-10">
     

      </div>
    </div>
  );
}

export default Product;