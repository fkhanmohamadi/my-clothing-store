import {instance} from '../../constants';

export const fetchCategoryService = async () => {
    let count;
    try {
      const response = await instance.get(
        `/category`
      );
      const allData = await response.data;
      count = await allData.length;
      return {
        categoryData: response.data,
        count: count
      };
    } catch (e) {
      console.log(e.message);
    }
  };