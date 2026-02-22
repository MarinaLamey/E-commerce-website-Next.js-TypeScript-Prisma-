"use client";
import { useState, useEffect } from "react"; 
import { useCartStore } from "@/store/useCartStore";
import LottieHandler from "@/componant/feedback/LottieHandler";
import Cartpageitem from "@/componant/cartpageitem/cartpageitem";
import CartSubtotal from "@/componant/Cart/CartSubtotal/CartSubtotal";
import CheckoutModal from "@/componant/CheckoutModalProps/CheckoutModalProps";


function Cartpage() {
  
  const items = useCartStore((state) => state.items);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  useEffect(() => {
    const refreshStock = async () => {
         try {
           const productIds = items.map((p: any) => p.id).join(',');
           const response = await fetch(`/api/products/stock-check?ids=${productIds}`);
           const stockMap = await response.json();
           // update stock 
           useCartStore.getState().updateStockOnly(stockMap);
         } catch (error) {
           console.error("Failed to sync stock:", error);
         }
       };
   
       refreshStock();
     
  },[])


  return (
    <div className="w-full flex flex-col relative p-4" style={{ minHeight: "700px" }}>
      <h3 className="text-4xl self-start font-['Oswald'] font-bold p-2 mb-6">Your Cart</h3>
      
      <div className="w-full flex flex-col gap-4 relative">
        {items.length > 0 ? (
          <>
            <div className="flex flex-col gap-3">
             
              {items.map((item) => (
                <Cartpageitem key={item.productId} item={item} />
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <CartSubtotal />
              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-[#771011] hover:bg-black text-white font-['Oswald'] py-5 rounded-2xl text-xl transition-all shadow-lg active:scale-95"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        ) : (
          <div className="py-20">
            <LottieHandler type={"Empty"} message={"Your cart is empty"} />
          </div>
        )}
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />  
    </div>
  );
}

export default Cartpage;