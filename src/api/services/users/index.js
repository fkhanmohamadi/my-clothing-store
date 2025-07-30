import { instance } from "../../constants";

export const fetchUsersService = async () => {
  let response;
  let allData;
  let count;
  try {
    response = await instance.get(`/users`);
    allData = await response.data;
    count = await allData.length;
    return {
      usersData: allData,
      count: count,
    };
  } catch (e) {
    console.log(e.message);
  }
};
