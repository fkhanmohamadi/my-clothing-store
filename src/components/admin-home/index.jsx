import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; // برای فرمت تاریخ
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = payload[0].value;
    return (
      <div className="bg-white border p-2 rounded shadow text-sm">
        <p>تاریخ: {label}</p>
        <p>مبلغ کل: {Number(total).toLocaleString("fa-IR")} تومان</p>
      </div>
    );
  }

  return null;
};

function groupOrdersByDate(orders) {
  const grouped = {};

  orders.forEach((order) => {
    const date = dayjs(order.createdAt).calendar("jalali").format("YYYY-MM-DD");

    if (!grouped[date]) {
      grouped[date] = 0;
    }
    grouped[date] += Number(order.totalPrice);
  });

  return Object.entries(grouped).map(([date, total]) => ({
    date,
    total,
  }));
}

function AdminHome() {
  ////// order
  const orders = useSelector((state) => state.orders);
  const ordersData = orders?.data?.ordersData || [];
  const ordersCount = orders?.data?.count || 0;

  const chartData = groupOrdersByDate(ordersData);

  return (
    <div className="w-full h-80">
      <h2 className="text-xl font-semibold mb-4">نمودار فروش روزانه</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) => Number(value).toLocaleString("fa-IR")}
          />
          <Tooltip content={<CustomTooltip />} />{" "}
          <Line type="monotone" dataKey="total" stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AdminHome;
