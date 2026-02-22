import { NextResponse , NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { PRODUCT_PER_PAGE } from '@/utils/constants';



/**
 *  @method  GET
 *  @route  http://localhost:3000/api/search
 *  @desc    Get Search products 
 *  @access  public
 */
export async function GET(request:NextRequest) {
  try {
  
    const query =  request.nextUrl.searchParams.get("q") || undefined;
    const pageNumber = Number(request.nextUrl.searchParams.get("pageNumber")) || 1;
    const sort = request.nextUrl.searchParams.get("sort"); 
    if (!query) {
      return NextResponse.json([]);
    }

    let orderBy: any = {};
    if (sort === "asc" || sort === "desc") {
      orderBy = { price: sort }; 
    } else {
      orderBy = { createdAt: 'desc' };
    }
    const searchFilter = {
      OR: [
        { name: { contains: query, mode: 'insensitive' as const } },
        { description: { contains: query, mode: 'insensitive' as const } },
        { category: { name: { contains: query, mode: 'insensitive' as const } } },
      ],
    };


    const [products, ProductCount] = await Promise.all([
      prisma.product.findMany({
        where: searchFilter,
        include: { category: true },
        orderBy: orderBy, 
        skip: PRODUCT_PER_PAGE * (pageNumber - 1),
        take: PRODUCT_PER_PAGE,
      }),
      prisma.product.count({ where: searchFilter })
    ]);

    return NextResponse.json({ProductCount , products});
  } catch (error) {
    console.error('Search Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}