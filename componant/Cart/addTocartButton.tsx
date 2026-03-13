"use client";
import { useCart } from "@/hooks/cart/useCart";
import { ShoppingBag, Plus } from "lucide-react";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import "./addtocart.css";

interface Props {
  item: any;
  quantityReachedToMax:boolean;
  currentRemainingQuantity:number;
}

export default function AddToCartButton({
  item,
  currentRemainingQuantity,
  quantityReachedToMax
}: Props) {
  const { addToCart, isProcessing , cart} = useCart();

  
 
   

  const handleAdd = async () => {
    if (quantityReachedToMax) {
      return toast.warning("Limit Reached");
    }
    addToCart(item.id, 1);
  };
 
  return (
    <div className="px-4 py-8">
      <button
        className={`w-full flex items-center justify-center gap-2 addTocart`}
        disabled={isProcessing}
        onClick={() => handleAdd()}
      >
        <span></span>
        <p className={`maincolor font-bold text-xl`}>
          {isProcessing ? <Spinner /> : 1}
        </p>
        <Plus size={20} color={quantityReachedToMax ? "#eee" : "#ddd"} />
        <ShoppingBag
          size={35}
          color={quantityReachedToMax ? "#ccc" : "#770110"}
        />
      </button>

      {quantityReachedToMax && (
        <p className="text-[10px] text-red-500 mt-2 text-center">
          Limit Reached
        </p>
      )}
    </div>
  );
}
