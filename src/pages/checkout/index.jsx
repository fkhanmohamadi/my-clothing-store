import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header";
import Services from "../../components/services";
import Footer from "../../layout/footer";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlinePhone } from "react-icons/hi2";
import { IoMdCheckboxOutline } from "react-icons/io";
import { addToOrders } from "../../states/slices/ordersSlice";
import { removeFromCart } from "../../states/slices/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [orderData, setOrderData] = useState(null);
  const cartItems = orderData?.cartItems || [];

  useEffect(() => {
    const storedData = localStorage.getItem("checkoutData");
    if (storedData) {
      setOrderData(JSON.parse(storedData));
    }
  }, []);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((sum, i) => sum + Number(i.price) * Number(i.count), 0),
    [orderData]
  );

  const handleOrderSubmit = async () => {
    try {
      const ordersData = {
        userId: userInfo.id,
        products: cartItems,
        totalPrice: totalPrice,
        createdAt: Date.now(),
        deliveryRequestTime: Date.now() + 24 * 60 * 60 * 1000,
        deliveryTime: null,
        delivered: false,
      };

      const resultAction = dispatch(addToOrders(ordersData));

      for (let item of cartItems) {
        dispatch(removeFromCart(item.id));
      }
      
      localStorage.removeItem("checkoutData");

      navigate("/paymentresultsuccess");
    } catch (error) {
      console.error("خطا در ثبت سفارش:", error);
    }
  };

  return (
    <>
      <Header lineMenu={1} />
      <main className="container mx-auto mt-20 text-gray-800">
        {/*title*/}
        <div className="flex gap-2 items-center mb-5">
          <span>
            <IoMdCheckboxOutline className=" h-5 w-5" />
          </span>
          <h2 className="text-xl tracking-tighter">تسویه حساب</h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {/*****************************************/}
          <div className="col-span-8 ">
            {/* order Info */}
            <div className="col-span-8 rounded">
              {cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 border-t border-t-gray-300 p-4"
                >
                  <div className="col-span-3 rounded">
                    <img
                      src={item.image}
                      alt="product image"
                      className="h-20"
                    />
                  </div>
                  <div className="col-span-6 flex flex-col justify-between rounded">
                    <div className="flex flex-col gap-y-1">
                      <p className="font-semibold">{item.productname}</p>
                      <p>{Number(item.price).toLocaleString("fa-IR")} تومان</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="flex flex-col gap-y-1">
                      <p className="font-semibold">{item.count} عدد</p>
                      <span>
                        {(item.price * item.count).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*****************************************/}
          <div className="col-span-4 space-y-4">
            {/* User Info */}
            <div className="flex flex-col gap-y-2 bg-white p-4 shadow rounded text-sm text-gray-500">
              <h3 className=" text-base text-gray-800">اطلاعات خریدار:</h3>
              <div className="flex gap-x-1 items-center">
                <span>
                  <HiOutlineUser />
                </span>
                <p>{userInfo.fName + " " + userInfo.lName}</p>
              </div>
              <div className="flex gap-x-1 items-center">
                <span>
                  <HiOutlinePhone />
                </span>
                <p>{userInfo.phone}</p>
              </div>
              <div className="flex gap-x-1 items-center">
                <span>
                  <IoLocationOutline />
                </span>
                <p>{userInfo.address}</p>
              </div>
            </div>
            {/* Payment Info */}
            <div className="flex flex-col bg-white p-2 shadow rounded">
              <div className="flex justify-between items-center text-center text-sm text-gray-500 py-2 border-b border-b-gray-200">
                <span>قیمت کل سفارش:</span>
                <div>
                  <span>{totalPrice?.toLocaleString("fa-IR")}</span>
                  <span>تومان </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-center text-sm text-gray-500 py-2 border-b border-b-gray-200">
                <span>هزینه بسته بندی:</span>
                <div>
                  <span>{orderData?.packaging.toLocaleString("fa-IR")}</span>
                  <span>تومان </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-center text-sm text-gray-500 py-2 border-b border-b-gray-200">
                <span>هزینه ارسال:</span>
                <div>
                  <span>{orderData?.shipping.toLocaleString("fa-IR")}</span>
                  <span>تومان </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-center text-base text-gray-800 py-2 border-b border-b-gray-200">
                <span>قیمت قابل پرداخت:</span>
                <div>
                  <span>
                    {(
                      totalPrice +
                      orderData?.packaging +
                      orderData?.shipping
                    ).toLocaleString("fa-IR")}
                  </span>
                  <span>تومان </span>
                </div>
              </div>
              <button
                onClick={handleOrderSubmit}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                پرداخت و ثبت سفارش
              </button>
            </div>
          </div>
        </div>
        {/*****************************************/}
      </main>
      <Services />
      <Footer />
    </>
  );
}

export default Checkout;
