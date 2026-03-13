"use client";
import { useEffect } from "react";
import { useProductViews } from "@/hooks/useProductViews";
import { useProduct } from "@/hooks/products/useProduct";
import { useCart } from "@/hooks/cart/useCart";
import AddToCartButton from "../Cart/addTocartButton";
import Image from "next/image";
import { Eye } from "lucide-react"; // 

export const ProductPage = ({ id }: { id: number }) => {

  const product = useProduct(id)

  const { views, isLoading: isViewsLoading, incrementView } = useProductViews(id.toString());
 const {cart} = useCart();
  const maxLimit = Number(product?.data?.stock);

const currentItemInCart = cart?.items?.find((i: any) => i.productId === product?.data?.id);
const currentQty = currentItemInCart?.quantity || 0;
  const quantityReachedToMax = currentQty >= maxLimit;
  const currentRemainingQuantity = maxLimit - currentQty;


  useEffect(() => {
  
  }, [ incrementView]);


  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product data is empty. Check API Response!
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-[#771011]/5 border border-gray-100">
      
      <div className="relative group overflow-hidden rounded-3xl bg-gray-50 flex items-center justify-center p-8">
        <Image
          src={product?.data?.imgSrc || "/placeholder.png"}
          alt={product?.data?.name || ""}
          width={500}
          height={500}
          className="object-contain hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col justify-center space-y-6">
        
        <div className="flex items-center gap-2 text-gray-400 bg-gray-50 self-start px-3 py-1 rounded-full border border-gray-100">
          <Eye size={16} className="text-gray-400" />
          <span className="text-sm font-medium">
            {isViewsLoading ? "..." : `${views} views`}
          </span>
        </div>

        <h1 className="text-5xl font-['Oswald'] font-black text-gray-900 uppercase">
          {product?.data?.name}
        </h1>

        <p className="text-gray-500 text-lg leading-relaxed italic">
          {product?.data?.description}
        </p>

        <p
          className={`maximumNotice text-sm mt-2 font-medium ${
            quantityReachedToMax ? "text-red-500" : "text-green-600"
          }`}
        >
          {quantityReachedToMax
            ? "⚠ You reached the stock limit"
            : `✓ You can add ${currentRemainingQuantity} more to your cart`}
        </p>

        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-[#771011]">${product?.data?.price}</span>
        </div>

        <div className="h-[1px] bg-gray-100 w-full my-4" />
        
        <p className="font-bold text-gray-800">Stock :{currentRemainingQuantity || 0} </p>
        
        <AddToCartButton
          item={product.data}
          quantityReachedToMax={quantityReachedToMax}
          currentRemainingQuantity={currentRemainingQuantity}
        />
      </div>
    </div>
  );
};