import { useCartStore } from "@/store/useCartStore";
import { CartItem, Product } from "@/app/generated/prisma";
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
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
 

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
    await removeItem(item.id);
  }; //Delete Function
  //Change Qty Function
  const handleChangeQty = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const quantity = Number(event.target.value);
    try {
      await updateQuantity(item.id, item.productId, quantity);
    } catch (error: any) {
      toast.error(error.message);
    }
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
          id="countries"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  px-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style={{ backgroundColor: "#771011" }}
        >
          {renderOptions}{" "}
        </select>
       {" "}
      </div>
     {" "}
      <div className="flex flex-col py-2 justify-between ">
        <p>{item.product.price}eg</p>{" "}
        <button
          onClick={handleRemove}
          className=" text-indigo-600 hover:text-indigo-500"
        >
          Remove {" "}
        </button>
      {" "}
      </div>
      {" "}
    </div>
  );
}

export default memo(Cartpageitem);
