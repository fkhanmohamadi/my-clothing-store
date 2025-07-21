import React from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import TextField from "../../components/text-field";
import ImageField from "../../components/img";
import CheckboxField from "../../components/checkBox-field";
import LinkFiled from "../../components/link";
import Button from "../../components/button";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addUserService } from "../../api/services/addUser";
import { useDispatch } from "react-redux";
import { addUser } from "../../states/slices/userSlice";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showToastMessage = () => {
    toast.error("اطلاعات ورودی معتبر نمی باشد", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const submitForm = async (data) => {
    const registerData = {
      fName: data.fName,
      lName: data.lName,
      username: data.username,
      password: data.password,
      role: "user",
      address: data.address,
      phone: data.phone,
    };
    const resultAction = await dispatch(addUser(registerData));

    if (addUser.fulfilled.match(resultAction)) {
      toast.success("ثبت نام با موفقیت انجام شد");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      showToastMessage();
    }
  };

  const schema = yup.object({
    fName: yup.string().required("نام الزامیست ."),
    lName: yup.string().required("نام خانوادگی الزامیست ."),
    username: yup.string().required("نام کاربری الزامیست ."),
    password: yup.string().required(" پسورد الزامیست ."),
    address: yup.string().required(" آدرس الزامیست ."),
    phone: yup.string().required(" شماره تلفن الزامیست ."),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "رمز عبور یکسان نیست")
      .required("تکرار رمز عبور الزامیست"),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return (
    <>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="w-full max-w-md space-y-10 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center border border-gray-200 p-2 rounded-full shadow-lg">
              <ImageField
                className="mx-auto h-12 w-auto"
                src="/FayraLogoB.png"
                alt="logo"
              />
            </div>
            <div className="flex gap-3 justify-center items-center mt-6">
              <Link
                to={"/login"}
                className=" text-center text-xl  tracking-tight text-gray-900"
              >
                ورود
              </Link>
              <span>/</span>
              <Link
                to={"/RegisterPage"}
                className="text-center text-xl  tracking-tight text-gray-900"
              >
                ثبت نام
              </Link>
            </div>
          </div>
          <form
            className="mt-8 flex flex-col space-y-4"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex justify-between">
              {" "}
              <TextField
                id="fName"
                lable="نام"
                type="text"
                className="relative rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
                error={errors.fName?.message}
                validation={{ ...register("fName") }}
              />
              <TextField
                id="lName"
                lable="نام خانوادگی"
                type="text"
                className="relative rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
                error={errors.lName?.message}
                validation={{ ...register("lName") }}
              />
            </div>
            <div className="flex justify-between">
              <TextField
                id="username"
                lable="نام کاربری"
                type="text"
                className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
                error={errors.username?.message}
                validation={{ ...register("username") }}
              />
              <TextField
                id="phone"
                lable="موبایل"
                type="text"
                className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
                error={errors.phone?.message}
                validation={{ ...register("phone") }}
              />
            </div>

            <div className="flex justify-between">
              <TextField
                id="password"
                lable="پسورد"
                type="password"
                className="relative rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
                error={errors.password?.message}
                validation={{ ...register("password") }}
              />
              <TextField
                id="passwordConfirm"
                lable="تکرار رمز عبور"
                type="password"
                className="relative rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
                error={errors.passwordConfirm?.message}
                validation={{ ...register("passwordConfirm") }}
              />
            </div>
            <TextField
              id="address"
              lable="آدرس"
              type="text"
              className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              error={errors.address?.message}
              validation={{ ...register("address") }}
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
                ثبت نام
              </Button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
