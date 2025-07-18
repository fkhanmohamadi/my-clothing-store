import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StarIcon } from "@heroicons/react/20/solid";

import { fetchColors } from "../../states/slices/colorsSlise";
import { fetchSizes } from "../../states/slices/sizesSlise";
import { fetchProducts } from "../../states/slices/productsSlice";
import { addToCart } from "../../states/slices/cartSlice";
import { colorClassMap } from "../../constants/colorMaps";

import Header from "../../layout/header";
import Footer from "../../layout/footer";
import Services from "../../components/services";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  ////// Products
  const allProducts = useSelector((store) => store.products);
  const allProductsData = allProducts?.data?.productsData || [];

  ////// Colors
  const colors = useSelector((store) => store.colors);
  const colorsData = colors?.data?.colorsData || [];

  ////// Sizes
  const sizes = useSelector((store) => store.sizes);
  const sizesData = sizes?.data?.sizesData || [];

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchColors());
    dispatch(fetchSizes());
  }, [dispatch]);

  const product = useMemo(() => {
    return allProductsData.find((p) => p.id === Number(id));
  }, [allProductsData, id]);

  const productVariants = useMemo(() => {
    return product?.variants?.filter((v) => v.quantity > 0);
  }, [product]);

  const availableColors = useMemo(() => {
    const colorIds = [...new Set(productVariants?.map((v) => v.colorId))];
    return colorIds.map((id) => colorsData.find((c) => c.id === id));
  }, [product, colorsData]);

  const availableSizes = useMemo(() => {
    const sizeIds = [...new Set(productVariants?.map((v) => v.sizeId))];
    return sizeIds.map((id) => sizesData.find((s) => s.id === id));
  }, [product, sizesData]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedColor = watch("colorId");
  const selectedSize = watch("sizeId");

  useEffect(() => {
    if (availableColors.length && availableSizes.length) {
      reset({
        colorId: availableColors[0]?.id,
        sizeId: availableSizes[0]?.id,
      });
    }
  }, [availableColors, availableSizes, reset]);

  const onSubmit = (data) => {
    dispatch(
      addToCart({
        userid: 1,
        product: {
          productid: product.id,
          productname: product.name,
          colorId: Number(data.colorId),
          sizeId: Number(data.sizeId),
          price: product.price,
          count: 1,
        },
      })
    );
    console.log("فرم ارسال شد:", data);

    toast.success("✅ محصول به سبد خرید اضافه شد");
  };

  if (!product) return <div className="p-4">در حال بارگذاری...</div>;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <Header lineMenu={1} />
      <main className="container mx-auto mt-16 bg-white">
        <ToastContainer />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-4 p-4 ">
          {/* Image gallery */}
          <div className="px-2 flex justify-center">
            <img alt="product images" src={product.image} />
          </div>
          {/* Product info */}
          <div className="flex flex-col lg:border-r lg:border-gray-200 lg:pr-8">
            {/* product name */}
            <h1 className="text-2xl sm:text-3xl tracking-tight text-gray-900 p-2">
              {product.name}
            </h1>

            {/* Description */}
            <div>
              <p className="text-sm text-gray-500 text-justify mt-4">
                {product.description}
              </p>
            </div>
            {/* Highlights */}
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">ویژگی‌ها</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-1 pr-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight.id} className="text-gray-400">
                      <span className="text-gray-600">{highlight.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Details */}
            <div className="mt-10">
              <h2 className="text-lg font-medium text-gray-900">مشخصات</h2>

              <div className="mt-4">
                <p className="text-sm text-gray-600 text-justify">
                  {product.details}
                </p>
              </div>
            </div>
          </div>
          {/* Product Add to bag */}
          <div className="border-t lg:border-t-0 lg:border-r border-gray-200 lg:pr-8">
            {/* product price */}
            <p className="text-2xl sm:text-3xl tracking-tight text-gray-900 p-2">
              {Number(product.price).toLocaleString("fa-IR")} تومان
            </p>
            {/* Reviews */}
            <div className="mt-6">
              <div className="flex gap-x-5 items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        product.reviews.average > rating
                          ? "text-yellow-400"
                          : "text-gray-200",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <Link
                  to={product.reviews.href}
                  className=" text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {product.reviews.totalCount} نقد و بررسی‌
                </Link>
              </div>
            </div>
            <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">رنگ</h3>
                <div className="flex items-center gap-x-3 mt-4">
                  {availableColors?.map((color) =>
                    color ? (
                      <div
                        key={color.id}
                        className="flex rounded-full outline -outline-offset-1 outline-black/10"
                      >
                        <input
                          {...register("colorId")}
                          value={color.id}
                          checked={Number(selectedColor) === color.id}
                          type="radio"
                          aria-label={color.name}
                          className={classNames(
                            colorClassMap[color.name],
                            "size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3 checked:outline-gray-400"
                          )}
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">سایز</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    راهنمای سایز
                  </a>
                </div>
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {availableSizes.map((size) =>
                    size ? (
                      <label
                        key={size.id}
                        aria-label={size.name}
                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                      >
                        <input
                          {...register("sizeId")}
                          value={size.id}
                          checked={Number(selectedSize) === size.id}
                          type="radio"
                          className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                        />
                        <span className="text-sm font-medium uppercase group-has-checked:text-white">
                          {size.name}
                        </span>
                      </label>
                    ) : null
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                افزودن به سبد خرید
              </button>
            </form>
          </div>
        </div>
      </main>
      <Services />
      <Footer />
    </div>
  );
}

{
  /* <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav> */
}
