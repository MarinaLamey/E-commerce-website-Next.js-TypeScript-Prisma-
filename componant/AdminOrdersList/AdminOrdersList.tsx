"use client";
import React, { useEffect } from "react";
import { useAdminOrderStore } from "@/store/useAdminOrderStore";
import Pagination from "../pagination/Pagination";
import { ORDERS_ADMIN_PER_PAGE } from "@/utils/constants";

export const AdminOrdersList = ({ pageNumber }: { pageNumber: number }) => {
  const fetchOrders = useAdminOrderStore((state) => state.fetchAllOrders);
  const orders = useAdminOrderStore((state) => state.allOrders);
  const totalOrders = useAdminOrderStore((state) => state.totalOrders);
  const pages = Math.ceil(totalOrders / ORDERS_ADMIN_PER_PAGE);

  useEffect(() => {
    fetchOrders(Number(pageNumber));
  }, [fetchOrders, pageNumber]);

  return (
    <div className="w-full">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-['Oswald'] text-[#771011] text-xs uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-4 font-['Oswald'] text-[#771011] text-xs uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 font-['Oswald'] text-[#771011] text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-['Oswald'] text-[#771011] text-xs uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 font-['Oswald'] text-[#771011] text-xs uppercase tracking-wider text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-[#771011] text-sm">#ORD-{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700 text-sm">{order.user.firstName} {order.user.lastName}</span>
                    <span className="text-[10px] text-gray-400">{order.user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {order.status || 'PENDING'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{order.phone || "N/A"}</td>
                <td className="px-6 py-4 font-['Oswald'] text-right text-gray-800 font-bold">
                  {order.grandTotal} <span className="text-[10px] text-[#771011]">EGP</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-10 text-center text-gray-400 text-sm italic">No transactions recorded yet.</div>
        )}
      </div>

      <div className="p-4 border-t border-gray-50 flex justify-center">
        <Pagination pageN={pageNumber} pages={pages} route="/admin/dashboard" />
      </div>
    </div>
  );
};