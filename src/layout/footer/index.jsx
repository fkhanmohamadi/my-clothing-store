import React from "react";
import Logo from "../../components/logo";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-linear-to-l from-gray-950 to-gray-800 mt-10 text-white text-sm/8">
      <div className="container mx-auto py-6 grid grid-cols-1 sm:grid-cols-3">
        <div className="flex flex-col gap-4 pt-12">
          <h2 className="text-xl">خدمات مشتریان</h2>
          <div className="flex flex-col gap-2 text-sm/8 text-gray-300">
            <p>پرسش های متداول</p>
            <p>شرایط بازگشت</p>
            <p>راهنمای خرید</p>
            <p>حریم خصوصی</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-12">
          <h2 className="text-xl">منتظر شنیدن صدای گرمتان هستیم</h2>
          <div className="flex flex-col gap-2 text-sm/8 text-gray-300">
            <p>7 روز هفته - 24 ساعته</p>
            <p>تلفن: 021-5684</p>
            <p>پیامک: 10001000</p>
            <p>ایمیل: fayra@yahoo.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <Link to={""}>
            <img className="h-20 w-28" src="/FayraLogoW.png" alt="Logo" />
          </Link>
          <p className="max-w-100 text-justify  text-gray-300">
            ما برآنیم تا با پیشرو بودن در فرآیند تولید، نوع و کیفیت محصول، خدمات
            و توزیع، الگویی برای تولیدکنندگان ایرانی باشیم و به مرجع پوشش در
            ایران تبدیل شویم. می‌پنداریم که نظر مردم ایران و منطقه باید نسبت به
            کالای ایرانی بهبود یابد و در این راستا با اشتیاق می‌کوشیم.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
