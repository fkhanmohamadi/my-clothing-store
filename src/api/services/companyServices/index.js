import {instance} from '../../constants';

export const fetchCompanyServicesService = async () => {
    let count;
    try {
      const response = await instance.get(
        `/services`
      );
      const allData = await response.data;
      count = await allData.length;
      return {
        servicesData: response.data,
        count: count
      };
    } catch (e) {
      console.log(e.message);
    }
  };