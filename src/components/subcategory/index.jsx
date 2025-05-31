import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../../states/slices/subcategorySlice";
import { useEffect } from "react";

export default function SubCategory() {
  const subCategory = useSelector((store) => store.subcategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubcategory());
  }, []);

  const subCategoryData = subCategory.data.subcategoryData;

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-4 sm:py-6 lg:max-w-none lg:py-8">
          <h2 className="text-xl font-bold text-gray-900">دستبندی محصولات</h2>

          <div className="mt-6 space-y-20 lg:grid lg:grid-cols-4 lg:gap-x-10 lg:space-y-0">
            {subCategoryData?.map((subCategory) => (
              <div key={subCategory.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={`http://localhost:3002/files/${subCategory.icon}`}
                    alt="subCategory imge"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={subCategory.href}>
                    <span className="absolute inset-0" />
                    {subCategory.name}
                  </a>
                </h3>
                <a href={subCategory.href}>
                  <p className="text-base font-semibold text-gray-900">
                    مشاهده محصولات
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
