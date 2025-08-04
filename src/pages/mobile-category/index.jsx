import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../../states/slices/subcategorySlice";
import { fetchCategory } from "../../states/slices/categorySlice";
import { fetchcategorySubcategoryRel } from "../../states/slices/categorySubcategoryRelSlice";
import { useEffect } from "react";
import Services from "../../components/services";
import Footer from "../../layout/footer";
import Header from "../../layout/header";

function MobileCategory() {
  const category = useSelector((store) => store.category);
  const subCategory = useSelector((store) => store.subcategory);
  const categorySubcategoryRelation = useSelector(
    (store) => store.categorySubcategoryRelation
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubcategory());
    dispatch(fetchCategory());
    dispatch(fetchcategorySubcategoryRel());
  }, []);

  const categoryData = category?.data?.categoryData || [];
  const subCategoryData = subCategory?.data?.subcategoryData || [];
  const categorySubcategoryRelData =
    categorySubcategoryRelation?.data?.categorySubcategoryRelData || [];

  const [subMenu, setSubMenu] = useState(null);

  const getCurrentSubMenu = (id) => {
    return (
      categorySubcategoryRelData?.filter((item) => {
        return item?.categoryId == id;
      }) || {}
    );
  };

  useEffect(() => {
    categorySubcategoryRelData && setSubMenu(getCurrentSubMenu(categoryData[0]?.id));
  }, [categorySubcategoryRelData]);

  return (
    <>
      <Header lineMenu={1} />
      <nav className="container mx-auto mt-22 ">
        <div className="flex h-full">
          <div className="flex flex-col shrink-0 overflow-y-auto bg-gray-300">
            {categoryData?.map((category) => {
              return (
                <div
                  key={category?.id}
                  className=" py-12 px-2 text-center border-t  border-gray-100 group"
                  onClick={() => setSubMenu(getCurrentSubMenu(category.id))}
                >
                  <NavLink className="block cursor-pointer" to={""}>
                    {category?.name}
                  </NavLink>
                </div>
              );
            })}
          </div>
          <div className="overflow-y-auto">
            {subMenu?.map((subMenuItem) => {
              const subMenuName = subCategoryData?.find((item) => {
                return item.id == subMenuItem.subcategoryId;
              });

              return (
                <div className="flex flex-col" key={subMenuItem.id}>
                  <NavLink
                    className="block relative bg-transparent decoration-0 cursor-pointer "
                    to={subMenuItem?.href || "#"}
                  >
                    <img
                      className={" h-40"}
                      src={subMenuItem?.image || ""}
                      alt=""
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50">
                      <span className="block text-white text-lg">
                        {subMenuName?.name || ""}
                      </span>
                      <span className="block w-20 h-[2px] bg-white mt-2 mx-auto" />
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

export default MobileCategory;
