import { useQuery } from "@tanstack/react-query";
import { ProductType } from "@/type/productTyping";

export const useProduct = (id: number) => {
  return useQuery<ProductType>({ 
    queryKey: ["products", id], 
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`);
      
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      
      return data.product; 
    },
    staleTime: 1000 * 60 * 5, 
    placeholderData: (previousData) => previousData,
  });
};