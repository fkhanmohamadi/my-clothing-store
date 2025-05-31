import { instance } from "../../constants";

export const deleteProductService = async (id) => {
    const res = await instance.delete(`/products/${id}`);
    return res.data;
}