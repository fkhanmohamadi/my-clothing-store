import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  updateCartItem,
} from "../../states/slices/cartSlice";
import { fetchProducts } from "../../states/slices/productsSlice";
import { fetchColors } from "../../states/slices/colorsSlise";
import { fetchSizes } from "../../states/slices/sizesSlise";
import Header from "../../layout/header";
import Services from "../../components/services";
import Footer from "../../layout/footer";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const packaging = 10000;
  const shipping = 50000;

  ////// user
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.id || 0;

  ////// cart
  const cart = useSelector((state) => state.cart);
  const cartData = cart?.data?.cartData || [];

  ////// Products
  const allProducts = useSelector((store) => store.products);
  const allProductsData = allProducts?.data?.productsData || [];

  ////// Colors
  const colors = useSelector((store) => store.colors);
  const colorsData = colors?.data?.colorsData || [];

  ////// Sizes
  const sizes = useSelector((store) => store.sizes);
  const sizesData = sizes?.data?.sizesData || [];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

    const getParams = () => {
    const params = {
      _sort: "createdAt",
      _order: "desc",
    };
    return params;
  };

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchSizes());
    dispatch(fetchProducts(getParams()));
  }, []);

  const cartItems = useMemo(() => {
    const userItems = cartData.filter((item) => item.userid === userId);

    return userItems.map((item) => {
      const product = allProductsData.find((p) => p.id === item.productid);
      return {
        ...item,
        image: product?.image,
      };
    });
  }, [cartData, userId, allProductsData]);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((sum, i) => sum + Number(i.price) * Number(i.count), 0),
    [cartItems]
  );

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (item, count) => {
    if (count < 1) return;
    dispatch(updateCartItem({ ...item, count }));
  };

  const handleSubmitOrderData = () => {
    const orderInfo = {
      userId,
      cartItems,
      packaging,
      shipping,
      total: totalPrice + packaging + shipping,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("checkoutData", JSON.stringify(orderInfo));

    navigate("/checkout");
  };

  return (
    <>
      <Header lineMenu={1} />
      {cart?.status === "pending" ? (
        <p className="text-center mt-10">در حال بارگذاری...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center mt-25">سبد خرید شما خالی است.</p>
      ) : (
        <main className="container mx-auto text-gray-800 mt-25 lg:mb-20">
          {/*title*/}
          <div className="flex gap-2 items-center mb-5 p-2">
            <span>
              <HiOutlineShoppingBag className=" h-5 w-5" />
            </span>
            <h2 className="text-xl tracking-tighter">سبد خرید شما</h2>
          </div>
          {/*body*/}
          <div className="grid lg:grid-cols-12 gap-10">
            {/*Cart Item*/}
            <div className="lg:col-span-8 rounded">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 border-t border-t-gray-300 p-4"
                >
                  <div className="col-span-4 lg:col-span-3 rounded">
                    <img
                      src={item.image}
                      alt="product image"
                      className="h-40"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6 flex flex-col justify-between rounded">
                    <div className="flex flex-col gap-y-1">
                      <p className="font-semibold">{item.productname}</p>
                      <p className="text-sm text-gray-500">
                        رنگ:
                        {
                          colorsData?.find((color) => {
                            return color.id == item.colorId;
                          })?.fname
                        }
                        | سایز:
                        {
                          sizesData?.find((size) => {
                            return size.id == item.sizeId;
                          })?.name
                        }
                      </p>
                      <p>{Number(item.price).toLocaleString("fa-IR")} تومان</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item, item.count - 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.count}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item, item.count + 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-3 flex flex-col justify-between items-end rounded">
                    <span>
                      {(item.price * item.count).toLocaleString("fa-IR")} تومان
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/*Peyment Info*/}
            <div className="lg:col-span-4">
              <div className="flex flex-col bg-gray-50 rounded-md p-4">
                <p>خلاصه سفارش</p>
                <div className="flex justify-between items-center text-center text-sm text-gray-500 py-5 border-b border-b-gray-200">
                  <span>قیمت کل سفارش:</span>
                  <div>
                    <span>{totalPrice?.toLocaleString("fa-IR")}</span>
                    <span>تومان </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-center text-sm text-gray-500 py-5 border-b border-b-gray-200">
                  <span>هزینه بسته بندی:</span>
                  <div>
                    <span>{packaging.toLocaleString("fa-IR")}</span>
                    <span>تومان </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-center text-sm text-gray-500 py-5 border-b border-b-gray-200">
                  <span>هزینه ارسال:</span>
                  <div>
                    <span>{shipping.toLocaleString("fa-IR")}</span>
                    <span>تومان </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-center text-base text-gray-800 py-5 border-b border-b-gray-200">
                  <span>قیمت قابل پرداخت:</span>
                  <div>
                    <span>
                      {(totalPrice + packaging + shipping).toLocaleString(
                        "fa-IR"
                      )}
                    </span>
                    <span>تومان </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSubmitOrderData}
                  className="group mt-2 relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  ثبت و مرحله بعد
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      <Services />
      <Footer />
    </>
  );
}
