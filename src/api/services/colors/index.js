import {instance} from '../../constants';

export const fetchColorsService = async () => {
    let count;
    try {
      const response = await instance.get(
        `/colors`
      );
      count = response.headers["x-total-count"]
      return {
        colorsData: response.data,
        count: count
      };
    } catch (e) {
      console.log(e.message);
    }
  };