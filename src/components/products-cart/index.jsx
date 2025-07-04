import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCart from "../product-cart";
import HomeSubTitle from "../home-subtitle";
import { useSearchParams } from "react-router-dom";
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
    <section className="mt-8">
      <div className="container mx-auto p-4">
        <HomeSubTitle
          categoryName={"پرفروشترین محصولات"}
          linkName={"مشاهده همه"}
        />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 lg:gap-x-8">
          {products.data.productsData?.map((product) => (
            <ProductCart key={product.id} id={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
