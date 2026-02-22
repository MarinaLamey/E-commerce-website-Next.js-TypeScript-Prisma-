
import { NextRequest , NextResponse } from "next/server";
import prisma from "@/lib/db"
import {registerSchema} from "@/utils/validationSchema"
import {RegisterUserDto} from "@/utils/dtos"
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";

/**
 *  @method  POST
 *  @route ~/api/user/register
 *  @desc    Create New User [(Register) (Sign Up) ]
 *  @access  public
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as RegisterUserDto;
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (user) {
            return NextResponse.json(
                { message: 'this user already registered' },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
       const hastedConfrirmpass = await bcrypt.hash(body.confirmPassword , salt)

        const newUser = await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName:body.lastName,
                email: body.email,
                password: hashedPassword,
                confirmPassword:hastedConfrirmpass,
                phone:body.phone    
            },
            select: {
                firstName: true,
                lastName: true,
                id: true,
                isAdmin: true,
                phone:true
            }
        });


        const cookie = setCookie({
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            isAdmin: newUser.isAdmin,
            phone:newUser.phone
        });

        return NextResponse.json(
            { ...newUser, message: "Registered & Authenticated" },
            {
                status: 201,
                headers: { "Set-Cookie": cookie }
            });

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        );
    }
}