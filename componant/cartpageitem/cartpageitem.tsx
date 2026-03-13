import { useCart } from "@/hooks/cart/useCart";
import { CartItem, Product } from "@/app/generated/prisma";
import "./cartItem.css"
import { toast } from "react-toastify";
import Image from "next/image";
import { memo } from "react";
export type CartItemWithProduct = CartItem & {
  product: Product;
};
type CartResponse = {
  item: CartItemWithProduct;
};
function Cartpageitem({ item }: CartResponse) {
 const { cart,  deleteItem , updateQuantity , addToCart} = useCart();
 

  const renderOptions = Array(item.product.stock)
    .fill(0)
    .map((el, eleIndex) => {
      const qty = ++eleIndex;
      return (
        <option key={qty} value={qty}>
           {qty}{" "}
        </option>
      );
    }); //Delete Function

  const handleRemove = async () => {
   
    await deleteItem(item.id);
  }; //Delete Function
  //Change Qty Function
  const handleChangeQty = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const quantity = Number(event.target.value);
   await updateQuantity(item.productId ,quantity )
  }; //Change Qty Function
  return (
    <div className="flex flex-row relative w-full p-2">
      {" "}
      <div className="size-48 shrink-0 overflow-hidden rounded-md border border-gray-200">
       {" "}
        <Image
          src={item.product.imgSrc}
          width={400}
          height={400}
          className="size-full object-cover"
          alt="productImage"
        />
       {" "}
      </div>
     {" "}
      <div className="ml-4 flex flex-1 flex-col py-2 items-start ">
        <h3 className=" font-bold text-3xl">{item.product.name}</h3>
         <p className="my-5">{item.product.description}</p>{" "}
        <p className="mb-5">red</p>{" "}
        <select
    value={item.quantity}
    onChange={handleChangeQty}
    className="appearance-none w-14 bg-[#771011] text-white text-sm font-semibold rounded-xl 
               px-4 py-3 border border-transparent shadow-md cursor-pointer
               transition-all duration-300 ease-in-out
               hover:bg-black hover:shadow-lg
               focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
  >
    {renderOptions}
  </select>
       {" "}
      </div>
     {" "}
  <div className="flex flex-col py-2 w-24 items-end"> 
  {/* Display product price - fixed at the top */}
  <p className="font-bold text-2xl h-8 flex items-center">
    {item.product.price * item.quantity} EG
  </p>

  {/* Push the button to the bottom using mt-auto. 
      This prevents any hover animations or height changes 
      from pushing the price element above.
  */}
  <div className="mt-auto flex items-end"> 
     <button
       onClick={handleRemove}
       className="removeButton"
     >
       <svg viewBox="0 0 448 512" className="svgIcon">
         <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
       </svg>
     </button>
  </div>
</div>
      {" "}
    </div>
  );
}

export default memo(Cartpageitem);
