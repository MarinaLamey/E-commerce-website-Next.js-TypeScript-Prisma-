import { useCartStore } from "@/store/useCartStore"
 const CartSubtotal = () => {
   
    const cartSubtotal = useCartStore((state) => state.cartSubtotal)
  return (
   
     <div className="border-t border-gray-200 p-2 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className='text-3xl'>Subtotal</p>
                    <p>${cartSubtotal}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                 

                </div>
  )
}
export default CartSubtotal;