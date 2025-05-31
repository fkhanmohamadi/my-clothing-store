import {instance} from '../../constants';

export const fetchProductService = async (params) => {
    let count;
    try {
      const response = await instance.get(
        `/products?${params}`
      );
      const countRes = await instance.get(`/products`);
      // const allData = await countRes.data;
      // count = await allData.length;
      count = response.headers["x-total-count"]
      return {
        productsData: response.data,
        count: count,
        queryParams: params.toString(),
      };
    } catch (e) {
      console.log(e.message);
    }
  };

  