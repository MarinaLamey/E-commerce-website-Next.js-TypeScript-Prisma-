import { Prisma } from "@/app/generated/prisma";
export interface RegisterUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword : string;
    phone: string;
  
}

export interface LoginUserDto {
    email:string;
    password:string;
}

export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    password?: string;
    email?:string
}

export interface categortDto{
    name:string;
    imgSrc:string;
}

export interface UpdateCategoryDto{
    name?:string;
    imgSrc?:string;
}
export interface productDto {
     name:string;
    imgSrc:string;
    description:string;
    price:number;
    stock:number;
    categoryId:number;
    isOffer:boolean;
    isBestseller:boolean;
}

export interface UpdateProductDto{
    name?:string;
    imgSrc?:string;
    description?:string;
    price?:number;
    stock?:number;
    categoryId?:number;
    isOffer?:boolean;
    max?:number;
}


//order typing



export type OrderWithDeepItems = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true
      }
    }
  }
}>;