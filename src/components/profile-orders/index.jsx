import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderService } from "../../api/services/orders";

function ProfieOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => {state.orders});
  const orderData = orders?.ordersData || [];

  useEffect(()=>{dispatch(fetchOrderService)},[])
  console.log(orderData)

  return <div></div>;
}

export default ProfieOrders;
