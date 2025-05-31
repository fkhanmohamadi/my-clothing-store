import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCart({ product}) {

  const navigate = useNavigate();

    const ShowProductDetail = (e) => {
      navigate(`/product?id=${e.target.id}`);
    }


  return (
    <div key={product.id} id={product.id} className="group relative" onClick={ShowProductDetail}>
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={`http://localhost:3002/files/${product.image[0]}`}
          alt="product image"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          id={product.id}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700" id={product.id}>
              {product.name}
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900" id={product.id}>{product.price}</p>
      </div>
    </div>
  );
}

export default ProductCart;
