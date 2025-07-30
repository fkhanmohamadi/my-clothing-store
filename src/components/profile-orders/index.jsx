import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../states/slices/ordersSlice";
import { fetchUsers } from "../../states/slices/userSlice";
import ProfileOrdersTable from "../profile-order-table";
import Pagination from "../pagination";
import RadioField from "../radio-field";

function ProfieOrders() {
  const dispatch = useDispatch();

  ////// user
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.id || 0;

  ////// order
  const orders = useSelector((state) => state.orders);
  const ordersData = orders?.data?.ordersData || [];
  const ordersCount = orders?.data?.count || 0;

  // pagination & filters state
  const [currentPage, setCurrentPage] = useState(1);
  const [delivered, setDelivered] = useState("false");

  const ordersPerPage = 5;
  const totalPages = Math.ceil(ordersCount / ordersPerPage);

  const getParams = () => {
    const params = {
      _page: currentPage,
      _limit: ordersPerPage,
      delivered,
      _sort: "createdAt",
      _order: "desc",
      userId,
    };
    return params;
  };

  useEffect(() => {
    dispatch(fetchOrders(getParams()));
    dispatch(fetchUsers());
  }, [dispatch, currentPage, delivered]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeliveredChange = (e) => {
    setDelivered(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col flex-1 mx-5 gap-5">
      <div className="flex justify-between">
        <RadioField onchanged={handleDeliveredChange} delivered={delivered} />
      </div>

      {ordersData && (
        <>
          <ProfileOrdersTable tbodyData={ordersData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default ProfieOrders;
