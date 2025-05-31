import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../../states/slices/ordersSlice";
import { fetchProducts } from "../../states/slices/productsSlice";

function Pagination({
  paginationParams,
  setPaginationParams,
  count,
  active,
  setActive,
}) {
  const dispatch = useDispatch();

  const changePage = (e) => {
    if (e.target.tagName === "DIV") return;
    if (e.target.tagName === "NAV") return;

    const pageNum = e.target.innerHTML;

    setActive(pageNum);

    // console.log("pageNum:", pageNum);
    // console.log("_limit:", paginationParams.get("_limit"));
    // console.log("delivered:", paginationParams.get("delivered"));
    // console.log("_sort", paginationParams.get("_sort"));
    // console.log("_order", paginationParams.get("_order"));

    if (
      paginationParams.get("delivered") &&
      paginationParams.get("_sort") &&
      paginationParams.get("_order")
    ) {
      setPaginationParams({
        _page: pageNum,
        _limit: paginationParams.get("_limit"),
        delivered: paginationParams.get("delivered"),
        sort: paginationParams.get("_sort"),
        order: paginationParams.get("_order"),
      });
      dispatch(fetchOrders(paginationParams));
    } else if (
      paginationParams.get("delivered") &&
      !paginationParams.get("_sort") &&
      !paginationParams.get("_order")
    ) {
      setPaginationParams({
        _page: pageNum,
        _limit: paginationParams.get("_limit"),
        delivered: paginationParams.get("delivered"),
      });
      console.log(...paginationParams)
      dispatch(fetchOrders(paginationParams));
    } else if (
      !paginationParams.get("delivered") &&
      !paginationParams.get("_sort") &&
      !paginationParams.get("_order")
    ) {
      setPaginationParams({
        _page: pageNum,
        _limit: paginationParams.get("_limit"),
      });
      dispatch(fetchProducts(paginationParams));
    }
  };

  useEffect(() => {
    setActive("1");
  }, []);

  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(count / paginationParams.get("_limit"));
    number++
  ) {
    items.push(
      <a
        key={number}
        href="#"
        aria-current="page"
        className={`relative z-10 inline-flex items-center ${
          active == number ? "bg-indigo-600" : "bg-indigo-300"
        }  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      >
        {number}
      </a>
    );
  }
  return (
    <div
      dir="ltr"
      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
      onClick={changePage}
    >
      {items}
    </div>
  );
}

export default Pagination;
