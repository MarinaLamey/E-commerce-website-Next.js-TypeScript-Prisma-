"use client";
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

interface Props {
  item: any;
  currentQty: number;
  maxLimit: number;
  currentRemainingQuantity:number;
  quantityReachedToMax:boolean;

}

export default function AddToCartButton({ item, currentQty ,  maxLimit , currentRemainingQuantity ,quantityReachedToMax }: Props) {

const addItem = useCartStore((state) => state.addItem);
  const handleAdd = async () => {
    if  (quantityReachedToMax){
      return toast.warning("Limit Reached")
    } ;
    try {
      await addItem(Number(item.id) , 1);
    } catch (error) {
     
          alert("Something went wrong!");
    }
  };

  return (
    <div className='px-4 py-8' style={{ borderRadius: '1.25rem', borderWidth: '3px', borderColor: "#ddd" }}>
      <button 
        className='w-full flex items-center justify-center gap-2' 
        onClick={() => handleAdd()}
        
      >
        <p className={`maincolor font-bold text-xl`}>
         1
        </p>
        <Plus size={20} color={quantityReachedToMax ? '#eee' : '#ddd'} />
        <ShoppingBag size={35} color={quantityReachedToMax ? '#ccc' : '#770110'} />
      </button> 
      
      {quantityReachedToMax && (
        <p className="text-[10px] text-red-500 mt-2 text-center">Limit Reached</p>
      )}
    </div>
  );
}