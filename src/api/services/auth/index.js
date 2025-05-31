import { instance } from "../../constants";

export const loginService = async (data) => {
    const res = await instance.post('/auth/login', data);
    return res.data;
}