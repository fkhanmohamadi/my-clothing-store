import React from "react";

function CheckboxField({id, lable}) {
  return (
    <div className="flex items-center gap-1">
      <input
        id={id}
        name={id}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
        {lable}
      </label>
    </div>
  );
}

export default CheckboxField;
