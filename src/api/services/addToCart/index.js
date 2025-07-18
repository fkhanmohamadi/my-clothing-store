import { instance } from "../../constants";

export const addToCartService = async ({ userid, product }) => {
  const { productid, colorId, sizeId } = product;

  let response;
  let count;
  try {
    // بررسی وجود محصول مشابه در سبد
    response = await instance.get(
      `/cart?userid=${userid}&productid=${productid}&colorId=${colorId}&sizeId=${sizeId}`
    );

    const existing = response.data[0];

    if (existing) {
      // اگر بود فقط count رو افزایش بده
      const updated = await instance.patch(`/cart/${existing.id}`, {
        count: existing.count + product.count,
      });
      return updated.data;
    } else {
      // اگر نبود محصول جدید رو اضافه کن
      const newItem = await instance.post("/cart", {
        ...product,
        userid,
      });
      return newItem.data;
    }
  } catch (e) {
    console.log(e.message);
  }
};
