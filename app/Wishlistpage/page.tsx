import { Wishlist } from "@/componant/Wishlist/Wishlist";
import { verifyTokenForPage } from '@/utils/verifyToken';
import { cookies } from 'next/headers';


type Params = Promise<string>;
type SearchParams = Promise<{
  [key: string]: string | undefined;
}>;


async function Wishlistpage (props: {
  params: Params;
  searchParams: SearchParams;
}){
  const cookieStore = await cookies();
          const token = cookieStore.get("jwtToken")?.value || "";
          const userData = verifyTokenForPage(token);
   const { pageNumber } = await props.searchParams;
    return(
   <div className='container min-h-screen mx-auto w-full flex flex-col items-center justify-center relative px-3 '  style={{minHeight:'700px'}}>
    <h3 className='text-4xl self-start font-bold p-2'>Your WistList</h3>
    <div className='w-full  py-5 flex flex-wrap gap-2 p-2  rounded-lg items-center '  style={{minHeight:'600px' , backgroundColor:'#fff'}}>
    <Wishlist user={userData?.id} pageNumber={pageNumber} />
      </div>
      </div>
    )
}


export default Wishlistpage;