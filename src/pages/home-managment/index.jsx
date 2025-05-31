import React from "react";
import HeaderManagment from "../../layout/header-managment";
import Statistics from "../../layout/Statistics";

export default function HomeManagment() {
  return (
    <div className="flex">
      <HeaderManagment />
      <div className="flex flex-col flex-1 mx-5 gap-5">
        <Statistics />
        <div className="flex justify-between">Hello</div>
      </div>
    </div>
  );
}
