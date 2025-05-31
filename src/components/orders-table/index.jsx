import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import Button from "../button";
import { useDispatch } from "react-redux";

function OrdersTable({ tbodyData, onclick, setShowModal, setEditedItem }) {

  const dispatch = useDispatch();

  const editeOrderHandler = (item) => {
    setEditedItem(item);
    setShowModal(true);
  };

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
                      className="px-6 py-3 text-xs text-right font-bold text-left text-gray-500 uppercase "
                    >
                      ردیف
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs text-right font-bold text-left text-gray-500 uppercase "
                    >
                      نام کاربر
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs text-right font-bold text-left text-gray-500 uppercase "
                    >
                      مجموع مبلغ
                    </th>
                    <th
                      scope="col"
                      className=" flex gap-1 px-6 py-3 text-xs text-right font-bold text-left text-gray-500 uppercase "
                    >
                      زمان ثبت سفارش
                      <Button onclick={onclick}>
                        <ChevronDownIcon className="h-4 w-4 text-black-500" />
                      </Button>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      بررسی سفارش
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tbodyData.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {new Intl.NumberFormat("fa-IR").format(row.id)}{" "}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {row.firstname + " " + row.lastname}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {new Intl.NumberFormat("fa-IR", {
                            style: "currency",
                            currency: "IRR",
                          }).format(row.totalPrice)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {new Intl.DateTimeFormat("fa-IR").format(
                            row.createdAt
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            className="text-cyan-400 hover:text-cyan-700"
                            href="#"
                            onClick={() => {
                              editeOrderHandler(row);
                            }}
                          >
                            ویرایش سفارش
                          </a>
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

export default OrdersTable;
