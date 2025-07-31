import { instance } from "../../constants";

export const fetchProductService = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await instance.get(`/products?${queryString}`);
    const allData = response.data;
    const count = parseInt(response.headers["x-total-count"]) || allData.length;
    return {
      productsData: allData,
      count: count,
      queryParams: params.toString(),
    };
  } catch (e) {
    console.log(e.message);
  }
};
