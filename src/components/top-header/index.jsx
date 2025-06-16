import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineArrowLeftEndOnRectangle,
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
  return <div className="hidden lg:flex justify-between px-4 pt-3 pb-0">
          {/* top header right */}
          <div>
            <ul className="flex justify-between gap-4">
              <li>
                <NavLink to={""}>
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
            </ul>
          </div>
          {/* top header left */}
          <div>
            <ul className="flex justify-between gap-4">
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
              <li>
                <NavLink to={""}>
                  <span>
                    <HiOutlineArrowLeftEndOnRectangle className="h-5 w-5" />
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>;
}
export default TopHeader;
