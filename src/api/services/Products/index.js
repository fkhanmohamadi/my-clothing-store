import { instance } from "../../constants";

export const fetchProductService = async (params) => {
  let response;
  let count;
  let allData;
  try {
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      response = await instance.get(`/products?${queryString}`);
      allData = response.data;
      count = parseInt(response.headers["x-total-count"]) || allData.length;
    } else {
      response = await instance.get(`/products`);
      allData = await response.data;
      count = await allData.length;
    }
    return {
      productsData: allData,
      count: count,
      queryParams: params ? params.toString() : "",
    };
  } catch (e) {
    console.log(e.message);
  }
};
