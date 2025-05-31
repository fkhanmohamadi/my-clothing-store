import { instance } from "../../constants";

export const addProductService = async (data) => {
    const res = await instance.post('/products', data);
    return res.data;
}