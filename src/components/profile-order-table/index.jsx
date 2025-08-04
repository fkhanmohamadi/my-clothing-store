import React from "react";
import Button from "../button";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { GiCheckMark } from "react-icons/gi";

function ProfileOrdersTable({ ordersData }) {
  return (
    <div className="flex flex-col gap-2">
      {ordersData.map((row, index) => {
        return (
          <div key={row.id} className="flex flex-col  gap-1 p-3 border border-gray-300 rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <span>مشخصات سفارش</span>
              </div>
              <div className=" text-sm text-gray-800 whitespace-nowrap">
                <HiOutlineChevronLeft />
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 px-3 py-2 lg:px-6 lg:py-4">
              <div className="flex gap-0.5 items-center text-sm font-medium text-gray-800 whitespace-nowrap">
                <GiCheckMark className="h-4 w-4 text-orange-300" />
                <span className="text-gray-500">شناسه سفارش:</span>
                {new Intl.NumberFormat("fa-IR").format(row.id)}
              </div>
              <div className="flex gap-0.5  text-sm text-gray-800 whitespace-nowrap">
                <GiCheckMark className="h-4 w-4 text-orange-300" />
                <span className="text-gray-500">زمان ثبت:</span>
                {new Intl.DateTimeFormat("fa-IR").format(row.createdAt)}
              </div>
              <div className="flex gap-0.5  text-sm text-gray-800 whitespace-nowrap">
                <GiCheckMark className="h-4 w-4 text-orange-300" />
                <span className="text-gray-500"> مبلغ:</span>
                {new Intl.NumberFormat("fa-IR", {
                  style: "currency",
                  currency: "IRR",
                }).format(row.totalPrice)}
              </div>
              <div className="flex gap-0.5 text-sm text-gray-800 whitespace-nowrap">
                <GiCheckMark className="h-4 w-4 text-orange-300" />
                <span className="text-gray-500">زمان تحویل:</span>
                {row.deliveryTime
                  ? new Intl.DateTimeFormat("fa-IR").format(row.deliveryTime)
                  : "-"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProfileOrdersTable;
