import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export function useTrendingProducts() {
  return useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      const res = await fetch("/api/products/trending");
      return res.json(); 
    },
  });
}