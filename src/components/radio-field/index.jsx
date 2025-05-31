import React from "react";

function RadioField({ onchanged, delivered }) {
  return (
    <div className="flex gap-10">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          id="delivered"
          name="delivery"
          value="true"
          checked={delivered}
          onChange={onchanged}
        />
        <label className="text-sm text-gray-500	" htmlFor="delivered">
          سفارش های تحویل شده
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          id="undelivered"
          name="delivery"
          value="false"
          checked={!delivered}
          onChange={onchanged}
        />
        <label className="text-sm text-gray-500	" htmlFor="undelivered">
          سفارش های در انتظار ارسال
        </label>
      </div>
    </div>
  );
}

export default RadioField;
