import { instance } from "../../constants";

export const fetchCartService = async (params) => {
  let response;
  let count;
  try {
    if (params) {
      response = await instance.get(`/cart?${params}`);
      count = await response.data.length;
    } else {
      response = await instance.get(`/cart`);
      count = await response.data.length;
    }
    return {
      cartData: response.data,
      count: count,
    };
  } catch (error) {
    console.log(error);
  }
};
