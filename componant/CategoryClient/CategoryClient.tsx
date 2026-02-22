"use client"
import { CategoriesList } from "../CartItemList/CategoriesList"
import { useEffect, memo } from "react";
import { useCategoriesStore } from "@/store/useCategoriesStore";
export const CategoryClient = ({pageNumber , initialData}:any) => {
     const hydrateCategoryList = useCategoriesStore((state) => state.hydrateCategoryList);
     const clear = useCategoriesStore((state) => state.clearAllCaches);
     
       useEffect(() => {
         if (initialData) {
           hydrateCategoryList(initialData.categories , initialData.categoriesCount);
         }
         return () => clear();
       }, [initialData, hydrateCategoryList, clear]);
     
  return (
   
      <CategoriesList pageNumber={pageNumber} />
  )
}
