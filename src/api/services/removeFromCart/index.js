import { instance } from "../../constants";

export const removeFromCartService = async (itemId) => {
  console.log(itemId)
  try {
    const response = await instance.delete(`/cart/${itemId}`);
    return { response, itemId };
  } catch (error) {
    console.log(err);
  }
};
