import { instance } from "../../constants";

export const editQuantityService = async (id,data) => {
    const res = await instance.patch(`/products/${id}`, data);
    return res.data;
}