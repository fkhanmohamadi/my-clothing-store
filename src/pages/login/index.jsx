import React from "react";

import { LockClosedIcon } from "@heroicons/react/20/solid";
import TextField from "../../components/text-field";
import ImageField from "../../components/img";
import CheckboxField from "../../components/checkBox-field";
import LinkFiled from "../../components/link";
import Button from "../../components/button";
import { useState } from "react";
import { loginService } from "../../api/services/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  username: yup.string().required("نام کاربری الزامیست ."),
  password: yup.string().required(" پسورد الزامیست ."),
});


function Login() {

  const showToastMessage = () => {
    toast.error('اطلاعات ورودی معتبر نمی باشد', {
        position: toast.POSITION.TOP_RIGHT
    });
};

  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const submitForm = async (data) => {
console.log(data)
    const loginData = {
      username: data.username,
      password: data.password,
    };

    try{
      const result = await loginService(loginData)
       localStorage.setItem("token", result.accessToken);
       localStorage.setItem("refresh_token",result.refreshToken);

       navigate('/ordersmanagment')
    }catch(error){
      console.log(error)
      showToastMessage()
    }
      
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="w-full max-w-md space-y-10 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center border border-gray-200 p-2 rounded-full shadow-lg">
              <ImageField
                className="mx-auto h-12 w-auto"
                src="./logo.gif"
                alt="logo"
              />
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              ورود به پنل مدیریت
            </h2>
          </div>
          <form
            className="mt-8 space-y-6 flex flex-col "
            onSubmit={handleSubmit(submitForm)}
          >
            <TextField
              id="username"
              lable="نام کاربری"
              name="username"
              type="text"
              className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              error={errors.username?.message}
              validation={{ ...register("username") }}
            />
            <TextField
              id="password"
              lable="رمز عبور"
              name="password"
              type="password"
              className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              error={errors.password?.message}
              validation={{ ...register("password") }}
            />

            <div className="flex items-center justify-between">
              <CheckboxField id="remember-me" lable="مرا به خاطر بسپار" />

              <LinkFiled
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                رمز عبور خود را فراموش کرده ام؟
              </LinkFiled>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                ورود
              </Button>
            </div>
            <ToastContainer/>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
