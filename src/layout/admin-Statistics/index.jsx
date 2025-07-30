import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatisticsList from "../../components/statistics-list";
import { fetchProducts } from "../../states/slices/productsSlice";
import { fetchOrders } from "../../states/slices/ordersSlice";
import { fetchUsers } from "../../states/slices/userSlice";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";

function AdminStatistics() {
  const dispatch = useDispatch();

  ////// Products
  const allProducts = useSelector((store) => store.products);
  const productsCount = allProducts?.data?.count || 0;

  ////// ordes
  const allOrders = useSelector((store) => store.orders);
  const ordersCount = allOrders?.data?.count || 0;

  ////// users
  const allUsers = useSelector((store) => store.user);
  const usersCount = allUsers?.data?.count || 0;

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
        <StatisticsList title="تعداد کاربران" count={usersCount}>
          <HiOutlineUsers className="w-5 h-5 text-cyan-400" />
        </StatisticsList>
        <StatisticsList title="تعداد کالاها" count={productsCount}>
          <AiFillProduct className="w-5 h-5 text-cyan-400" />
        </StatisticsList>
        <StatisticsList title="تعداد سفارشات" count={ordersCount}>
          <HiOutlineShoppingBag className="w-5 h-5 text-cyan-400" />
        </StatisticsList>
      </div>
    </div>
  );
}

export default AdminStatistics;
