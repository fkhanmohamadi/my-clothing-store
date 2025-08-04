import React from "react";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BiCategory, BiSolidCategory } from "react-icons/bi";
import { HiOutlineShoppingBag, HiShoppingBag } from "react-icons/hi2";
import { FaRegUser, FaUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function MobileNavbar() {
  return (
    <div className="flex w-full bg-white text-gray-600 border-t border-t-gray-300">
      <NavLink to={"/"} className="py-1 flex flex-col flex-auto items-center ">
        <div>
          <AiOutlineHome className="w-6 h-6" />
          <AiFillHome className="hidden w-6 h-6" />
        </div>
        <p className="text-base font-normal leading-7">خانه</p>
      </NavLink>
      <NavLink className="py-1 flex flex-col flex-auto items-center ">
        <div>
          <BiCategory className="w-6 h-6" />
          <BiSolidCategory className="hidden w-6 h-6" />
        </div>
        <p className="text-base font-normal leading-7">دسته بندی</p>
      </NavLink>
      <NavLink to={"/shopingcart"} className="py-1 flex flex-col flex-auto items-center ">
        <div>
          <HiOutlineShoppingBag className="w-6 h-6" />
          <HiShoppingBag className="hidden w-6 h-6" />
        </div>
        <p className="text-base font-normal leading-7">سبدخرید</p>
      </NavLink>
      <NavLink to={"/profile"} className="py-1 flex flex-col flex-auto items-center ">
        <div>
          <FaRegUser className="w-6 h-6" />
          <FaUser className="hidden w-6 h-6" />
        </div>
        <p className="text-base font-normal leading-7">پروفایل</p>
      </NavLink>
    </div>
  );
}

export default MobileNavbar;
