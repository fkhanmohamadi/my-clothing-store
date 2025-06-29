import {instance} from '../../constants';

export const fetchcategorySubcategoryRelService = async () => {
    let count;
    try {
      const response = await instance.get(
        `/categorySubcategoryRel`
      );
      const allData = await response.data;
      count = await allData.length;
      
      return {
        categorySubcategoryRelData: allData,
        count: count
      };
    } catch (e) {
      console.log(e.message);
    }

  };

