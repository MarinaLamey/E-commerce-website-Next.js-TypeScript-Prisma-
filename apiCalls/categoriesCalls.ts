import { unstable_cache } from 'next/cache';
import prisma from '@/lib/db';
import { Category } from "@/app/generated/prisma";
import { Product } from "@/app/generated/prisma";
import { PRODUCT_PER_PAGE } from '@/utils/constants';
interface CategoriesList {
    allCategories: Category[];
    newCategory: Category[];
}

interface GetCategoryProps{
    products:Product[];
     categoryProductCount:number;
}
 export async function getCategories(pageNumber:string | undefined): Promise<CategoriesList>{
    const response = await fetch(`/api/categories?pageNumber=${pageNumber}`)
   
    if(!response.ok){
        throw new Error("Faild to fetch Categories")
    }
return response.json();
}

//get categories count 
 export async function getCategoriesCount(): Promise<number>{
    const response = await fetch(`/api/categories/count`)
    if(!response.ok){
        throw new Error("Faild to fetch Categories")
    }
    const {count} = await  response.json() as {count:number};
return count
}


//get search 



export const getAllCategories = async (pageNumber: number | undefined) => {
    const fetcher = unstable_cache(
        async () => {
            try {
                const currentPage = Math.max(1, Number(pageNumber) || 1);
                const skip = PRODUCT_PER_PAGE * (currentPage - 1);

                const [categories, categoriesCount] = await Promise.all([
                    prisma.category.findMany({
                        skip: skip,
                        take: PRODUCT_PER_PAGE,
                        orderBy: { name: 'asc' } 
                    }),
                    prisma.category.count()
                ]);

                return { categories, categoriesCount };
            } catch (error: any) {
                console.error("All Categories Fetch Error:", error);
                throw new Error("Failed to get categories");
            }
        },
        [`all-categories-pg-${pageNumber}`],
        {
            revalidate: 9000,
            tags: ["categories"] 
        }
    );

    return fetcher();
};