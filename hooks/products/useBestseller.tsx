"use client";
import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "@/store/useFilterStore";
import { ProductType, CategoryProductsDataType } from "@/type/productTyping"; 

export const useBestseller = (initialData: CategoryProductsDataType, pageNumber: number) => {
  const sortKey = useFilterStore((state) => state.sortKey);

  return useQuery({
    queryKey: ["bestsellerProducts", pageNumber, sortKey],
    queryFn: async () => {
      const res = await fetch(`/api/bestseller?pageNumber=${pageNumber}&sort=${sortKey}`);
      if (!res.ok) throw new Error("Failed to fetch bestsellers");
      const freshData = await res.json();

      if (freshData?.products?.length > 0) {
        const ids = freshData.products.map((p: ProductType) => p.id).join(',');
        const stockRes = await fetch(`/api/products/stock-check?ids=${ids}`);
        
        if (stockRes.ok) {
          const stockMap = await stockRes.json();
          return {
            ...freshData,
            products: freshData.products.map((p: ProductType) => ({
              ...p,
              stock: stockMap[p.id] ?? p.stock
            }))
          };
        }
      }
      return freshData;
    },
    initialData: (pageNumber === 1 && sortKey === "default") ? initialData : undefined,
    staleTime: 1000 * 5, 
    placeholderData: (previousData) => previousData,
  });
};