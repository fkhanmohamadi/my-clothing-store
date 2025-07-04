import React from "react";

function Landing() {
  return (
    <section className="relative h-[350px] sm:h-[500px] lg:h-[550px] bg-home bg-center bg-cover bg-no-repeat">
      {/* <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" /> */}
      <div className="container mx-auto h-full lg:min-h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-white z-40">
          <p className="text-lg sm:text-2xl pb-3 sm:pb-5 font-mono	tracking-tighter">استایل بیادماندنی  تابستان!</p>
          <span className="block w-30 sm:w-40 h-[1px] bg-orange-200 mx-auto" />
          <p className="text-xs sm:text-base pt-3 sm:pt-5 font-mono tracking-tighter">به وقت خرید لباس های تابستانی </p>
          <p className="text-xs sm:text-base font-mono tracking-tighter">با فایرا همراه شو</p>
        </div>
      </div>
    </section>
  );
}

export default Landing;
