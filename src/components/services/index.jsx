import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyService } from "../../states/slices/companyServicesSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Services() {
  const companyServices = useSelector((store) => store.companyServices);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanyService());
  }, []);

  const companyServicesData = companyServices.data.servicesData;

  return (
    <section className="mt-10 lg:mt-20">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-6">
          {companyServicesData?.map((service) => {
            return (
              <Link
                to={service.href}
                key={service.id}
                className="flex flex-col justify-center items-center gap-2 group"
              >
                <div className=" group-hover:opacity-75 rounded-lg shadow-lg ">
                  <img src={service.icon} alt="Services image" />
                </div>
                <p className=" group-hover:opacity-75 text-sm lg:text-base font-bold text-gray-700">
                  {service.name}
                </p>
                <p className=" group-hover:opacity-75 text-xs lg:text-sm text-gray-500">
                  {service.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
