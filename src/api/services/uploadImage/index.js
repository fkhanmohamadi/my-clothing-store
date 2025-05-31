import { instance } from "../../constants";

export const uploadImage = async (data) => {
    const res = await instance.post('/upload', data);
    return res.data;
}