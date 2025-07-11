import { instance } from "../../constants";

export const fetchProductService = async (params) => {
  let response;
  let count;
  try {
    if (params) {
      response = await instance.get(`/products?${params}`);
      count = response.headers["x-total-count"];
    } else {
      response = await instance.get(`/products`);
      const allData = await response.data;
      count = await allData.length;
    }

    return {
      productsData: response.data,
      count: count,
      //queryParams: params.toString(),
    };
  } catch (e) {
    console.log(e.message);
  }
};
