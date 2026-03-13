"use client";
import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "@/store/useFilterStore";
import { ProductType, OffersResponse } from "@/type/productTyping"; 

export const useOffersById = (initialData: OffersResponse, categoryId:number , pageNumber: number) => {
  const sortKey = useFilterStore((state) => state.sortKey);

  return useQuery({
    queryKey: ["offers",categoryId , pageNumber, sortKey],
    queryFn: async () => {
      const res = await fetch(`api/offers?category=${categoryId}&pageNumber=${pageNumber}&sort=${sortKey}`);
      if (!res.ok) throw new Error("Failed to fetch Offers");
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