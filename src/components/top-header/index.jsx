import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../states/slices/authSlice";

import {
  HiOutlineArrowLeftEndOnRectangle,
  HiOutlineArrowRightEndOnRectangle,
  HiOutlineMoon,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import {
  IoLanguageOutline,
  IoLocationOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";

function TopHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);

  const exitHandler = () => {
    dispatch(logoutUser());
  };

  const navigateHandler = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  return (
    <div className="hidden lg:flex justify-between px-4 pt-3 pb-0">
      <Tooltip id="top-header-tooltip" />
      {/* top header right */}
      <div>
        <ul className="flex justify-between gap-4">
          <li>
            <NavLink to={"/shopingcart"}>
              <span>
                <HiOutlineShoppingBag className=" h-5 w-5" />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to={""}>
              <span>
                <MdOutlineFavoriteBorder className=" h-5 w-5" />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to={""}>
              <span>
                <IoSearchOutline className="h-5 w-5" />
              </span>
            </NavLink>
          </li>
          {isLoggedIn && userInfo ? (
            <li>
              <span className="text-xs">سلام،{userInfo?.fName}</span>
            </li>
          ) : null}
        </ul>
      </div>
      {/* top header left */}
      <div>
        <ul className="flex justify-between gap-4">
          {isLoggedIn && userInfo?.role === "admin" && (
            <NavLink to={"/ordersmanagment"}>
              <span className="text-xs">پنل مدیریت</span>
            </NavLink>
          )}
          <li>
            <NavLink to={""}>
              <span>
                <IoLocationOutline className=" h-5 w-5" />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to={""}>
              <span>
                <IoLanguageOutline className=" h-5 w-5" />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to={""}>
              <span>
                <HiOutlineMoon className=" h-5 w-5" />
              </span>
            </NavLink>
          </li>
          {!isLoggedIn ? (
            // وقتی کاربر وارد نشده، دکمه ورود را نمایش بده
            <li>
              <span
                data-tooltip-id="top-header-tooltip"
                data-tooltip-content="ورود"
                onClick={navigateHandler}
              >
                <HiOutlineArrowRightEndOnRectangle className="h-5 w-5" />
              </span>
            </li>
          ) : (
            // وقتی وارد شده، دکمه خروج را نمایش بده
            <li>
              <span
                data-tooltip-id="top-header-tooltip"
                data-tooltip-content="خروج"
                onClick={exitHandler}
              >
                <HiOutlineArrowLeftEndOnRectangle className="h-5 w-5 cursor-pointer" />
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default TopHeader;
