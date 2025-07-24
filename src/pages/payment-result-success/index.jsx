import React from "react";
import Header from "../../layout/header";
import Services from "../../components/services";
import Footer from "../../layout/footer";

function PaymentResultSuccess() {
  return (
    <div>
      <Header lineMenu={1} />
      <div className="my-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h1 className="text-2xl font-bold mb-4 text-green-700">
            سفارش شما با موفقیت ثبت شد!
          </h1>
          <p className="text-gray-600">از خرید شما متشکریم.</p>
        </div>
      </div>
      <Services />
      <Footer />
    </div>
  );
}

export default PaymentResultSuccess;
