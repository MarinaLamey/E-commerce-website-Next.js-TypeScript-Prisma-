import { CartItem, Product } from "@/app/generated/prisma";
import axios from "axios";


export type CartItemWithProduct = CartItem & {
  product: Product;
};

  export  type CartResponse = {
  items:CartItemWithProduct[]
  totalPrice:number;
  totalQuantity:number;
}


export const addToCartApi = async (productId: number, quantity: number  ): Promise<CartItemWithProduct> => {
  const response = await axios.post("/api/cart", {
    productId,
    quantity,
  }, { withCredentials: true });
  return response.data
};

export const getCartItems = async() : Promise<CartResponse> => {
  try{
   const response = await axios.get(`http://localhost:3000/api/cart`)
   return response.data
  }catch(error:any){
    throw  "Failed to fetch cart";
  }
}

export const deleteCartItem = async(id:number) => {
  try{
   const response = await axios.delete(`http://localhost:3000/api/cart/${id}`)
   return response.data
  }catch(error:any){
     throw  "Failed to Delete cartItem";
  }
}