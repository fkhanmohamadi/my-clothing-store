import React from "react";

function ListField({id, className, children}) {
  return (
      <li id={id} className={className}>
        {children}
      </li>
  );
}

export default ListField;
