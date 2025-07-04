import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCart({ product}) {

  const navigate = useNavigate();

    const ShowProductDetail = (e) => {
      navigate(`/product?id=${e.target.id}`);
    }


  return (
    <div key={product.id} id={product.id} className="group relative p-1 " onClick={ShowProductDetail}>
      <div className=" group-hover:opacity-75 rounded-lg shadow-lg ">
        <img
          src={product.image}
          alt="product image"
          id={product.id}
        />
      </div>
      <div className="mt-4 flex flex-col md:flex-row gap-1 md:gap-0 justify-between">
        <div>
          <h3 className="text-xs md:text-sm text-gray-700" id={product.id}>
              {product.name}
          </h3>
        </div>
        <p className="text-xs md:text-sm text-gray-900" id={product.id}>{Number(product.price).toLocaleString('fa-IR')} تومان</p>
      </div>
    </div>
  );
}

export default ProductCart;
