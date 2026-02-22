 import { cookies } from "next/headers";
 import { verifyTokenForPage } from "@/utils/verifyToken";
 import Sidebar from "@/componant/Sidebar/Sidebar";
import { ProfileForm } from "@/componant/ProfileForm/ProfileForm";


export default async function ProfilePage() {
   
    //userDate
       const cookieStore = await cookies();
      const token = cookieStore.get("jwtToken")?.value || "";
      const userData = verifyTokenForPage(token);
  ///
  return (
    <div className="flex flex-col md:flex-row min-h-screen  text-white">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16">
        <header className="mb-12">
          <h1 className="font-['Oswald'] text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Account <span className="text-[#771011]">Settings</span>
          </h1>
          <p className="font-['Roboto'] text-gray-500 mt-2">Manage your personal information and security.</p>
        </header>
      <ProfileForm userId={Number(userData?.id)}/>
      </main>
    </div>
  );
}