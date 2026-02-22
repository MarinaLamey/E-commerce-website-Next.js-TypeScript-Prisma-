import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from '@/utils/verifyToken';
import AdminDashboardWrapper from "@/componant/admin/AdminDashboardWrapper/AdminDashboardWrapper";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function AdminDashboardPage(props: { searchParams: SearchParams }) {
  const { pageNumber } = await props.searchParams;
  
  const token = (await cookies()).get("jwtToken")?.value || "";
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");

  return <AdminDashboardWrapper pageNumber={Number(pageNumber) || 1} />;
}

export default AdminDashboardPage;