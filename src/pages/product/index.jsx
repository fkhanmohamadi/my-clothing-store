import React, { useEffect, useMemo } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchColors } from "../../states/slices/colorsSlise";
import { fetchSizes } from "../../states/slices/sizesSlise";
import { fetchProducts } from "../../states/slices/productsSlice";
// import { addToCart } from "../../states/slices/cartSlice";

import { colorClassMap } from "../../constants/colorMaps";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  ////// Products
  const allProducts = useSelector((store) => store.products);
  const allProductsData = allProducts?.data?.productsData || [];

  ///// Colors
  const colors = useSelector((store) => store.colors);
  const allColors = colors?.data?.colorsData || [];

  ////// Sizes
  const sizes = useSelector((store) => store.sizes);
  const allSizes = sizes?.data?.sizesData || [];

  const product = useMemo(() => {
    return allProductsData.find((p) => p.id === Number(id));
  }, [allProductsData, id]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchColors());
    dispatch(fetchSizes());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedColor = watch("colorId");
  const selectedSize = watch("sizeId");

  const selectedVariant = useMemo(() => {
    return product?.variants?.find(
      (v) =>
        v.colorId === Number(selectedColor) && v.sizeId === Number(selectedSize)
    );
  }, [selectedColor, selectedSize, product]);

  const availableColors = useMemo(() => {
    const colorIds = [...new Set(product?.variants?.map((v) => v.colorId))];
    return colorIds.map((id) => allColors.find((c) => c.id === id));
  }, [product, allColors]);

  const availableSizes = useMemo(() => {
    const sizeIds = [...new Set(product?.variants?.map((v) => v.sizeId))];
    return sizeIds.map((id) => allSizes.find((s) => s.id === id));
  }, [product, allSizes]);

  console.log(availableColors);

  const onSubmit = () => {
    if (!selectedVariant || selectedVariant.quantity === 0) return;

    // dispatch(
    //   addToCart({
    //     productId: product.id,
    //     variantId: selectedVariant.id,
    //     quantity: 1,
    //   })
    // );

    toast.success("✅ محصول به سبد خرید اضافه شد");
  };

  

  if (!product) return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="bg-white">
      <ToastContainer />
      <div className="pt-6">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-x-8">
          <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl text-gray-900">{product.price} تومان</p>

            <div className="mt-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    رنگ مورد نظر
                  </h3>
                  <RadioGroup
                    value={selectedColor}
                    onChange={(value) => setValue("colorId", value)}
                    className="flex space-x-3"
                  >
                    {availableColors.map((color) => (
                      <RadioGroup.Option key={color.id} value={color.id}>
                        {({ checked }) => (
                          <span
                            className={`inline-block w-8 h-8 rounded-full border border-gray-300 cursor-pointer ${
                              checked ? "ring-2 ring-indigo-500" : ""
                            } ${colorClassMap[color.name]}`}
                          ></span>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </RadioGroup>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    سایز مورد نظر
                  </h3>
                  <RadioGroup
                    value={selectedSize}
                    onChange={(value) => setValue("sizeId", value)}
                    className="grid grid-cols-4 gap-2"
                  >
                    {availableSizes.map((size) => (
                      <RadioGroup.Option key={size.id} value={size.id}>
                        {({ checked }) => (
                          <div
                            className={`border rounded-md py-2 text-center text-sm font-medium cursor-pointer ${
                              checked ? "border-indigo-500" : "border-gray-300"
                            }`}
                          >
                            {size.name}
                          </div>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
                >
                  افزودن به سبد خرید
                </button>
              </form>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                توضیحات محصول
              </h3>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
