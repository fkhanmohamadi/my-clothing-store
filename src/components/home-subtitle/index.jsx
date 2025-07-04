import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi2";

function HomeSubTitle({ categoryName, linkName }) {
  return (
    <div className="flex justify-between items-center w-full text-gray-800">
      <h2 className="text-base sm:text-xl">
        {categoryName}
      </h2>
      <Link to={"/"} className="flex items-center gap-0.5">
        <span className="text-xs sm:text-base text-orange-200">
          {linkName}
        </span>
        <HiOutlineChevronLeft className="text-orange-200" />
      </Link>
    </div>
  );
}
export default HomeSubTitle;
