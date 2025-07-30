import { instance } from "../../constants";

export const fetchOrderService = async (params) => {
  const queryString = new URLSearchParams(params).toString();

  try {
    const response = await instance.get(`/orders?${queryString}`);
    const allData = response.data;
    const count = parseInt(response.headers["x-total-count"]) || allData.length;

    return {
      ordersData: allData,
      count,
      queryParams: params ? params.toString() : "",
    };
  } catch (e) {
    console.log(e.message);
  }
};
