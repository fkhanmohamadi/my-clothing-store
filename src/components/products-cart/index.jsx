import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProductCart from "../product-cart"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../../states/slices/productsSlice";
  
  export default function ProductsCart() {

    const products = useSelector((store) => store.products);

    
    const [paginationParams, setPaginationParams] = useSearchParams({
      _page: 1,
      _limit: 8,
    });
    
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(fetchProducts(paginationParams));
    }, []);
    
  
    return (
      <div className="bg-gray-100 mt-12">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">پرفروشترین محصولات</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.data.productsData?.map((product) => (
            <ProductCart key={product.id} id={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    )
  }
  