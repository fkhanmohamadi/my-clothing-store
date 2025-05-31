import {instance} from '../../constants';

export const fetchSubcategoryService = async () => {
    let count;
    try {
      const response = await instance.get(
        `/subcategory`
      );
      const allData = await response.data;
      count = await allData.length;
      return {
        subcategoryData: response.data,
        count: count
      };
    } catch (e) {
      console.log(e.message);
    }
  };