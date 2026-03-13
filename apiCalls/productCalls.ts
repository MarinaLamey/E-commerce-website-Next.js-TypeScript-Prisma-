    "use server"
    import prisma from "@/lib/db";
    import { redis } from "@/lib/redis/redis";
    import { Product } from "@/app/generated/prisma";
    import { PRODUCT_PER_PAGE } from "@/utils/constants";
    import { ProductType } from "@/type/productTyping";
  import { CategoryProductsDataType } from "@/type/productTyping";
  import { OffersResponse } from "@/type/productTyping";
export interface BestSellerResponse{
    products:Product[];
    ProductsCount:number;
}
export interface getOffersProduct{
    products:Product[];
    productOffersCount:number;
}
export const getBestellerProduct =  async (pageNumber: number | undefined,  sortKey: string = "default"): Promise<BestSellerResponse> => {
    const currentPage = Math.max(1, Number(pageNumber) || 1);

    const cacheKey = `products:bestseller:page:${currentPage}:sort:${sortKey}`;
    let orderBy: any = { createdAt: 'desc' }; 
    if (sortKey === "asc") orderBy = { price: 'asc' };
    else if (sortKey === "desc") orderBy = { price: 'desc' };
        try {
         //ask Redis first 
        const cached = await redis.get<BestSellerResponse>(cacheKey);
        if (cached) return cached;
        // hydration stop func
        //ifRedis empty ask prisma
            const skip = PRODUCT_PER_PAGE * (currentPage - 1);

            const [products, ProductsCount] = await Promise.all([
                prisma.product.findMany({
                    where: { isBestseller: true },
                    skip: skip,
                    take: PRODUCT_PER_PAGE,
                    orderBy:orderBy
                }),
                prisma.product.count({
                    where: { isBestseller: true }
                })
            ]);

            const result = { products, ProductsCount };
            await redis.set(cacheKey, result, { ex: 14400 });

        return result;
        } catch (error: any) {
            console.error("Database Fetch Error:", error);
            throw new Error("Failed to get Bestseller data");
        }
    }

export const getOffersProduct = async (pageNumber: number | undefined, categoryId: number | undefined , sortKey: string = "default") : Promise<OffersResponse> => {
        const currentPage = Math.max(1, Number(pageNumber) || 1);
        const cacheKey = `products:offers:page:${currentPage}:sort:${sortKey}`;
        ///Sort by price
         let orderBy: any = { createdAt: 'desc' }; 
    if (sortKey === "asc") orderBy = { price: 'asc' };
    else if (sortKey === "desc") orderBy = { price: 'desc' };
            try {
                //ask Redis first 
        const cached = await redis.get<OffersResponse>(cacheKey);
        if (cached) return cached;
        // hydration stop func
        //ifRedis empty ask prisma
                const currentCategory = categoryId ? Number(categoryId) : undefined;
                const skip = PRODUCT_PER_PAGE * (currentPage - 1);

                const [products, productOffersCount] = await Promise.all([
                    prisma.product.findMany({
                        where: {
                            ...(currentCategory && { categoryId: currentCategory }),
                            isOffer: true
                        },
                        skip: skip,
                        take: PRODUCT_PER_PAGE,
                        orderBy: orderBy
                    }),
                    prisma.product.count({
                        where: {
                            ...(currentCategory && { categoryId: currentCategory }),
                            isOffer: true
                        }
                    })
                ]);

                const result= { products, productOffersCount };
                 await redis.set(cacheKey, result, { ex: 14400 });

        return result;

            } catch (error: any) {
                console.error("Offers Fetch Error:", error);
                throw new Error("Failed to get offers");
            }
        }

export const getCategoryProducts = async (id: number, pageNumber: number = 1 , sortKey: string = "default"): Promise<CategoryProductsDataType | null> => {
   const cacheKey = `category:${id}:page:${pageNumber}:sort:${sortKey}`;
       try{
        //ask Redis first 
        const cached = await redis.get<CategoryProductsDataType>(cacheKey);
        if (cached) return cached;
        // hydration stop func
        //ifRedis empty ask prisma
  const skip = PRODUCT_PER_PAGE * (pageNumber - 1);
  let orderBy: any = { createdAt: 'desc' }; 
    if (sortKey === "asc") orderBy = { price: 'asc' };
    else if (sortKey === "desc") orderBy = { price: 'desc' };
            const [category, productsCount] = await Promise.all([
                prisma.category.findUnique({
                    where: { id: Number(id) },
                    include: {
                        products: {
                            skip: skip,
                            take: PRODUCT_PER_PAGE,
                            orderBy: orderBy
                        }
                    }
                }),
                prisma.product.count({
                    where: { categoryId: Number(id) }
                })
            ]);

            if (!category) return null;
            const dataCache = {
                products: category.products as ProductType[],
                categoryName: category.name,
                productsCount
            };
            await redis.set(cacheKey, dataCache, { ex: 9000 });
            return dataCache
       }catch(err:any){
       console.error("Redis error:", err);
       return null;
       }
          
    
};


export const getAllOffers = async (pageNumber: number | undefined , sortKey: string = "default"): Promise<OffersResponse> => {
    const cacheKey = `products:allOffers:page:${pageNumber}:sort:${sortKey}`;
      ///Sort by price
         let orderBy: any = { createdAt: 'desc' }; 
    if (sortKey === "asc") orderBy = { price: 'asc' };
    else if (sortKey === "desc") orderBy = { price: 'desc' };
            try {
            //ask Redis first 
        const cached = await redis.get<OffersResponse>(cacheKey);
        if (cached) {
  const currentStocks = await prisma.product.findMany({
    where: { id: { in: cached.products.map(p => p.id) } },
    select: { id: true, stock: true }
  });

  const productsWithFreshStock = cached.products.map(p => ({
    ...p,
    stock: currentStocks.find(s => s.id === p.id)?.stock ?? p.stock
  }));

  return { ...cached, products: productsWithFreshStock };
}
        // hydration stop func
        //ifRedis empty ask prisma
                const [products, productOffersCount] = await Promise.all([
                    prisma.product.findMany({
                        where: { isOffer: true },
                        take: PRODUCT_PER_PAGE,
                         skip: PRODUCT_PER_PAGE * (Number(pageNumber) - 1),

                        orderBy:orderBy,
                        include: { category: true } ,
                        
                    }),
                    prisma.product.count({
                        where: { isOffer: true }
                    })
                ]);
               
               
                const result= { products, productOffersCount };
                await redis.set(cacheKey, result, { ex: 9000 });
            return result
            } catch (error: any) {
                console.error("All Offers Fetch Error:", error);
                throw new Error("Failed to get all offers");
            }
        }

