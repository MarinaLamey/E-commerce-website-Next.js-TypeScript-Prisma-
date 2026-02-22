import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getCachedOffers = (categoryId: number) => 
  unstable_cache(
    async () => {
      console.log("Fetching from DB..."); 
      return await prisma.product.findMany({
        where: { isOffer: true, categoryId },
        take: 10,
        orderBy: { createdAt: 'desc' }
      });
    },
    [`offers-cat-${categoryId}`], 
    {
      revalidate: 3600, 
      tags: ["section-offers", `offers-cat-${categoryId}`]
    }
  )();