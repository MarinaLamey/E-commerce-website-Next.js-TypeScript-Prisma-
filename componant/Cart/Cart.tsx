"use client";
import Link from "next/link";
import { memo } from "react";
import { Product } from "@/app/generated/prisma";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import AddToCartButton from "./addTocartButton"; // تأكدي من تسمية الملف والـ import
import { ArrowUpRight } from "lucide-react";
import "./cart.css";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";


interface CartProps {
    user:number | undefined;
  item: Product ;
  
}

function Cart({ item , user }: CartProps) {


  const wishListitems = useWishlistStore((state) => state.wishListitems);
    const isLoading = useWishlistStore((state) => state.loadingItems[item.id]);
      const addItemtoWishlist = useWishlistStore((state) => state.addItemtoWishlist);


  const currentItem = useCartStore((state) =>
    state.items.find((i) => i.productId === item.id)
  );
  
  const maxLimit = Number(item.stock);

  const currentQty = currentItem?.quantity || 0;
  const quantityReachedToMax = currentQty >= maxLimit;
  const currentRemainingQuantity = maxLimit - currentQty;

  //Handle like and dislike function 
  //if this product in wishlist or no 
const isLike = wishListitems.some(items => items.productId  === item.id );
  //if this product in wishlist or no 
 const AddToWishlist = async() => {
    try{
        console.log(isLike);
     await addItemtoWishlist(item.id , Number(user));
    }catch(error:any){
        toast.error(`failed to add`)
    }
 }
    //Handle like and dislike function 
  return (
    <div
      className="text-center mb-6 bg-white p-1 relative"
      style={{ maxWidth: "400px", borderRadius: "1.25rem" }}
    >
      <div className="cardinner">
        <div className="box">
          <div
            className="wishlistBtn flex items-center justify-center cursor-pointer shadow-xl rounded-md "
            onClick={AddToWishlist}
          
          >
            {isLoading ? (
              <Spinner />
            ) : isLike ? (
              <Heart size={30} color="black" />
            ) : (
              <Heart size={30} color="red" />
            )}
          </div>
          <div className="img-holder">
            <Image
              src={item.imgSrc || "/placeholder.png"}
              width={400}
              height={400}
              alt={item.name}
            />
          </div>

          <div className="icon">
            <Link href={`/Product/${item.id}`} className=" CartLink iconbox" data-effect="spin">
              <ArrowUpRight color="white" size={35} />
              <span className="shimmer"></span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-1">
        <div className="content text-left py-3 uppercase pl-3">
          <h3 className="text-black text-xl font-bold">{item.name}</h3>

          <div className="flex flex-row items-center">
            <p className="mt-2 text-sm h-5 overflow-hidden">
              {item.description}
            </p>
            <p>...</p>
          </div>

          <p
            className={`maximumNotice text-sm mt-2 ${
              quantityReachedToMax ? "text-red-500" : "text-green-600"
            }`}
          >
            {quantityReachedToMax
              ? "You reached the limit"
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>

          <ul className="list-style flex gap-2 text-[10px] mt-2">
            <li className="branding bg-gray-100 px-2 rounded">Price: {item.price}</li>
            <li className="packaging bg-gray-100 px-2 rounded">Packaging</li>
          </ul>
        </div>

        <AddToCartButton
          item={item}
          currentQty={currentQty}
          maxLimit={maxLimit}
          currentRemainingQuantity={currentRemainingQuantity}
          quantityReachedToMax={quantityReachedToMax}
        />
      </div>
    </div>
  
  );
}

export default memo(Cart);
