import React from "react";
import { Link } from "react-router-dom";

function HeaderManagmentList({ href, title, onclick, children }) {
  return (
    <li>
      <Link
        to={href}
        onClick={onclick}
        className="flex gap-2"
      >
        {children}
        <span className="text-gray-600">{title}</span>
      </Link>
    </li>
  );
}

export default HeaderManagmentList;
