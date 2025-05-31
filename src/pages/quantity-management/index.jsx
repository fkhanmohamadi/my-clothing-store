import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/pagination";
import Button from "../../components/button";
import SearchField from "../../components/search-field";
import HeaderManagment from "../../layout/header-managment";
import Statistics from "../../layout/Statistics";
import { fetchProducts } from "../../states/slices/productsSlice";
import QuantityTable from "../../components/quantity-table";
import { editQuantityService } from "../../api/services/editQuantity";

function QuantityManagment() {
  const products = useSelector((store) => store.products);
  const productsCount = useSelector((store) => store.products.data.count);

  const dispatch = useDispatch();

  const [active, setActive] = useState("1");

  const [paginationParams, setPaginationParams] = useSearchParams({
    _page: 1,
    _limit: 5,
  });

  const [searchParams, setSearchParams] = useState("");

  const [editPriceArr, setEditPriceArr] = useState([]);
  const [editQuntityArr, setEditQuantityArr] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts(paginationParams));
  }, []);

  const searchHandler = (e) => {
    setSearchParams(e.target.value);
  };

  const submitHandler = async () => {
    Promise.all(
      editPriceArr.map(async (item) => {
        const result = await editQuantityService(item.id,{price:item.item});
        // console.log(result);
      })
    )
    Promise.all(
      editQuntityArr.map(async (item) => {
        const result = await editQuantityService(item.id,{quantity:item.item});
        // console.log(result);
      })
    )
    dispatch(fetchProducts(paginationParams));
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
            onclick={submitHandler}
          >
            ذخیره
          </Button>
        </div>
        {products.status === "success" ? (
          <QuantityTable
            tbodyData={products.data.productsData}
            editPriceArr={editPriceArr}
            setEditPriceArr={setEditPriceArr}
            editQuntityArr={editQuntityArr}
            setEditQuantityArr={setEditQuantityArr}
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
      </div>
    </div>
  );
}

export default QuantityManagment;
