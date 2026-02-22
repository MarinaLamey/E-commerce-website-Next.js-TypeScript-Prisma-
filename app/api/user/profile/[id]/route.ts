import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from '@/utils/dtos';
import { updateUserSchema } from '@/utils/validationSchema';
import { cookies } from "next/headers"; 
import bcrypt from "bcryptjs";
/**
 *  @method  DELETE
 *  @route   https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/user/profile/:id
 *  @desc    Delete Profile
 *  @access  private (only user himself can delete his account)
 */
export async function DELETE(
  request: NextRequest,
 { params }: { params: Promise<{ id: string }> }) {
  try {
    // 🔹 unwrap params
    const  {id}  = await params;

    // 🔹 validate id
    const userId = Number(id);
    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "invalid user id" },
        { status: 400 }
      );
    }

    // 🔹 auth
    const userFromToken = verifyToken(request);
    if (!userFromToken) {
      return NextResponse.json(
        { message: "unauthorized" },
        { status: 401 }
      );
    }

    // 🔹 authorization
    if (userFromToken.id !== userId) {
      return NextResponse.json(
        { message: "forbidden" },
        { status: 403 }
      );
    }

    // 🔹 check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { message: "user not found" },
        { status: 404 }
      );
    }

    console.log("Deleting user:", user.id);

    // 🔹 delete user
    await prisma.user.delete({ where: { id: userId } });
    //delete cookie
   (await cookies()).delete("jwtToken")
    return NextResponse.json(
      { message: "your profile (account) has been deleted" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE PROFILE ERROR:", error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}



/**
 *  @method  GET
 *  @route   https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/user/profile/:id
 *  @desc    Get Profile By Id
 *  @access  private (only user himself can get his account/profile)
 */
export async function GET( request: NextRequest,
  { params }: { params: Promise<{ id: string }> } ) {
        const  {id}  = await params;
  try {
    const user = await prisma.user.findUnique({
        where:{ id: parseInt(id) },
        select: {
            id: true,
            email: true,
            firstName:true,
            lastName:true,
            createdAt: true,
            isAdmin: true,
        }
    });

    if(!user) {
        return NextResponse.json({ message: 'user not found' }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if(userFromToken === null || userFromToken.id !== user.id){
        return NextResponse.json(
            { message: 'you are not allowed, access denied' },
            { status: 403 }
        )
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    return NextResponse.json(
        { message: 'internal server error' },
        { status: 500 }
    )
  }
}


/**
 *  @method  PUT
 *  @route  https://e-commerce-website-next-js-type-scr-liard.vercel.app/api/user/profile/:id
 *  @desc    Update Profile
 *  @access  private (only user himself can update his account/profile)
 */

export async function PUT(request: NextRequest,
{ params }: { params: Promise<{ id: string }> }){
      try{
       const { id } = await params;
              console.log(params)
      const user = await prisma.user.findUnique({
        where:{ id: parseInt(id) },
        select: {
            id: true,
            email: true,
            firstName:true,
            lastName:true,
            createdAt: true,
            isAdmin: true,
        }
      })
      if(!user) {
        return NextResponse.json({ message: 'user not found' }, { status: 404 });
    }
     const userFromToken = verifyToken(request);
     if(userFromToken === null || userFromToken.id !== user.id){
         return NextResponse.json(
            { message: 'you are not allowed, access denied' },
            { status: 403 }
        )
     }

       const body = await request.json() as UpdateUserDto;
        const validation = updateUserSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            );
        }
      if (body.password){
        const salt = await bcrypt.genSalt(10);
           body.password = await bcrypt.hash(body.password, salt); 
      }
          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
               firstName: body.firstName,
               lastName:body.lastName,
                email: body.email,
                password: body.password
            }
        });
        const { password, ...other } = updatedUser;
        return NextResponse.json({ ...other }, { status: 200 });
      }catch(error){
         return NextResponse.json(
        { message: 'internal server error' },
        { status: 500 }
    )
      }
}