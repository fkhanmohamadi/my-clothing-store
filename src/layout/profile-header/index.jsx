import React from "react";
import ImageField from "../../components/img";
import { IoLogOutOutline, IoHomeOutline } from "react-icons/io5";
import { RiListUnordered } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { FaRegAddressCard } from "react-icons/fa6";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";

import HeaderManagmentList from "../../components/header-mangment-list";
import { logoutUser } from "../../states/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function ProfileHeader() {
  const dispatch = useDispatch();
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex">
      <div className="flex flex-col p-3 bg-white mx-5 shadow-lg w-60">
        <div className="flex flex-col items-center space-y-2 pb-10 border-b border-gray-200">
          <div className="w-20 h-20 flex items-center justify-center border border-gray-200 p-2 rounded-full shadow-lg">
            <ImageField
              className="mx-auto h-12 w-auto"
              src="/FayraLogoB.png"
              alt="logo"
            />
          </div>
          <h2 className="text-lg font-bold text-gray-600">
            {userInfo.fName + " " + userInfo.lName}
          </h2>
        </div>
        <div className="flex-1">
          <ul className="flex flex-col gap-5 py-4 text-sm border-b border-gray-200">
            <HeaderManagmentList href="profilehome" title="خانه">
              <IoHomeOutline className="h-5 w-5 text-orange-300" />
            </HeaderManagmentList>
            <HeaderManagmentList href="profileorder" title="لیست سفارش ها">
              <RiListUnordered className="h-5 w-5 text-orange-300" />
            </HeaderManagmentList>
            <HeaderManagmentList
              href="/productmanagment"
              title="درخواست مرجوعی"
            >
              <GiReturnArrow className="h-5 w-5 text-orange-300" />
            </HeaderManagmentList>
            <HeaderManagmentList
              href="/quantitymanagement"
              title="لیست آدرس ها"
            >
              <FaRegAddressCard className="h-5 w-5 text-orange-300" />
            </HeaderManagmentList>
            <HeaderManagmentList href="#" title="ویرایش اطلاعات کاربری">
              <LiaUserEditSolid className="h-5 w-5 text-orange-300" />
            </HeaderManagmentList>
          </ul>
          <ul className="flex flex-col gap-5 py-4 text-sm ">
            <HeaderManagmentList href="#" title="تنظیمات">
              <IoSettingsOutline className="h-5 w-5 text-orange-300" />
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

export default ProfileHeader;
