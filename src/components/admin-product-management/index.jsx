import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Pagination from "../pagination";
import Button from "../button";
import SearchField from "../search-field";
import { fetchProducts } from "../../states/slices/productsSlice";
import ProductsTable from "../products-table";
import { fetchCategory } from "../../states/slices/categorySlice";
import { fetchSubcategory } from "../../states/slices/subcategorySlice";
import { fetchColors } from "../../states/slices/colorsSlise";
import { fetchSizes } from "../../states/slices/sizesSlise";
import ProductManagementModal from "../product-management-modal";
import { deleteProductService } from "../../api/services/deleteProduct";

function AdminProductManagment() {
  //Store
  const products = useSelector((store) => store.products);
  const productsCount = products?.data?.count || 0;
  const category = useSelector((store) => store.category);
  const subcategory = useSelector((store) => store.subcategory);
  const colors = useSelector((store) => store.colors);
  const sizes = useSelector((store) => store.sizes);

  //state
  const [showModal, setShowModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  //dispatch
  const dispatch = useDispatch();

  // pagination & filters state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const ordersPerPage = 10;
  const totalPages = Math.ceil(productsCount / ordersPerPage);

  const getParams = () => {
    const params = {
      _page: currentPage,
      _limit: ordersPerPage,
      _sort: "createdAt",
      _order: sortOrder,
    };
    if (searchTerm.trim()) {
      params.name_like = searchTerm.trim();
    }
    return params;
  };

  const showToastMessage = () => {
    toast.success("حذف با موفقیت انجام شد", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    dispatch(fetchProducts(getParams()));
    dispatch(fetchCategory());
    dispatch(fetchSubcategory());
    dispatch(fetchColors());
    dispatch(fetchSizes());
  }, [dispatch, currentPage, sortOrder, searchTerm]);

  //Handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const deleteProductHandler = async (id) => {
    try {
      const result = await deleteProductService(id);
      showToastMessage();
      dispatch(fetchProducts(paginationParams()));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col flex-1 mx-5 gap-5">
      <div className="flex justify-between">
        <SearchField
          className="p-1 w-96 text-sm bg-transparent outline-0"
          placeholder="جستجو ..."
          onchange={searchHandler}
        />
        <Button
          type="submit"
          className="group relative flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onclick={showModalHandler}
        >
          افزودن کالا
        </Button>
      </div>
      {products.status === "success" ? (
        <ProductsTable
          tbodyData={products?.data?.productsData}
          categoryData={category?.data?.categoryData}
          subcategoryData={subcategory?.data?.subcategoryData}
          setShowModal={setShowModal}
          setEditedItem={setEditedItem}
          deleteProductHandler={deleteProductHandler}
        />
      ) : (
        ""
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ProductManagementModal
        showModal={showModal}
        setShowModal={setShowModal}
        categoryData={category?.data?.categoryData}
        subcategoryData={subcategory?.data?.subcategoryData}
        colorsData={colors?.data?.colorsData}
        sizesData={sizes?.data?.sizesData}
        paginationParams={getParams()}
        editedItem={editedItem}
        setEditedItem={setEditedItem}
      />
    </div>
  );
}

export default AdminProductManagment;
