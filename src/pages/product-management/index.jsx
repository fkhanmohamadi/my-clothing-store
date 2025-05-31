import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/pagination";
import Button from "../../components/button";
import SearchField from "../../components/search-field";
import HeaderManagment from "../../layout/header-managment";
import Statistics from "../../layout/Statistics";
import { fetchProducts } from "../../states/slices/productsSlice";
import ProductsTable from "../../components/products-table";
import { fetchCategory } from "../../states/slices/categorySlice";
import { fetchSubcategory } from "../../states/slices/subcategorySlice";
import { fetchBrands } from "../../states/slices/bransSlice";
import { fetchColors } from "../../states/slices/colorsSlise";
import { fetchSizes } from "../../states/slices/sizesSlise";
import ProductManagementModal from "../../components/product-management-modal";

function ProductManagment() {

  //Store
  const products = useSelector((store) => store.products);
  const productsCount = useSelector((store) => store.products.data.count);
  const category = useSelector((store) => store.category);
  const subcategory = useSelector((store) => store.subcategory);
  const brands = useSelector((store) => store.brands);
  const colors = useSelector((store) => store.colors);
  const sizes = useSelector((store) => store.sizes);

  //state
  const [active, setActive] = useState("1");
  const [searchParams, setSearchParams] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  
  //dispatch
  const dispatch = useDispatch();

  const [paginationParams, setPaginationParams] = useSearchParams({
    _page: 1,
    _limit: 5,
  });

  useEffect(() => {
    dispatch(fetchProducts(paginationParams));
    dispatch(fetchCategory());
    dispatch(fetchSubcategory());
    dispatch(fetchBrands());
    dispatch(fetchColors());
    dispatch(fetchSizes());
  }, []);

  //Handler
  const searchHandler = (e) => {
    setSearchParams(e.target.value);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };


  return (
    <div className="flex">
      <HeaderManagment />
      <div className="flex flex-col flex-1 mx-5 gap-5">
        <Statistics />
        <div className="flex justify-between">
          <SearchField
            className="p-1 w-96 text-sm bg-transparent outline-0"
            placeholder="جستجو ..."
            onchange={searchHandler}
          />
          <Button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onclick={showModalHandler}
          >
            افزودن کالا
          </Button>
        </div>
        {products.status === "success" ? (
          <ProductsTable
            tbodyData={products.data.productsData}
            categoryData={category.data.categoryData}
            subcategoryData={subcategory.data.subcategoryData}
            colorsData={colors.data.colorsData}
            sizesData={sizes.data.sizesData}
            setShowModal={setShowModal}
            paginationParams={paginationParams}
            setEditedItem ={setEditedItem}
          />
        ) : (
          ""
        )}
        <Pagination
          paginationParams={paginationParams}
          setPaginationParams={setPaginationParams}
          count={productsCount}
          active={active}
          setActive={setActive}
        />
        <ProductManagementModal
          showModal={showModal}
          setShowModal={setShowModal}
          categoryData={category.data.categoryData}
          subcategoryData={subcategory.data.subcategoryData}
          brandsData={brands.data.brandsData}
          colorsData={colors.data.colorsData}
          sizesData={sizes.data.sizesData}
          paginationParams={paginationParams}
          editedItem = {editedItem}
          setEditedItem = {setEditedItem}
        />
      </div>
    </div>
  );
}

export default ProductManagment;
