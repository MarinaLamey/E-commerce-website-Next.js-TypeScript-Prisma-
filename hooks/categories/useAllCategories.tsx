import { useQuery } from "@tanstack/react-query";
import { GetCategoryProps } from "@/type/categoryTyping";
export const useAllCategories = (pageNumber: number, initialData: GetCategoryProps) => {
  return useQuery({
    queryKey: ["allCategories", pageNumber],
    queryFn: async () => {
        //to conect with redies
      const res = await fetch(`/api/categories?pageNumber=${pageNumber}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
initialData: pageNumber === 1 ? initialData : undefined,
    staleTime: 1000 * 60 * 60, 
    placeholderData: (previousData) => previousData,
  });
};