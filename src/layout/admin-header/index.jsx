import React from "react";
import ImageField from "../../components/img";
import HeaderManagmentList from "../../components/header-mangment-list";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline, IoHomeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbBuildingWarehouse } from "react-icons/tb";
import { logoutUser } from "../../states/slices/authSlice";
import { useDispatch } from "react-redux";

function AdminHeader() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
   dispatch(logoutUser());
  };

  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 bg-white mx-5 my-2 shadow-lg w-60">
        <div className="flex flex-col items-center space-y-2 pb-10 border-b border-gray-200">
          <div className="w-20 h-20 flex items-center justify-center border border-gray-200 p-2 rounded-full shadow-lg">
            <Link to={"/"}>
              <ImageField
                className="mx-auto h-12 w-auto"
                src="/FayraLogoB.png"
                alt="logo"
              />
            </Link>
          </div>
          <h2 className="text-lg font-bold text-gray-600">پنل مدیریت</h2>
        </div>
        <div className="flex-1">
          <ul className="flex flex-col gap-5 py-4 text-sm border-b border-gray-200">
            <HeaderManagmentList href="adminhome" title="صفحه اصلی">
              <IoHomeOutline className="h-5 w-5 text-pink-600" />
            </HeaderManagmentList>
            <HeaderManagmentList
              href="adminordersmanagment"
              title="مدیریت سفارش ها"
            >
              <HiOutlineShoppingBag className="h-5 w-5 text-pink-600" />
            </HeaderManagmentList>
            <HeaderManagmentList
              href="adminproductmanagment"
              title="مدیریت کالا ها"
            >
              <AiFillProduct className="h-5 w-5 text-pink-600" />
            </HeaderManagmentList>
            <HeaderManagmentList
              href="adminquantitymanagement"
              title="مدیریت انبار"
            >
              <TbBuildingWarehouse className="h-5 w-5 text-pink-600" />
            </HeaderManagmentList>
            <HeaderManagmentList href="#" title="مدیریت کاربران">
              <HiOutlineUsers className="h-5 w-5 text-pink-600" />
            </HeaderManagmentList>
          </ul>
          <ul className="flex flex-col gap-5 py-4 text-sm ">
            <HeaderManagmentList href="#" title="تنظیمات">
              <IoSettingsOutline className="h-5 w-5 text-pink-600" />
            </HeaderManagmentList>
            <HeaderManagmentList href="" onclick={logoutHandler} title="خروج">
              <IoLogOutOutline className="h-5 w-5 text-pink-600" />
            </HeaderManagmentList>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
