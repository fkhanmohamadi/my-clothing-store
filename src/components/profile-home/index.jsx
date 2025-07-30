import React from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlinePhone } from "react-icons/hi2";
import { useSelector } from "react-redux";

function ProfileHome() {
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col gap-y-5 ">
      <h3 className=" text-base text-gray-800">اطلاعات پروفایل کاربری</h3>
      <div className="flex gap-x-1 items-center">
        <span >
          <HiOutlineUser className="h-5 w-5 text-orange-300"/>
        </span>
        <p>{userInfo.fName + " " + userInfo.lName}</p>
      </div>
      <div className="flex gap-x-1 items-center">
        <span>
          <HiOutlinePhone className="h-5 w-5 text-orange-300"/>
        </span>
        <p>{userInfo.phone}</p>
      </div>
      <div className="flex gap-x-1 items-center">
        <span>
          <IoLocationOutline className="h-5 w-5 text-orange-300"/>
        </span>
        <p>{userInfo.address}</p>
      </div>
    </div>
  );
}

export default ProfileHome;
