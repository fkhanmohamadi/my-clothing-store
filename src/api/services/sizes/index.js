import {instance} from '../../constants';

export const fetchSizesService = async () => {
    let count;
    try {
      const response = await instance.get(
        `/sizes`
      );
      count = response.headers["x-total-count"]
      return {
        sizesData: response.data,
        count: count
      };
    } catch (e) {
      console.log(e.message);
    }
  };