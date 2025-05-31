import React from "react";

function FileField({ id, lable, name, multiple, error, validation }) {
  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor={id}>{lable}</label>
      <input id={id} name={name} multiple type="file" {...validation} />
      <p>{error}</p>
    </div>
  );
}

export default FileField;
