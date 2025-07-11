import React from "react";
import { Link } from "react-router-dom";

function ProductCart({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative p-1 block"
    >
      <div className="group-hover:opacity-75 rounded-lg shadow-lg">
        <img
          src={product.image}
          alt="product image"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="mt-4 flex flex-col md:flex-row gap-1 md:gap-0 justify-between">
        <h3 className="text-xs md:text-sm text-gray-700">
          {product.name}
        </h3>
        <p className="text-xs md:text-sm text-gray-900">
          {Number(product.price).toLocaleString('fa-IR')} تومان
        </p>
      </div>
    </Link>
  );
}

export default ProductCart;
