import axios from "axios";
import { Wishlist  , Product } from "@/app/generated/prisma";
import { promises } from "dns";

export type WishListItemWithProduct =Wishlist&{
  product:Product;
 }

export type WishListResponse = {
    wishlistItems:WishListItemWithProduct[];
 }

 export type AddToWishListResponse ={
    newWishlist:WishListItemWithProduct;
    isLiked:boolean;
 }

//Add to wishlist API fuction 
export const addToWishlist = async(productId : number , userId : number) : Promise<AddToWishListResponse> => {
const response = await axios.post(`http://localhost:3000/api/wishlist` , {
    productId ,
    userId
})
return response.data;
}
//Add to wishlist API fuction 

//Get all wishlist Items 
export const getWishListallItems = async(pageNumber : string) : Promise<WishListResponse> => {
try{
 const response = await axios.get(`http://localhost:3000/api/wishlist?pageNumber=${pageNumber}`)
 return response.data
}catch(error:any){
    
    throw  "Failed to fetch Wishlist";
  }
}

//get wishlist count 
export const getWishListCount = async() : Promise<number> => {
try{
 const response = await axios.get(`http://localhost:3000/api/wishlist/count`)
 return response.data
}catch(error:any) {
throw "faild to get wishlist count"
}
}