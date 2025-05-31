import React from "react";

function LinkFiled({href, className, children}) {
  return (
    <div>
      <a href={href} className={className}>
        {children}
      </a>
    </div>
  );
}

export default LinkFiled;
