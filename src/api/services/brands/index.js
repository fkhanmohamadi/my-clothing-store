import {instance} from '../../constants';

export const fetchBrandsService = async () => {
    let count;
    try {
      const response = await instance.get(
        `/brands`
      );
      const allData = await response.data;
      count = await allData.length;
      return {
        brandsData: response.data,
        count: count
      };
    } catch (e) {
      console.log(e.message);
    }
  };