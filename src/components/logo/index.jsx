import React  from "react";
import {Link } from "react-router-dom";

function Logo ({ isMenuHovered }) {
  return (
    <div>
      <h1 className="hidden lg:block text-center mb-1 leading-0">
        <Link className="inline-block -mt-5" to={""}>
          <img
            className="h-20 w-28"
            src={isMenuHovered ? "/FayraLogoB.png" : "/FayraLogoW.png"}
            alt="Logo"
          />
        </Link>
      </h1>
    </div>
  );
}

export default Logo;