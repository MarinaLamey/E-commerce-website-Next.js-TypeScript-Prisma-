import prisma from '@/lib/db';
import { Prisma } from '@/app/generated/prisma';
import { redis } from "@/lib/redis/redis";
import { Category } from "@/app/generated/prisma";
import { PRODUCT_PER_PAGE } from '@/utils/constants';
interface CategoriesList {
    allCategories: Category[];
    newCategory: Category[];
}

interface GetCategoryProps{
    categories:Category[];
    categoriesCount:number;
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



export const getAllCategories = async (pageNumber: number | undefined ) => {
      const currentPage = Math.max(1, Number(pageNumber) || 1);
    const cacheKey = `Categories:page:${currentPage}`;

 
            try {
                //ask Redis first 
                      const cached = await redis.get<GetCategoryProps>(cacheKey);
                      if (cached) return cached;
                      // hydration stop func
                      //ifRedis empty ask prisma
                const skip = PRODUCT_PER_PAGE * (currentPage - 1);

                const [categories, categoriesCount] = await Promise.all([
                    prisma.category.findMany({
                        skip: skip,
                        take: PRODUCT_PER_PAGE,
                     orderBy: { createdAt: 'desc' }
                    }),
                    prisma.category.count()
                ]);
                const result = { categories, categoriesCount };
                  await redis.set(cacheKey, result, { ex: 14400 });
                  return result;
        
            } catch (error: any) {
                console.error("All Categories Fetch Error:", error);
                throw new Error("Failed to get categories");
            }
        }