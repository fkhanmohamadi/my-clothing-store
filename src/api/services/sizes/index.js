import { instance } from "../../constants";

export const fetchSizesService = async () => {
  let count;
  try {
    const response = await instance.get(`/sizes`);
    const allData = await response.data;
    count = await allData.length;
    return {
      sizesData: allData,
      count: count,
    };
  } catch (e) {
    console.log(e.message);
  }
};
