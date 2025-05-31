import React, { useState } from "react";

function QuantityTableTD({ id, value, setEditProdect, children}) {
  const [productTd, setProductTd ] = useState(false);
  
    const productChangeHandler = (e) =>{
      setEditProdect(arr => [...arr, {id: id,item: e.target.value,}]);
    }

  return (
    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {productTd ? (
        <input type="text" defaultValue={value} onBlur={(e)=>productChangeHandler(e)}></input>
      ) : (
        <div onClick={()=>{setProductTd(true)}}>
          {children}
        </div>
      )}
    </td>
  );
}

export default QuantityTableTD;
