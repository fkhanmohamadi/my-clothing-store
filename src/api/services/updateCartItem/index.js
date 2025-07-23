import { instance } from "../../constants";

export const updateCartItemService = async (param) => {
  const response = await instance.put(`/cart/${param.id}`, param);
  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
