import React from "react";

function Button({type, className , children, onclick}) {
  return (
    <div>
      <button
        type={type}
        className={className}
        onClick={onclick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
