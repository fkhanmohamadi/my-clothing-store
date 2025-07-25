import { instance } from "../../constants";


export const fetchOrderService = async (params) => {
  let response;
  let count;
  try {
    response = await instance.get( `/orders?${params}`);
    // const countRes = await instance.get(`/orders?delivered=${params.get("delivered")}`);
    // const allData = await countRes.data;   
    count = await response.data.length;
    return {
      ordersData: response.data,
      count: count,
      queryParams: params.toString(),
    };
  } catch (e) {
    console.log(e.message);
  }
};