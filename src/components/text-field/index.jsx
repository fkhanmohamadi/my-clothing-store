import React from "react";

function TextField({
  id,
  lable,
  type,
  className,
  placeholder,
  error,
  validation
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id}>{lable}</label>
      <input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        {...validation}
      />
      <p>{error}</p>
    </div>
  );
}

export default TextField;
