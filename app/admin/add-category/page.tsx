import CategoryForm from "@/componant/admin/CategoryForm/CategoryForm";
import { cookies } from "next/headers"
import { verifyTokenForPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";

export default async function AddCategoryPage() {
    //gured admin page 
       const token = (await cookies()).get("jwtToken")?.value || "";
      if (!token) redirect("/");
    
      const payload = verifyTokenForPage(token);
      if (payload?.isAdmin === false) redirect("/");
    
       //gured admin page 
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full max-w-2xl mb-10 text-center">
        <h1 className="font-['Oswald'] text-4xl font-black uppercase tracking-tighter italic">
          Create New <span className="text-[#771011]">Classification</span>
        </h1>
        <p className="text-gray-500 font-['Roboto'] text-sm mt-2 uppercase tracking-[0.3em]">
          Organization / System Structure
        </p>
      </div>

      <CategoryForm />
    </div>
  );
}