import React from "react";
import Button from "../button";
import { HiOutlineChevronLeft } from "react-icons/hi";

function ProfileOrdersTable({ tbodyData }) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs text-right font-bold  text-gray-500 "
                    >
                      شناسه سفارش
                    </th>
                    <th
                      scope="col"
                      className=" flex gap-1 px-6 py-3 text-xs text-right font-bold text-gray-500 "
                    >
                      زمان ثبت سفارش
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs text-right font-bold  text-gray-500 "
                    >
                      مجموع مبلغ
                    </th>
                    <th
                      scope="col"
                      className=" gap-1 px-6 py-3 text-xs text-right font-bold text-gray-500 "
                    >
                      زمان تحویل سفارش
                    </th>
                    <th
                      scope="col"
                      className=" gap-1 px-6 py-3 text-xs text-right font-bold text-gray-500 "
                    >
                      جزییات سفارش
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tbodyData.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {new Intl.NumberFormat("fa-IR").format(row.id)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {new Intl.DateTimeFormat("fa-IR").format(
                            row.createdAt
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {new Intl.NumberFormat("fa-IR", {
                            style: "currency",
                            currency: "IRR",
                          }).format(row.totalPrice)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {row.deliveryTime?new Intl.DateTimeFormat("fa-IR").format(
                            row.deliveryTime
                          ):"-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          <HiOutlineChevronLeft />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOrdersTable;
