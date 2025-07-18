import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryMap, subcategoryMap } from "../../constants/categoryMaps";
import { fetchProducts } from "../../states/slices/productsSlice";
import { fetchColors } from "../../states/slices/colorsSlise";
import { fetchSizes } from "../../states/slices/sizesSlise";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import Services from "../../components/services";
import ProductCart from "../../components/product-cart";
import LoadMore from "../../components/load-more";
import OptionField from "../../components/dropdown";

function Products() {
  ////// params
  const { categoryName, subcategoryName } = useParams();
  const categoryId = categoryName ? categoryMap[categoryName] : null;
  const subcategoryId = subcategoryName
    ? subcategoryMap[subcategoryName]
    : null;

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

  // Filter states
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    dispatch(fetchProducts());
    setSelectedColor("");
    setSelectedSize("");
    setSortBy("");
    setVisibleCount(4);
  }, [dispatch, categoryId, subcategoryId]);

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchSizes());
  }, []);

  // Filter and sort products

  let productsFiltered = allProductsData.filter((product) => {
    if (categoryId && product.category !== categoryId) return false;
    if (subcategoryId && product.subcategory !== subcategoryId) return false;
    if (selectedColor && product.color !== Number(selectedColor)) return false;
    if (selectedSize && product.size !== Number(selectedSize)) return false;
    return true;
  });

  if (sortBy === "newest") {
    productsFiltered.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortBy === "priceLowHigh") {
    productsFiltered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === "priceHighLow") {
    productsFiltered.sort((a, b) => Number(b.price) - Number(a.price));
  }

  const visibleProducts = productsFiltered.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  if (!allProductsData) return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div>
      <Header lineMenu={1} />
      <main className="container mx-auto mt-24">
        {/* Filters */}
        <div className="flex gap-4 mb-6 items-center text-sm text-gray-700">
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border border-gray-400 p-2 rounded"
          >
            <option value="">همه رنگ‌ها</option>
            {colorsData.map((color) => (
              <OptionField key={color.id} value={color.id}>
                رنگ {color.fname}
              </OptionField>
            ))}
          </select>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border border-gray-400 p-2 rounded"
          >
            <option value="">همه سایزها</option>
            {sizesData.map((size) => (
              <OptionField key={size.id} value={size.id}>
                سایز {size.name}
              </OptionField>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-400 p-2 rounded"
          >
            <OptionField value="">مرتب‌سازی</OptionField>
            <OptionField value="newest">جدیدترین</OptionField>
            <OptionField value="priceLowHigh">ارزان‌ترین</OptionField>
            <OptionField value="priceHighLow">گران‌ترین</OptionField>
          </select>
        </div>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 lg:gap-x-8">
          {visibleProducts?.map((product) => (
            <ProductCart key={product.id} id={product.id} product={product} />
          ))}
        </div>
        {/* LoadMore */}
        <div>
          {visibleCount < productsFiltered.length && (
            <LoadMore handleLoadMore={handleLoadMore} />
          )}
        </div>
      </main>
      <Services />
      <Footer />
    </div>
  );
}

export default Products;
