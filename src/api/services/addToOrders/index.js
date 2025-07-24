import { instance } from "../../constants";

export const addToOrderService = async (orders) => {
  try {
    const response = await instance.post("/orders", { ...orders });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
