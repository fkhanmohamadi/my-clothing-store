import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import SearchField from "../search-field"

export default function SearchSidebar({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const products = useSelector((state) => state.products);
  const productsData = products?.data?.productsData;

  const filteredProducts = productsData?.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">جستجو</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <IoCloseOutline  className="h-5 w-5"/>
        </button>
      </div>
      <div className="p-4">
        <SearchField
          placeholder="جستجو در نام محصول..."
          className="w-full border px-3 py-2 rounded text-gray-800"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="p-4 space-y-2 overflow-y-auto max-h-[70%]">
        {query.trim() === "" ? (
          <p className="text-gray-400 text-sm">
            لطفاً عبارتی برای جستجو وارد کنید
          </p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border p-2 rounded shadow-sm">
              <p className="font-medium">{product.name}</p>
            </div>
          ))
        ) : (
          <p className="text-red-400 text-sm">محصولی پیدا نشد</p>
        )}
      </div>
    </div>
  );
}
