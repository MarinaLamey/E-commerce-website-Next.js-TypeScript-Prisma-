"use client"
import { useAllCategories } from "@/hooks/categories/useAllCategories";
import { CategoriesList } from "../CartItemList/CategoriesList"
import { CategoryClientType } from "@/type/categoryTyping";
export const CategoryClient = ({pageNumber , initialData}:CategoryClientType) => {
   const { data } = useAllCategories(pageNumber, initialData);
  return (
   
      <CategoriesList pageNumber={pageNumber} data={data}/>
  )
}
