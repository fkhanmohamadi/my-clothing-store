import React from "react";
import ImageField from "../../components/img";
import {
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  RectangleGroupIcon,
  TruckIcon,
  UsersIcon,
  HomeIcon
} from "@heroicons/react/24/outline";
import HeaderManagmentList from "../../components/header-mangment-list";
import { useNavigate } from "react-router-dom";

function HeaderManagment() {

 const navigate = useNavigate() 

const handlelogout =()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  navigate('/login')
}

  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 bg-white mx-5 my-2 shadow-lg w-60">
          <div className="flex flex-col items-center space-y-2 pb-10 border-b border-gray-200">
            <div className="w-20 h-20 flex items-center justify-center border border-gray-200 p-2 rounded-full shadow-lg">
              <ImageField
                className="mx-auto h-12 w-auto"
                src="./logo-2.gif"
                alt="logo"
              />
            </div>
            <h2 className="text-lg font-bold text-gray-600">پنل مدیریت</h2>
          </div>
          <div className="flex-1">
            <ul className="flex flex-col gap-5 py-4 text-sm border-b border-gray-200">
              <HeaderManagmentList href="/homemanagment" title="خانه">
                <HomeIcon className="h-5 w-5 text-pink-600" />
              </HeaderManagmentList>
              <HeaderManagmentList href="/ordersmanagment" title="مدیریت سفارش ها">
                <TruckIcon className="h-5 w-5 text-pink-600" />
              </HeaderManagmentList>
              <HeaderManagmentList href="/productmanagment" title="مدیریت کالا ها">
                <RectangleGroupIcon className="h-5 w-5 text-pink-600" />
              </HeaderManagmentList>
              <HeaderManagmentList href="/quantitymanagement" title="مدیریت انبار">
                <BanknotesIcon className="h-5 w-5 text-pink-600" />
              </HeaderManagmentList>
              <HeaderManagmentList href="#" title="مدیریت کاربران">
                <UsersIcon className="h-5 w-5 text-pink-600" />
              </HeaderManagmentList>
            </ul>
            <ul className="flex flex-col gap-5 py-4 text-sm ">
              <HeaderManagmentList href="#" title="تنظیمات">
                <Cog6ToothIcon className="h-5 w-5 text-pink-600" />
              </HeaderManagmentList>
              <HeaderManagmentList href="" onclick={handlelogout} title="خروج">
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-pink-600" />
              </HeaderManagmentList>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default HeaderManagment;
