// app/orders/page.tsx
import OrderList from "@/componant/OrderList/OrderList";
import { HeadingCompName } from "@/componant/HeadingCompName/HeadingCompName";
export const metadata = {
  title: 'My Orders | Store Management',
};
type Props = {
  params: Promise<{ id: string }>;  
  searchParams: Promise<{ pageNumber?: string }>; 
};
export default async function OrdersPage({ params, searchParams }: Props) {
  const sParams = await searchParams;
   const pageNumber = Number(sParams.pageNumber) || 1;
  return (
    <div className="container mx-auto min-h-screen   mt-5">
    <div className="flex items-center justify-center">
    <HeadingCompName Name='Your Orders'/>
    </div>
        <OrderList pageNumber={pageNumber} />
     </div>
  );
}