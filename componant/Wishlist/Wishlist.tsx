"use client"
import { useWishlistStore } from "@/store/useWishlistStore";
import Gridlist from "@/componant/Gridlist/Gridlist";
import Cart from "@/componant/Cart/Cart";
import { useEffect } from "react";
import { Product } from "@/app/generated/prisma";
import { WISHLIST_PER_PAGE } from "@/utils/constants";
import Pagination from "../pagination/Pagination";
import { useMemo } from "react";

interface WishListProps  {
    pageNumber: string | undefined;
    user:number | undefined;
}
export const 
Wishlist = ({pageNumber , user}: WishListProps) => {
   
    const isLoading = useWishlistStore((state) => state.isLoading);
    const loadWishlist = useWishlistStore((state) => state.loadWishlist)
    const wishListitems = useWishlistStore((state) => state.wishListitems)
    const wishlistCount = useWishlistStore((state) => state.wishlistCount)

        useEffect(() => {
        
        loadWishlist(`${pageNumber}`)
        
    },[pageNumber ])
const items = useMemo(() => {
        return wishListitems
            .filter(item => item?.product) 
            .map(item => item.product);
    }, [wishListitems]);
    const pages = Math.ceil(wishlistCount /  WISHLIST_PER_PAGE)

  return (
    <>
      <Gridlist emptymessage={"Your wishlist is empty"} records={items} renderItem={(record :Product ) =>
        <Cart  key={record.id} item={record} user={user} />
          } >
          </Gridlist>
          <Pagination pageN={Number(pageNumber)} route="Wishlistpage" pages={pages}  />
     </>
  )
}
