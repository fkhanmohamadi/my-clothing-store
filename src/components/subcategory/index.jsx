import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../../states/slices/subcategorySlice";
import HomeSubTitle from "../home-subtitle";
import { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SubCategory() {
  const subCategory = useSelector((store) => store.subcategory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubcategory());
  }, []);

  const subCategoryData = subCategory.data.subcategoryData;

  return (
    <section className="mt-8">
        <div className="container mx-auto p-4 ">
          <HomeSubTitle
            categoryName={"دسته بندی محصولات"}
            linkName={"مشاهده همه"}
          />
          <div className="relative mt-6">
            <div className="custom-prev absolute top-1/2 left-3 z-10 -translate-y-1/2 cursor-pointer text-gray-500  bg-gray-100 hover:bg-gray-300 p-2 rounded-full shadow-md">
              <HiChevronLeft size={24} />
            </div>

            {/* دکمه بعدی با آیکون */}
            <div className="custom-next absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer text-gray-500 bg-gray-100 hover:bg-gray-300 p-2 rounded-full shadow-md">
              <HiChevronRight size={24} />
            </div>
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={10}
              slidesPerView={2}
              loop={true}
              autoplay={{ delay: 6000 }}
              //pagination={{ clickable: true }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3, // mobile
                },
                768: {
                  slidesPerView: 4, // tablet
                },
                1024: {
                  slidesPerView: 6, // Desktop
                },
              }}
              className="rounded-xl shadow-xl"
            >
              {subCategoryData?.map((subCategory) => (
                <SwiperSlide key={subCategory.id}>
                  <div key={subCategory.name} className="flex flex-col justify-center items-center group relative">
                    <div className=" overflow-hidden rounded-lg bg-white group-hover:opacity-75">
                      <img
                        src={subCategory.icon}
                        alt="subCategory imge"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-2 text-sm text-gray-500 text-center">
                      <a href={subCategory.href}>
                        <span />
                        {subCategory.name}
                      </a>
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
    </section>
  );
}
