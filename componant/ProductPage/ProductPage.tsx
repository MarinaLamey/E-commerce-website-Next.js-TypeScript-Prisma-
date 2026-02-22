"use client";
import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";
import AddToCartButton from "../Cart/addTocartButton";
import Image from "next/image";

export const ProductPage = ({ id }: { id: number }) => {
 const fetchProduct = useProductStore((state) => state.fetchProduct);
  const product = useProductStore((state) => state.Product);
  const isLoading = useProductStore((state) => state.isLoading);
  

  const currentItem = useCartStore((state) => 
    product
      ? state.items.find((i) => Number(i.productId) === Number(product.id)) 
      : undefined
  
  );
 

  useEffect(() => {
    if (id) {
     
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  
  if (!product) {
     return <div className="p-10 text-center text-red-500">
        Product data is empty. Check API Response!
     </div>;
  }

  const maxLimit = Number(product.stock);
  const currentQty = currentItem?.quantity || 0;
  
  const quantityReachedToMax = currentQty >= maxLimit;
  const currentRemainingQuantity = maxLimit - currentQty;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-[#771011]/5 border border-gray-100">
      <div className="relative group overflow-hidden rounded-3xl bg-gray-50 flex items-center justify-center p-8">
        <Image
          src={product.imgSrc || "/placeholder.png"}
          alt={product.name}
          width={500}
          height={500}
          className="object-contain hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col justify-center space-y-6">
        <h1 className="text-5xl font-['Oswald'] font-black text-gray-900 uppercase">
          {product.name}
        </h1>
        
        <p className="text-gray-500 text-lg leading-relaxed italic">
          {product.description}
        </p>
         <p
            className={`maximumNotice text-sm mt-2 ${
              quantityReachedToMax ? "text-red-500" : "text-green-600"
            }`}
          >
            {quantityReachedToMax
              ? "You reached the limit"
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-[#771011]">${product.price}</span>
        </div>

        <div className="h-[1px] bg-gray-100 w-full my-4" />
       <p>Quantity</p>
        <AddToCartButton
          item={product}
          currentQty={currentQty}
          maxLimit={maxLimit}
          quantityReachedToMax={quantityReachedToMax}
          currentRemainingQuantity={currentRemainingQuantity}
        />
      </div>
    </div>
  );
};