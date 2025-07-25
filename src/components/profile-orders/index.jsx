import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../states/slices/ordersSlice";

function ProfieOrders() {
  const dispatch = useDispatch();
 
    ////// user
    const { isLoggedIn, userInfo } = useSelector((state) => state.auth);
    const userId = userInfo?.id || 0;
  
    ////// cart
    const orders = useSelector((state) => state.orders);
    const ordersData = orders?.data?.ordersData || [];

  console.log(ordersData)

  useEffect(() => {
    dispatch(fetchOrders(userId));
  }, []);

  return (
    <div className="col-span-8 rounded">
      {ordersData?.map((item) => (
        item.products.map((product)=>(
                  <div
          key={product.id}
          className="grid grid-cols-12 border-t border-t-gray-300 p-4"
        >
          <div className="col-span-3 rounded">
            <img src={product.image} alt="product image" className="h-20" />
          </div>
          <div className="col-span-6 flex flex-col justify-between rounded">
            <div className="flex flex-col gap-y-1">
              <p className="font-semibold">{product.productname}</p>
              <p>{Number(product.price).toLocaleString("fa-IR")} تومان</p>
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-y-1">
              <p className="font-semibold">{product.count} عدد</p>
              <span>
                {(product.price * product.count).toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        </div>
        ))

      ))}
    </div>
   
  );
}

export default ProfieOrders;
