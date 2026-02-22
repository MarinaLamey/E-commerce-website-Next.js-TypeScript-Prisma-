"use client";
import { useEffect } from "react";
import { useCategoriesStore } from "@/store/useCategoriesStore";
import { ProductList } from "@/componant/ProductList/ProductList";
import { SideBarFilter } from "@/componant/SideBarFillter/SideBarFillter";
import { ShopingPageHeading } from "@/componant/ShopingPageHeading/ShopingPageHeading";
import { HeadingCompName } from "@/componant/HeadingCompName/HeadingCompName";

export default function CategoryProductsClient({ id, pageNumber, initialData, userName, userId }: any) {
  const hydrateCategory = useCategoriesStore((state) => state.hydrateCategory);
  const clear = useCategoriesStore((state) => state.clearAllCaches);

  useEffect(() => {
    if (initialData) {
      hydrateCategory(initialData.products, initialData.productsCount);

      const refreshStock = async () => {
        try {
          const productIds = initialData.products.map((p: any) => p.id).join(',');
          const response = await fetch(`/api/products/stock-check?ids=${productIds}`);
          const stockMap = await response.json();
          useCategoriesStore.getState().updateStockOnly(stockMap);
        } catch (error) {
          console.error("Failed to sync stock:", error);
        }
      };
      refreshStock();
    }
    return () => clear();
  }, [initialData, hydrateCategory, clear]);

  return (
    <div className="w-full relative flex flex-col items-center">
      <ShopingPageHeading 
        productList={initialData?.products || []} 
        productCount={initialData?.productsCount || 0} 
        currentPageKey="productspage" 
      />
      
      <HeadingCompName Name={`Category ${initialData.categoryName}`} />
      
      <div className='w-full flex flex-col lg:flex-row gap-6 justify-center px-4 md:px-6 lg:px-8 mb-10 max-w-[1800px] mx-auto'>
        <SideBarFilter userName={userName} />
        
        <ProductList id={id} userId={userId} pageNumber={pageNumber} />
      </div>
    </div>
  );
}