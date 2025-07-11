import React from "react";

function LoadMore({ handleLoadMore }) {
  return (
    <div className="mt-12 text-center">
      <button
        onClick={handleLoadMore}
        className=" px-4 py-2 bg-gray-700 text-white text-sm rounded-full hover:bg-gray-800 transition"
      >
        نمایش بیشتر
      </button>
    </div>
  );
}

export default LoadMore;
