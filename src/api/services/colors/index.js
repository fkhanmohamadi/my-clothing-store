import { instance } from "../../constants";

export const fetchColorsService = async () => {
  let count;
  try {
    const response = await instance.get(`/colors`);
    const allData = await response.data;
    count = await allData.length;
    return {
      colorsData: allData,
      count: count,
    };
  } catch (e) {
    console.log(e.message);
  }
};
