import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../states/slices/ordersSlice";
import { fetchUsers } from "../../states/slices/userSlice";
import OrdersTable from "../orders-table";
import Pagination from "../pagination";
import RadioField from "../radio-field";
import SearchField from "../search-field";
import OrderManagementModal from "../order-mangement-modal";

function AdminOrdersManagment() {
  const dispatch = useDispatch();

  // get orders from redux
  const { data, status } = useSelector((state) => state.orders);
  const orders = data?.ordersData || [];
  const ordersCount = data?.count || 0;

  // get users from redux
  const users = useSelector((state) => state.user);
  const userData = users?.data?.usersData || [];

  // pagination & filters state
  const [currentPage, setCurrentPage] = useState(1);
  const [delivered, setDelivered] = useState("false");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const ordersPerPage = 3;
  const totalPages = Math.ceil(ordersCount / ordersPerPage);

  const getParams = () => {
    const params = {
      _page: currentPage,
      _limit: ordersPerPage,
      delivered,
      _sort: "createdAt",
      _order: sortOrder,
    };
    if (searchTerm.trim()) {
      params.userFullName_like = searchTerm.trim();
    }
    return params;
  };

  useEffect(() => {
    dispatch(fetchOrders(getParams()));
    dispatch(fetchUsers());
  }, [dispatch, currentPage, delivered, sortOrder, searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeliveredChange = (e) => {
    setDelivered(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const [showModal, setShowModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  return (
    <div className="flex flex-col flex-1 mx-5 gap-5">
      <div className="flex justify-between">
        <SearchField
          className="p-1 w-96 text-sm bg-transparent outline-0"
          placeholder="جستجو ..."
          onchange={handleSearchChange}
        />
        <RadioField onchanged={handleDeliveredChange} delivered={delivered} />
      </div>

      {status === "success" && (
        <>
          <OrdersTable
            tbodyData={orders}
            orderSortHandler={handleSortChange}
            setShowModal={setShowModal}
            setEditedItem={setEditedItem}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <OrderManagementModal
        showModal={showModal}
        setShowModal={setShowModal}
        editedItem={editedItem}
        setEditedItem={setEditedItem}
        userData = {userData}
        paginationParams={getParams()}
      />
    </div>
  );
}

export default AdminOrdersManagment;
