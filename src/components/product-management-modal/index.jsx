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
import { useFieldArray } from "react-hook-form";

export default function ProductManagementModal({
  showModal,
  setShowModal,
  categoryData,
  subcategoryData,
  colorsData,
  sizesData,
  paginationParams,
  setEditedItem,
  editedItem,
}) {
  const breadcrumbs = [
    {
      id: 1,
      name: "Woman",
      href: "/products/women",
    },
    {
      id: 2,
      name: "Clothing",
      href: "/products/women/clothing",
    },
  ];
  const reviews = {
    href: "#",
    average: 4,
    totalCount: 117,
  };

  const dispatch = useDispatch();

  const schema = yup.object({
    name: yup.string().required("نام محصول الزامیست."),
    image: yup
      .mixed()
      .test(
        "fileNumber",
        "وارد کردن تصویر الزامی می باشد.",
        (files) => !files || files.length > 0
      ),
    price: yup.string().required("قیمت محصول الزامیست."),
    category: yup.string().required("دسته بندی محصول الزامیست."),
    subcategory: yup.string().required("زیر دسته بندی محصول الزامیست."),
    description: yup.string().required("توضیحات محصول الزامیست."),
    details: yup.string().required("جزییات محصول الزامیست."),
    variants: yup.array().of(
      yup.object().shape({
        colorId: yup.string().required("رنگ الزامیست"),
        sizeId: yup.string().required("سایز الزامیست"),
        quantity: yup.number().required("تعداد الزامیست"),
      })
    ),
    highlights: yup.array().of(
      yup.object().shape({
        name: yup.string().required("ویژگی الزامیست"),
      })
    ),
  });

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      highlights: [{ name: "" }],
      variants: [{ colorId: "", sizeId: "", quantity: "" }],
    },
  });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: "highlights",
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    if (editedItem !== null) {
      reset(editedItem);
    } else {
      reset({});
    }
  }, [editedItem]);

  const uploadHandler = async (img) => {
    let formData = new FormData();
    formData.append("image", img);
    const res = await uploadImage(formData);
    return res.filename;
  };

  const submitForm = async (data) => {
    console.log(data);
    let image = await uploadHandler(data.image[0]);

    if (editedItem !== null) {
      if (!image) {
        image = data.image;
      }
    }

    const newProduct = {
      name: data.name,
      image: image,
      thumbnail: image,
      price: Number(data.price),
      category: Number(data.category),
      subcategory: Number(data.subcategory),
      createdAt: data.createdAt,
      description: data.description,
      details: data.details,
      variants: data.variants,
      breadcrumbs: breadcrumbs,
      highlights: data.highlights,
      reviews: reviews,
    };
    try {
      if (editedItem !== null) {
        const result = await editProductService(editedItem.id, newProduct);
      } else {
        const result = await addProductService(newProduct);
      }
      dispatch(fetchProducts(paginationParams()));
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
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto relative my-6 mx-auto">
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
                    <div className="flex justify-between items-center gap-2">
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
                    <div className="">
                      <FileField
                        id="image"
                        lable="تصویر کالا"
                        name="image"
                        multiple
                        error={errors.image?.message}
                        validation={{ ...register("image") }}
                      />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <div className="basis-1/3">
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
                      </div>
                      <div className="basis-1/3 flex flex-col">
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
                      <div className="basis-1/3 flex flex-col">
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
                    <div className="flex justify-between items-center gap-1">
                      <div className="basis-1/3 flex flex-col">
                        <label htmlFor="description">توضیحات</label>
                        <textarea
                          id="description"
                          className="h-50 rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("description")}
                        ></textarea>
                        <p>{errors.description?.message}</p>
                      </div>
                      <div className="basis-1/3 flex flex-col ">
                        <label htmlFor="details">جزییات</label>
                        <textarea
                          id="details"
                          className="h-50 rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("details")}
                        >
                          {" "}
                        </textarea>
                        <p>{errors.details?.message}</p>
                      </div>
                      <div className="basis-1/3 flex flex-col">
                        <label>ویژگی‌ها</label>
                        {highlightFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="flex items-center gap-1 mb-1"
                          >
                            <input
                              type="text"
                              className="flex-1 rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                              placeholder="مثال: نرمی و زبری: نرم"
                              {...register(`highlights.${index}.name`)}
                            />
                            <button
                              type="button"
                              onClick={() => removeHighlight(index)}
                              className="text-red-500"
                            >
                              حذف
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => appendHighlight({ name: "" })}
                          className="text-indigo-600 text-sm mt-1"
                        >
                          + افزودن ویژگی
                        </button>
                        <p className="text-red-500">
                          {errors.highlights?.message}
                        </p>
                      </div>
                    </div>
                    <div className="border-t pt-4 mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        تنوع‌ها (رنگ، سایز، موجودی)
                      </label>
                      {variantFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex gap-2 mt-2 items-center"
                        >
                          <select
                            {...register(`variants.${index}.colorId`)}
                            className="w-1/3 rounded-md border-0 p-2 ring-1 ring-inset ring-gray-300"
                          >
                            <option value="">رنگ</option>
                            {colorsData.map((color) => (
                              <option key={color.id} value={color.id}>
                                {color.fname}
                              </option>
                            ))}
                          </select>
                          <select
                            {...register(`variants.${index}.sizeId`)}
                            className="w-1/3 rounded-md border-0 p-2 ring-1 ring-inset ring-gray-300"
                          >
                            <option value="">سایز</option>
                            {sizesData.map((size) => (
                              <option key={size.id} value={size.id}>
                                {size.name}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            placeholder="موجودی"
                            {...register(`variants.${index}.quantity`)}
                            className="w-1/3 rounded-md border-0 p-2 ring-1 ring-inset ring-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="text-red-500"
                          >
                            حذف
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          appendVariant({
                            colorId: "",
                            sizeId: "",
                            quantity: "",
                          })
                        }
                        className="text-indigo-600 text-sm mt-2"
                      >
                        + افزودن تنوع
                      </button>
                      <p className="text-red-500">{errors.variants?.message}</p>
                    </div>

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
