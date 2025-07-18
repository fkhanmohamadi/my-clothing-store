import React from "react";
import HomeSubTitle from "../home-subtitle";
import { Link } from "react-router-dom";

function CategoryBanner() {
  return (
    <section className="mt-8">
      <div className="container mx-auto p-4">
        <HomeSubTitle
          categoryName={"جدیدترین محصولات"}
          linkName={"مشاهده همه"}
        />

        <div className="h-80 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 text-white">
          <Link to={"/products/category/woman/subcategory/new"} className="flex flex-col justify-center items-center bg-CategoryBanner1">
              <p className="text-lg sm:text-2xl pb-3 sm:pb-5 font-mono tracking-tighter">
                جدیدترین های زنانه
              </p>
              <p className="text-xs sm:text-base font-mono tracking-tighter">
                لباس، کیف، کفش، اکسسوری
              </p>
          </Link>
          <Link to={"/products/category/man/subcategory/new"} className="flex flex-col justify-center items-center bg-CategoryBanner2">
              <p className="text-lg sm:text-2xl pb-3 sm:pb-5 font-mono tracking-tighter">
                جدیدترین های زنانه
              </p>
              <p className="text-xs sm:text-base font-mono tracking-tighter">
                لباس، کیف، کفش، اکسسوری
              </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoryBanner;
