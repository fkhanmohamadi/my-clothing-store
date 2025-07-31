import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useSelector } from "react-redux";

import {
  HiOutlineArrowRightEndOnRectangle,
  HiOutlineMoon,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi2";
import {
  IoHomeOutline,
  IoLanguageOutline,
  IoLocationOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import SearchSidebar from "../sidbar-search";

function TopHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);

  const [openSerach, setOpenSearch] = useState(false);

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
            <NavLink to={"/"}>
              <span>
                <IoHomeOutline className="text-orange-300 h-5 w-5" />
              </span>
            </NavLink>
          </li>
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
            <span onClick={() => setOpenSearch(true)}>
              <IoSearchOutline className="h-5 w-5" />
            </span>
            <SearchSidebar
              isOpen={openSerach}
              onClose={() => setOpenSearch(false)}
            />
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
            <NavLink to={"/admin"}>
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
              <Link
                to={"/profile"}
                data-tooltip-id="top-header-tooltip"
                data-tooltip-content="پنل کاربری"
              >
                <HiOutlineUser className="h-5 w-5 text-orange-300 cursor-pointer" />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default TopHeader;
