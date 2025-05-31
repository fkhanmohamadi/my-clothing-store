import React from "react";
import Button from "../button";
import { useDispatch } from "react-redux";
import { editOrderService } from "../../api/services/editOrder";
import { useForm } from "react-hook-form";
import { fetchOrders } from "../../states/slices/ordersSlice";

export default function OrderManagementModal({
  showModal,
  setShowModal,
  setEditedItem,
  editedItem,
  paginationParams,
}) {
  const dispatch = useDispatch();
  // console.log(editedItem);

  const products = editedItem ? editedItem.products : "";
  // console.log(products);

  const { handleSubmit } = useForm();

  const submitForm = async () => {
    const newOrder = {
      ...editedItem,
      deliveryTime: new Date().getTime(),
      delivered: "true",
    };
    // console.log(newOrder)

    try {
      const result = await editOrderService(editedItem.id, newOrder);
      dispatch(fetchOrders(paginationParams));
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-1/2 relative my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between py-2 px-4 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-l ">نمایش سفارش</h3>
                  <Button
                    className="p-1 border-0 text-red-500 text-xl"
                    onclick={() => {
                      setEditedItem(null);
                      setShowModal(false);
                    }}
                  >
                    x
                  </Button>
                </div>
                {/*body*/}
                <div className="relative px-6 py-4 flex-auto">
                  <form
                    className=" mt-2 space-y-2 flex flex-col text-sm"
                    onSubmit={handleSubmit(submitForm)}
                  >
                    <div className="flex flex-col space-y-5">
                      <div className="flex items-center gap-5">
                        <label htmlFor="name">نام مشتری</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          readOnly
                          value={
                            editedItem.firstname + " " + editedItem.lastname
                          }
                          className="w-min"
                        />
                      </div>
                      <div className="flex items-center gap-5">
                        <label htmlFor="address">آدرس</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          readOnly
                          value={editedItem.address}
                        />
                      </div>
                      <div className="flex items-center gap-5">
                        <label htmlFor="phone">موبایل</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          readOnly
                          value={editedItem.phone}
                        />
                      </div>
                      <div className="flex items-center gap-5">
                        <label htmlFor="createdAt">زمان ثبت سفارش</label>
                        <div id="createdAt">
                          {new Intl.DateTimeFormat("fa-IR").format(
                            editedItem.createdAt
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <label htmlFor="deliveryRequestTime">
                          زمان درخواست تحویل سفارش
                        </label>
                        <div id="deliveryRequestTime">
                          {new Intl.DateTimeFormat("fa-IR").format(
                            editedItem.createdAt
                          )}
                        </div>
                      </div>
                      <div>
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th>ردیف</th>
                              <th>نام کالا</th>
                              <th>قیمت</th>
                              <th>تعداد</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {products
                              ? products.map((product) => {
                                  return (
                                    <tr key={product.id}>
                                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {product.id}
                                      </td>
                                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {product.product}
                                      </td>
                                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {product.price}
                                      </td>
                                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {product.count}
                                      </td>
                                    </tr>
                                  );
                                })
                              : ""}
                          </tbody>
                        </table>
                      </div>
                      {editedItem.delivered == "true" ? (
                        <div className="flex gap-5">
                          <label>زمان تحویل سفارش</label>
                          <div id="deliveryRequestTime">
                            {new Intl.DateTimeFormat("fa-IR").format(
                              editedItem.deliveryTime
                            )}
                          </div>
                        </div>
                      ) : (
                        <Button
                          type="submit"
                          className="group relative flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          تحویل شد
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
