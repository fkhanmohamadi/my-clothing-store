import React, { useEffect, useState } from "react";
import Button from "../button";
import TextField from "../text-field";
import FileField from "../file-field";
import OptionField from "../dropdown";
import { addProductService } from "../../api/services/addProduct";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../api/services/uploadImage";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../states/slices/productsSlice";
import { editProductService } from "../../api/services/editProduct";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const schema = yup.object({
  thumbnail: yup.mixed().test(
    "fileNumber",
    "وارد کردن تصویر الزامی می باشد.",
    (files) =>
      !files || // Check if `files` is defined
      files.length > 0 // Check if `files` has attachment
  ),
  name: yup.string().required("نام محصول الزامیست ."),
  image: yup.mixed().test(
    "fileNumber",
    "وارد کردن تصویر الزامی می باشد.",
    (files) =>
      !files || // Check if `files` is defined
      files.length > 0 // Check if `files` has attachment
  ),
  price: yup.string().required("قیمت محصول الزامیست ."),
  quantity: yup.string().required("تعداد محصول الزامیست ."),
  brand: yup.string().required(" برند محصول الزامیست ."),
  color: yup.string().required(" رنگ محصول الزامیست ."),
  size: yup.string().required(" سایز محصول الزامیست ."),
  category: yup.string().required(" دسته بندی محصول الزامیست ."),
  subcategory: yup.string().required(" زیر دسته بندی محصول الزامیست ."),
  code: yup.string().required("کد محصول الزامیست ."),
  // description: yup.string().required("توضیحات محصول الزامیست ."),
});

const uploadHandler = async (img) => {
  let formData = new FormData();
  formData.append("image", img);
  const res = await uploadImage(formData);
  return res.filename;
};

export default function ProductManagementModal({
  showModal,
  setShowModal,
  categoryData,
  subcategoryData,
  brandsData,
  colorsData,
  sizesData,
  paginationParams,
  setEditedItem,
  editedItem,
}) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (editedItem !== null) {
      reset(editedItem);
    } else {
      reset({});
    }
  }, [editedItem]);

  const dispatch = useDispatch();

  const submitForm = async (data) => {
    console.log(data);
    let thumbnail = await uploadHandler(data.thumbnail[0]);

    let image = [];
    for (let i = 0; i < data.image.length; i++) {
      const res = await uploadHandler(data.image[i]);
      image.push(res);
    }

    if (editedItem !== null) {
      if (!thumbnail) {
        thumbnail = data.thumbnail;
      }
      if (!image[0]) {
        image = data.image;
      }
    }

    const newProduct = {
      name: data.name,
      code: data.code,
      image: image,
      thumbnail: thumbnail,
      price: Number(data.price),
      quantity: Number(data.quantity),
      color: Number(data.color),
      size: Number(data.size),
      brand: Number(data.brand),
      category: Number(data.category),
      subcategory: Number(data.subcategory),
      description: "",
    };
    try {
      if (editedItem !== null) {
        const result = await editProductService(editedItem.id, newProduct);
      } else {
        const result = await addProductService(newProduct);
      }
      dispatch(fetchProducts(paginationParams));
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-1/2 relative my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between py-2 px-4 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-l ">افزودن/ویرایش کالا</h3>
                  <Button
                    className="p-1 border-0 text-red-500 text-xl"
                    onclick={() => {
                      setEditedItem(null);
                      setShowModal(false);
                    }}
                  >
                    x
                  </Button>
                </div>
                {/*body*/}
                <div className="relative px-6 py-4 flex-auto">
                  <form
                    className=" mt-2 space-y-2 flex flex-col text-sm"
                    onSubmit={handleSubmit(submitForm)}
                  >
                    <div className="flex gap-5">
                      <div className="basis-1/5">
                        <TextField
                          id="code"
                          lable="کد کالا"
                          name="code"
                          type="text"
                          className="rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder=""
                          error={errors.code?.message}
                          validation={{ ...register("code") }}
                        />
                      </div>
                      <div className="basis-4/5">
                        <TextField
                          id="name"
                          lable="نام کالا"
                          name="name"
                          type="text"
                          className="rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder=""
                          error={errors.name?.message}
                          validation={{ ...register("name") }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <FileField
                        id="thumbnail"
                        lable=" تصویر کالا"
                        name="thumbnail"
                        error={errors.thumbnail?.message}
                        validation={{ ...register("thumbnail") }}
                      />
                      <FileField
                        id="image"
                        lable="سایر تصاویر کالا"
                        name="image"
                        multiple
                        error={errors.image?.message}
                        validation={{ ...register("image") }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <TextField
                        id="price"
                        lable="قیمت کالا"
                        name="price"
                        type="text"
                        className="rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                        error={errors.price?.message}
                        validation={{ ...register("price") }}
                      />
                      <TextField
                        id="quantity"
                        lable="تعداد کالا"
                        name="quantity"
                        type="text"
                        className="rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                        error={errors.quantity?.message}
                        validation={{ ...register("quantity") }}
                      />
                      <div className="flex flex-col">
                        <label htmlFor="color">رنگ کالا</label>
                        <select
                          id="color"
                          name="color"
                          {...register("color")}
                          className="rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {colorsData.map((row, index) => {
                            return (
                              <OptionField value={row.id}>
                                {row.fname}
                              </OptionField>
                            );
                          })}
                        </select>
                        <p>{errors.color?.message}</p>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="size">سایز کالا</label>
                        <select
                          id="size"
                          name="size"
                          {...register("size")}
                          className="rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {sizesData.map((row, index) => {
                            return (
                              <OptionField value={row.id}>
                                {row.name}
                              </OptionField>
                            );
                          })}
                        </select>
                        <p>{errors.size?.message}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <label htmlFor="brand">برند کالا</label>
                        <select
                          id="brand"
                          name="brand"
                          {...register("brand")}
                          className="rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {brandsData.map((row, index) => {
                            return (
                              <OptionField value={row.id}>
                                {row.name}
                              </OptionField>
                            );
                          })}
                        </select>
                        <p>{errors.brand?.message}</p>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="category">دسته بندی کالا</label>
                        <select
                          id="category"
                          name="category"
                          className="rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("category")}
                        >
                          {categoryData.map((row, index) => {
                            return (
                              <OptionField value={row.id}>
                                {row.name}
                              </OptionField>
                            );
                          })}
                        </select>
                        <p>{errors.category?.message}</p>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="subcategory">زیر دسته بندی کالا</label>
                        <select
                          id="subcategory"
                          name="subcategory"
                          className="rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("subcategory")}
                        >
                          {subcategoryData.map((row, index) => {
                            return (
                              <OptionField value={row.id}>
                                {row.name}
                              </OptionField>
                            );
                          })}
                        </select>
                        <p>{errors.subcategory?.message}</p>
                      </div>
                    </div>
                      <CKEditor
                        id="description"
                        name="description"
                        editor={ClassicEditor}
                        // data={row.description}
                        // onReady={(editor) => {
                        //   // You can store the "editor" and use when it is needed.
                        //   console.log("Editor is ready to use!", editor);
                        // }}
                        // {...register("description")}
                      />
                      {/* <p>{errors.description?.message}</p> */}
                    <div>
                      <Button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        ذخیره
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
