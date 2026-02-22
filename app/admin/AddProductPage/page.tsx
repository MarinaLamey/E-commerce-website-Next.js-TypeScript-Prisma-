import prisma from "@/lib/db";
import ProductForm from "@/componant/admin/ProductForm/ProductForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from '@/utils/verifyToken';
type Params = Promise<string>;
type SearchParams = Promise<{
  [key: string]: string | undefined;
}>;
export default async function AddProductPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  

 //gured admin page 
   const token = (await cookies()).get("jwtToken")?.value || "";
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");

   //gured admin page 

  const categories = await prisma.category.findMany({
    select: { id: true, name: true }
  });
   
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="font-['Oswald'] text-4xl font-black uppercase tracking-tighter italic">
          Add New <span className="text-[#771011]">Legacy</span> Item
        </h1>
        <p className="text-gray-500 font-['Roboto'] text-sm mt-2 uppercase tracking-widest">
          Inventory Management / Global Store
        </p>
      </div>

      {/* استدعاء الـ Client Component وتمرير الـ Categories له */}
      <ProductForm categories={categories} />
    </div>
  );
}