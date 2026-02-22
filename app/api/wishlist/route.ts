import { NextRequest , NextResponse } from 'next/server';
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/lib/db";
import { WISHLIST_PER_PAGE } from '@/utils/constants';


/**
 *  @method  POST
 *  @route   ~/api/wishlist
 *  @desc    add to wishlist
 *  @access  private  //only user (logIn)
 */


export async function POST(request:NextRequest) {
    try{
        //user checking if login 
    const user = verifyToken(request);
    if (user === null ) {
      return NextResponse.json(
        { message: 'Must Login First' },
        { status: 401 }
      )
    }
       //user checking if login 

    const { productId} = await request.json();
  const userId = user.id
     //search if product in wishlist
    const existingEntry = await prisma.wishlist.findUnique({
            where: {
                userId_productId: { userId, productId }
            }
        });

        if (existingEntry) {
          //if there delete
            await prisma.wishlist.delete({
                where: { id: existingEntry.id }
            });
            return NextResponse.json({ isLiked: false }, { status: 200 });
        } else {
         // if not there add to wishlist
           const newWishlist= await prisma.wishlist.create({
                data: { userId, productId }
            });
            return NextResponse.json({ isLiked: true  , newWishlist} ,  { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Error toggling wishlist" }, { status: 500 });
    }
}





/**
 * @method  GET
 * @route   ~/api/wishlist
 * @desc    get user cart with items
 * @access  private (Registered users)
 */

export async function GET(request:NextRequest) {
    
    try{
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
     //user checking if login 
    const user = verifyToken(request);
    if (user === null ) {
      return NextResponse.json(
        { message: 'Must Login First' },
        { status: 401 }
      )
    }
       //user checking if login 
       //get wishlist items by user id 
       const Items = await prisma.wishlist.findMany({
        where:{userId:user.id},
        include:{product:true},
             skip: WISHLIST_PER_PAGE * (parseInt(pageNumber) - 1),
              take: WISHLIST_PER_PAGE,
              orderBy: { createdAt: 'desc' }
       })
         return NextResponse.json({wishlistItems: Items} , { status: 200 });
    }catch(error:any){
         return NextResponse.json({ message: "Error getting wishlist" }, { status: 500 });
    }
}