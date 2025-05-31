import { instance } from "../../constants";

export const editOrderService = async (id,data) => {
    const res = await instance.put(`/orders/${id}`, data);
    return res.data;
}