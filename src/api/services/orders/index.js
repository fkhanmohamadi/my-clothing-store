import { instance } from "../../constants";

// export const fetchOrderService = () => instance.get("/orders");

export const fetchOrderService = async (params) => {
  let count;
  try {
    const response = await instance.get(
      `/orders?${params}`
    );
    const countRes = await instance.get(`/orders?delivered=${params.get("delivered")}`);
    const allData = await countRes.data;
   
    count = await allData.length;
    return {
      ordersData: response.data,
      count: count,
      queryParams: params.toString(),
    };
  } catch (e) {
    console.log(e.message);
  }
};
