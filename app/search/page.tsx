import { getSearchResult } from "@/apiCalls/searchCall";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { SearchLList } from "@/componant/Search/SearchList";
import { SideBarFilter } from "@/componant/SideBarFillter/SideBarFillter";
import { ShopingPageHeading } from "@/componant/ShopingPageHeading/ShopingPageHeading";
import { SearchProps } from "@/apiCalls/searchCall";
type Params = Promise<string>;
type SearchParams = Promise<{
  [key: string]: string | undefined;
}>;
async  function SearchPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
       const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value || "";
    const userData = verifyTokenForPage(token);
   const { pageNumber, q , sort} = await props.searchParams;
  const products:SearchProps= await getSearchResult(Number(pageNumber) , q , sort)

  return (
     <div className="w-full min-h-screen relative mx-auto mb-5"> 
<div className="w-full relative flex flex-col items-center">
      <ShopingPageHeading productList={(products.products)} productCount={(products.ProductCount)} currentPageKey="search" />
      
      <div className='w-full flex flex-col md:flex-row gap-3 justify-center px-4 mb-10'>
        <SideBarFilter userName={userData?.firstName} />
        <SearchLList pageNumber={Number(pageNumber)}  searchText={q} userId={userData?.id} products={products} sort={sort} />
      </div>
    </div>
    </div>
  );
}

 export default SearchPage;



