// hooks/products/useCategoryProducts.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "@/store/useFilterStore";
import { ProductType } from "@/type/productTyping";
import { CategoryProductsDataType } from "@/type/productTyping";
export const useCategoryProducts = (id: number, initialData: CategoryProductsDataType, page: number) => {
  const sortKey = useFilterStore((state) => state.sortKey);

  return useQuery({
    queryKey: ["categoryProducts", id, page, sortKey],
    queryFn: async () => {
      const res = await fetch(`/api/categories/${id}?pageNumber=${page}&sort=${sortKey}`);
      if (!res.ok) throw new Error("Failed to fetch");
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
    initialData: (page === 1 && sortKey === "default") ? initialData : undefined,
    staleTime: 1000 * 5, 
      placeholderData: (previousData) => previousData, 
  });
};