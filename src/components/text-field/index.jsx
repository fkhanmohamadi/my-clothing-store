import React from "react";

function TextField({
  id,
  lable,
  name,
  type,
  className,
  placeholder,
  error,
  validation
}) {
  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor={id}>{lable}</label>
      <input
        id={id}
        name={name}
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
