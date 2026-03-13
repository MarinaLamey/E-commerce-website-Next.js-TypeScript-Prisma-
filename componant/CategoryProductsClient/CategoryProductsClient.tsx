"use client";
import { useEffect } from "react";
import { useCategoryProducts } from "@/hooks/products/useCategoryProducts";
import { ProductList } from "@/componant/ProductList/ProductList";
import { SideBarFilter } from "@/componant/SideBarFillter/SideBarFillter";
import { ShopingPageHeading } from "@/componant/ShopingPageHeading/ShopingPageHeading";
import { HeadingCompName } from "@/componant/HeadingCompName/HeadingCompName";
import { CategoryProductsClientType } from "@/type/productTyping";
import { useFilterStore } from "@/store/useFilterStore";
export default function CategoryProductsClient({ id, pageNumber, initialData, userName, userId }: CategoryProductsClientType) {
const { data , isLoading } = useCategoryProducts(id, initialData , pageNumber);
//to set sort to defult value
const Clear = useFilterStore((state) => state.resetFilters);
useEffect(() => {
    return () => {
      console.log("Cleaning up filters...");
      Clear();
    };
  }, [Clear]);
  //to set sort to defult value
  return (
    <div className="w-full relative flex flex-col items-center">
      <ShopingPageHeading 
        productList={data?.products || []} 
        productCount={data?.productsCount || 0} 
        currentPageKey="productspage" 
      />
      
{data && (
  <HeadingCompName Name={`Category ${data.categoryName}`} />
)}      
      <div className='w-full flex flex-col lg:flex-row gap-6 justify-center px-4 md:px-6 lg:px-8 mb-10 max-w-[1800px] mx-auto'>
        <SideBarFilter userName={userName} />
        
        <ProductList id={id} userId={userId} pageNumber={pageNumber} data={data} />
      </div>
    </div>
  );
}