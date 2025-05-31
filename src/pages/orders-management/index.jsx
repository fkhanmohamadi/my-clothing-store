import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import OrdersTable from "../../components/orders-table";
import Pagination from "../../components/pagination";
import RadioField from "../../components/radio-field";
import SearchField from "../../components/search-field";
import HeaderManagment from "../../layout/header-managment";
import Statistics from "../../layout/Statistics";
import { fetchOrders } from "../../states/slices/ordersSlice";
import OrderManagementModal from "../../components/order-mangement-modal";

function OrdersManagment() {
  const orders = useSelector((store) => store.orders);
  const ordersCount = useSelector((store) => store.orders.data.count);

  const dispatch = useDispatch();

  const [active, setActive] = useState("1");
  const [delivered, setDelivered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const [paginationParams, setPaginationParams] = useSearchParams({
    _page: 1,
    _limit: 5,
    delivered,
  });

  useEffect(() => {
    dispatch(fetchOrders(paginationParams));
  }, []);

  useEffect(() => {
    dispatch(fetchOrders(paginationParams));
  }, [paginationParams]);

  const searchHandler = (e) => {
    if (e.target.value==""){
      setPaginationParams({
        _page: 1,
        _limit: 5,
        delivered,
      });
      dispatch(fetchOrders(paginationParams));
    }

    else{
      setPaginationParams({
        _page: 1,
        _limit: 5,
        delivered,
        firstname: e.target.value,
      });
      dispatch(fetchOrders(paginationParams));
    }
  };

  const handelDeliveredChenge = (e) => {
    setDelivered(e.target.value === "true" ? true : false);
    setPaginationParams({ _page: 1, _limit: 5, delivered: e.target.value });
  };

  const HandelSort = () => {
    setPaginationParams({
      _page: 1,
      _limit: 5,
      delivered,
      _sort: "createdAt",
      _order: "desc"
    });
    dispatch(fetchOrders(paginationParams));
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  return (
    <div className="flex">
      <HeaderManagment />
      <div className="flex flex-col flex-1 mx-5 gap-5">
        <Statistics />
        <div className="flex justify-between">
          <SearchField
            className="p-1 w-96 text-sm bg-transparent outline-0"
            placeholder="جستجو ..."
            onchange={searchHandler}
          />
          <RadioField onchanged={handelDeliveredChenge} delivered={delivered} />
        </div>
        {orders.status === "success" ? (
          <OrdersTable
            tbodyData={orders.data.ordersData}
            onclick={HandelSort}
            setShowModal={setShowModal}
            setEditedItem ={setEditedItem}
          />
        ) : (
          ""
        )}
        <Pagination
          paginationParams={paginationParams}
          setPaginationParams={setPaginationParams}
          count={ordersCount}
          active={active}
          setActive={setActive}
          
        />
          <OrderManagementModal
          showModal={showModal}
          setShowModal={setShowModal}
          editedItem = {editedItem}
          setEditedItem = {setEditedItem}
          paginationParams={paginationParams}
        />
      </div>
    </div>
  );
}

export default OrdersManagment;
