import { instance } from "../../constants";

export const editProductService = async (id,data) => {
    const res = await instance.put(`/products/${id}`, data);
    return res.data;
}