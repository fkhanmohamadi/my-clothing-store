import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchField({placeholder, className, onchange}) {
  return (
    <div className="flex items-center justify-between bg-gray-100 py-1 px-2 rounded-lg">
      <div className="flex pointer">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      </div>
      <input
        type="text"
        className={className}
        placeholder={placeholder}
        onChange = {(e)=>onchange(e)}
      />
    </div>
  );
}

export default SearchField;
