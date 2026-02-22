"use client";
import { useEffect } from 'react';
import { useOrderStore } from '../../store/useOrdersStore';
import Image from 'next/image';
import { ORDERS_PER_PAGE } from '@/utils/constants';
import Pagination from '../pagination/Pagination';
import LottieHandler from '../feedback/LottieHandler';

interface OrderProps{
  pageNumber : number | undefined;
}

export default function OrderList({pageNumber} :OrderProps) {
  
  const orders = useOrderStore((state) => state.orders);
    const loading = useOrderStore((state) => state.loading);
      const fetchOrders = useOrderStore((state) => state.fetchOrders);
      const getOrdersCount = useOrderStore((state) => state.getOrdersCount);
     const ordersCount = useOrderStore((state) => state.orderCount);
     //get pages
    
     const pages = Math.ceil(ordersCount / ORDERS_PER_PAGE);
   //get pages
  useEffect(() => {
    if(pageNumber){
    fetchOrders(pageNumber);
    getOrdersCount(); }
  }, [fetchOrders , pageNumber ]);

 
  

  return (
    <div className="min-h-screen flex flex-col gap-6 bg-[#fcfcfc] p-5">
      {orders.map((order) => (
        <div key={order.id} className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="w-full lg:w-[30%] bg-neutral-100 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral-500 uppercase font-bold tracking-widest">Order ID</p>
                <p className="text-xl font-['Oswald'] text-black font-bold">#{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 uppercase font-bold tracking-widest">Total Paid</p>
                <p className="text-2xl font-bold text-[#fd9f9f]">${order.grandTotal.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <span className={`px-4 py-2 rounded-xl text-xl font-black uppercase tracking-tighter ${
                order.status === 'delivered' ? ' text-[#fd9f9f]' : ' text-[#fd9f9f]'
              }`}>
                {order.status}
              </span>
            </div>
          </div>

          <div className="w-full lg:w-[70%] p-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-4">Purchased Items</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-transparent hover:border-gray-200 transition-all">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shadow-sm">
                    <Image 
                      src={item.product.imgSrc || '/placeholder.png'} 
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.product.name}</h4>
                    <p className="text-xs text-[#771011] font-bold mt-1">
                      {item.quantity} × <span className="text-gray-500">${item.price}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ))}
      {
        ordersCount === 0 && (
          <div className="w-full flex justify-center items-center py-20">
                     <LottieHandler type={'Empty'} message={`No Orders found`} />
                  </div>
        )
      }
     <Pagination pageN={Number(pageNumber)} pages={pages} route='/profile/orders' />
    </div>

  );
}