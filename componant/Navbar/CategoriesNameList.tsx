"use client"
import { useCategoriesStore , selectCategoryNames } from "@/store/useCategoriesStore";
import { Category } from "@/app/generated/prisma";
import Link from "next/link";
import { NavbarProp } from "./Navbar";
import "./navbar.css"
import { useEffect , useRef } from "react";

export function CategoriesNameList({initialCategories}:NavbarProp ) {
 const hydrateCategoryList = useCategoriesStore((state) => state.hydrateAllCategories)
  const Categories = useCategoriesStore((state) => state.allCategories);
 const hasHydrated = useRef(false);
  useEffect(() => {
   if (initialCategories && initialCategories.length !== Categories.length) {
           hydrateCategoryList(initialCategories);
           hasHydrated.current = true;
         }
  },[initialCategories ,hydrateCategoryList , Categories.length ])
  
  return (
 
    <ul>
      {Categories.map(cate => (
        <Link  key={cate.id} href={`/categories/${cate.id}?pageNumber=1`}>
          <li className="btn-11">
            {cate.name}</li>
        </Link>
      ))}
      <Link href={`/categories?pageNumber=1`}>
      <li>See More</li>
      </Link>
      
    </ul>
   
  );
};
