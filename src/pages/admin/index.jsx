import React from "react";
import AdminHeader from "../../layout/admin-header";
import AdminStatistics from "../../layout/admin-Statistics";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Admin() {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);

  !isLoggedIn && navigate("/");
  
  return (
    <div className="container mx-auto mt-5 flex">
      <AdminHeader />
      <div className="flex flex-col flex-1 mx-5 gap-5">
        <AdminStatistics />
        <main className="w-full bg-white p-4 shadow-lg rounded text-sm text-gray-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Admin;
