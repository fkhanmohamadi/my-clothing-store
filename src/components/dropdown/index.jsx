import React from "react";

function OptionField({ value, className, children }) {
  return (
    <option value={value} className={className}>
      {children}
    </option>
  );
}

export default OptionField;
