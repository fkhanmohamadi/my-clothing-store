import React, { useState } from "react";
import QuantityTableTD from "../quantity-table-td";

function QuantityTable({
  tbodyData,
  editPriceArr,
  setEditPriceArr,
  editQuntityArr,
  setEditQuantityArr,
}) {
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
                      نام کالا
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs text-right font-bold text-left text-gray-500 uppercase "
                    >
                      قیمت
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      موجودی
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
                          {row.name}
                        </td>
                        <QuantityTableTD
                          key={row.id}
                          id={row.id}
                          value={row.price}
                          setEditProdect={setEditPriceArr}
                        >
                          {new Intl.NumberFormat("fa-IR", {
                            style: "currency",
                            currency: "IRR",
                          }).format(row.price)}
                        </QuantityTableTD>
                        <QuantityTableTD
                          key={row.id * 1000}
                          id={row.id}
                          value={row.quantity}
                          setEditProdect={setEditQuantityArr}
                        >
                          {new Intl.NumberFormat("fa-IR").format(row.quantity)}
                        </QuantityTableTD>
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

export default QuantityTable;
