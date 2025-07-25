import React from "react";

function PaymentResultFail() {
  return (
    <div>
      <Header lineMenu={1} />
      <div className="my-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h1 className="text-2xl font-bold mb-4 text-green-700">
            ثبت سفارش شما با مشکل مواجه گردید!
          </h1>
          <p className="text-gray-600">لطفا مجدد تلاش نمایید.</p>
        </div>
      </div>
      <Services />
      <Footer />
    </div>
  );
}

export default PaymentResultFail;
