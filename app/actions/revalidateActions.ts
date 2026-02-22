// app/actions/revalidate.ts
"use server"
import { revalidateTag, revalidatePath } from "next/cache";

export async function revalidateProductTags(categoryId?: number) {
  try {
    revalidatePath('/', 'layout'); // s
    revalidatePath('/api/products');
    revalidatePath("/BestSeller")
    revalidatePath("/api/bestseller")
    //@ts-ignore
    revalidateTag("bestseller")
    // @ts-ignore
    revalidateTag("section-Bestseller")
    // @ts-ignore 
    revalidateTag('products');
    //offers
    // @ts-ignore
    revalidateTag("section-offers");
    if (categoryId) {
      revalidatePath(`/categories/${categoryId}`);
      // @ts-ignore
      revalidateTag(`category-${categoryId}`);
     // @ts-ignore
      revalidateTag(`offers-cat-${categoryId}`); //     
      
      revalidatePath(`/Offers?category=${categoryId}`);
      
    }
  } catch (error) {
    console.error("Cache invalidation failed", error);
  }
}

export async function revalidateCategoryTags() {
  try {
    revalidatePath('/', 'layout'); 

    revalidatePath('/categories');
    revalidatePath('/api/categories');
    
    // @ts-ignore
    revalidateTag('categories');
    
    // @ts-ignore
    revalidateTag('nav-categories'); //     

  } catch (error) {
    console.error("Category cache invalidation failed", error);
  }
}
