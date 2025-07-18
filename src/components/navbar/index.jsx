import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../../states/slices/subcategorySlice";
import { fetchCategory } from "../../states/slices/categorySlice";
import { fetchcategorySubcategoryRel } from "../../states/slices/categorySubcategoryRelSlice";
import { useEffect } from "react";

function Navbar({ isMenuHovered, setIsMenuHovered, isScrolled }) {
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

  return (
    <nav>
      {/* descktop navbar */}
      <div className="relative hidden lg:flex justify-center items-center">
        <ul
          className={`w-fit flex justify-center gap-x-20 ${
            isScrolled ? "p-0 pb-2 -mt-6 " : "pt-6 pb-2"
          }`}
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
        >
          {Array.isArray(categoryData) &&
            categoryData.map((category) => {
              const subMenu =
                categorySubcategoryRelData?.filter((item) => {
                  return item.categoryId == category.id;
                }) || {};

              return (
                <li key={category.id} className="h-fit group">
                  <NavLink className="block cursor-pointer" to={""}>
                    {category.name}
                  </NavLink>
                  {/* sub menu */}
                  {subMenu.length > 0 && (
                    <div className="absolute left-0 right-0 top-full bg-white text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible ">
                      <div
                        className={`relative flex w-full border-t border-t-gray-300 transition-all duration-800 ease-in-out ${
                          isMenuHovered ? " translate-y-0" : " -translate-y-3"
                        }`}
                      >
                        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

                        {subMenu.map((subMenuItem) => {
                          const subMenuName = subCategoryData?.find((item) => {
                            return item.id == subMenuItem.subcategoryId;
                          });

                          return (
                            <div
                              className="basis-1/4 p-0 w-full max-w-1/4"
                              key={subMenuItem.id}
                            >
                              <NavLink
                                className="block relative bg-transparent decoration-0 cursor-pointer "
                                to={subMenuItem?.href || "#"}
                              >
                                <img
                                  className={`w-full  ${
                                    isScrolled ? "h-80" : "h-96"
                                  }`}
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
                      <div className="block p-3 w-full border-y border-gray-300 border-solid text-center">
                        <NavLink
                          className="inline-block transition-all"
                          to={category.href}
                        >
                          <span className=" text-gray-900 border-b border-black border-solid">
                            مشاهده همه محصولات
                          </span>
                        </NavLink>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
