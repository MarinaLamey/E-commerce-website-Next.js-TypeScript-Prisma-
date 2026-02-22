    import prisma from "@/lib/db";
    import { unstable_cache } from 'next/cache';
    import { Product } from "@/app/generated/prisma";
    import { PRODUCT_PER_PAGE } from "@/utils/constants";

export interface BestSellerResponse{
    products:Product[];
    ProductsCount:number;
}
export interface getOffersProduct{
    products:Product[];
    productOffersCount:number;
}
export const getBestellerProduct = unstable_cache(
    async (pageNumber: number | undefined): Promise<BestSellerResponse> => {
        try {
            const currentPage = Math.max(1, Number(pageNumber) || 1);
            const skip = PRODUCT_PER_PAGE * (currentPage - 1);

            const [products, ProductsCount] = await Promise.all([
                prisma.product.findMany({
                    where: { isBestseller: true },
                    skip: skip,
                    take: PRODUCT_PER_PAGE,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.product.count({
                    where: { isBestseller: true }
                })
            ]);

            return { products, ProductsCount };
        } catch (error: any) {
            console.error("Database Fetch Error:", error);
            throw new Error("Failed to get Bestseller data");
        }
    },
    ["bestseller-cache-key"], 
    {
        revalidate: 9000,   
        tags: ["Bestseller"]      
    }
);

export const getOffersProduct = async (pageNumber: number | undefined, categoryId: number | undefined) => {
    const fetcher = unstable_cache(
        async () => {
            try {
                const currentPage = Math.max(1, Number(pageNumber) || 1);
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
                        orderBy: { createdAt: 'desc' }
                    }),
                    prisma.product.count({
                        where: {
                            ...(currentCategory && { categoryId: currentCategory }),
                            isOffer: true
                        }
                    })
                ]);

                return { products, productOffersCount };

            } catch (error: any) {
                console.error("Offers Fetch Error:", error);
                throw new Error("Failed to get offers");
            }
        },
        [`offers-p-${pageNumber}-cat-${categoryId}`], // Key فريد يجمع الصفحة والتصنيف
        {
            revalidate: 9000, 
            tags: categoryId ? [`category-${categoryId}`, "offers"] : ["offers"]
        }
    );

    return fetcher();
};

export const getCategoryProducts = async (id: number, pageNumber: number = 1) => {
    const cacheFetcher = unstable_cache(
        async () => {
            const skip = PRODUCT_PER_PAGE * (pageNumber - 1);
            const [category, productsCount] = await Promise.all([
                prisma.category.findUnique({
                    where: { id: Number(id) },
                    include: {
                        products: {
                            skip: skip,
                            take: PRODUCT_PER_PAGE,
                            orderBy: { createdAt: 'desc' }
                        }
                    }
                }),
                prisma.product.count({
                    where: { categoryId: Number(id) }
                })
            ]);

            if (!category) return null;
            return {
                products: category.products,
                categoryName: category.name,
                productsCount
            };
        },
        [`category-${id}-pg-${pageNumber}`], // 
        {
            revalidate: 9000,
            tags: [`category-${id}`]
        }
    );

    return cacheFetcher(); // 
};


export const getAllOffers = async (pageNumber: number | undefined) => {
    const fetcher = unstable_cache(
        async () => {
            try {
            

                const [products, productOffersCount] = await Promise.all([
                    prisma.product.findMany({
                        where: { isOffer: true },
                        take: PRODUCT_PER_PAGE,
                         skip: PRODUCT_PER_PAGE * (Number(pageNumber) - 1),

                        orderBy: { createdAt: 'desc' },
                        include: { category: true } ,
                        
                    }),
                    prisma.product.count({
                        where: { isOffer: true }
                    })
                ]);

                return { products, productOffersCount };
            } catch (error: any) {
                console.error("All Offers Fetch Error:", error);
                throw new Error("Failed to get all offers");
            }
        },
        [`all-offers-p-${pageNumber}`],
        {
            revalidate: 9000,
            tags: ["All-offers"]
        }
    );

    return fetcher();
};

