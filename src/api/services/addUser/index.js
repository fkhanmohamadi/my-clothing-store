import { instance } from "../../constants";

export const addUserService = async (user) => {
  try {
      const newUser = await instance.post("/users", {
        ...user,
      });
            console.log("add",newUser)
      return newUser.data;
  } catch (e) {
    console.log(e.message);
  }
};
