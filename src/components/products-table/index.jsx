import React from "react";
import { toast } from "react-toastify";
import { deleteProductService } from "../../api/services/deleteProduct";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../states/slices/productsSlice";

function ProductsTable({
  tbodyData,
  categoryData,
  subcategoryData,
  setShowModal,
  setEditedItem,
  deleteProductHandler,
}) {
  const editeProductHandler = (item) => {
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
                      className="px-6 py-3 text-xs text-right font-bold text-gray-500 "
                    >
                      ردیف
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs text-right font-bold text-gray-500 "
                    >
                      نام کالا
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs text-right font-bold text-gray-500 "
                    >
                      قیمت کالا
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs text-right font-bold text-gray-500 "
                    >
                      دسته بندی
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500  "
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tbodyData.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-6 py-1 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {new Intl.NumberFormat("fa-IR").format(row.id)}
                        </td>
                        <td className="px-6 py-1 text-sm text-gray-800 whitespace-nowrap">
                          {row.name}
                        </td>
                        <td className="px-6 py-1 text-sm text-gray-800 whitespace-nowrap">
                          {new Intl.NumberFormat("fa-IR").format(row.price)}
                        </td>
                        <td className="px-6 py-1 text-sm text-gray-800 whitespace-nowrap">
                          {
                            categoryData?.find(
                              (item) => item.id === row.category
                            )?.name
                          }
                          &nbsp; / &nbsp;
                          {
                            subcategoryData?.find(
                              (item) => item.id === row.subcategory
                            )?.name
                          }
                        </td>
                        <td className="flex justify-between px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            className="text-cyan-400 hover:text-cyan-700"
                            href="#"
                            onClick={() => {
                              editeProductHandler(row);
                            }}
                          >
                            ویرایش
                          </a>
                          <a
                            className="text-pink-600 hover:text-pink-800"
                            href="#"
                            onClick={() => deleteProductHandler(row.id)}
                          >
                            حذف
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

export default ProductsTable;
