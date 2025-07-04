import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineBars4 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";

function MobileTopHeader({ navbar }) {
  return (
    <div className=" bg-white text-black">
      {/* TopHeader */}
      <div className="flex items-end justify-between h-22  pt-0.5 px-5 pb-1">
        <div className="pb-2">
          <NavLink to={""}>
            <span>
              <IoSearchOutline className=" h-5 w-5" />
            </span>
          </NavLink>
        </div>
        <div className="p-0 m-0">
          <NavLink to={""}>
            <img className="h-20 w-28" src="/FayraLogoB.png" alt="Logo" />
          </NavLink>
        </div>
        <div className="pb-2">
          <NavLink to={""}>
            <span>
              <MdOutlineFavoriteBorder className="h-5 w-5" />
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MobileTopHeader;
