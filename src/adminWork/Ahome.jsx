import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import itemContext from "../context/items/Itemcontext";

import Sidebar from "./Sidebar";

export default function Ahome() {
  const context = useContext(itemContext);
  let history = useHistory();
  const { item, getItems } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getItems();
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <div className="row">
      <div className="col-md-4">
        <Sidebar />
      </div>
      <div className="col-md-8" >
        <div className="row mx-2 my-2">
          <table>
            <tr>
              <th>
                <div className="col-6">Item Name</div>
              </th>
              <th>
                <div className="col-6">Item Quantity</div>
              </th>
            </tr>
          </table>
        </div>
        {item.map((item) => {
          return (
            <div className="row my-2">
            <div className="col-md-6">
              <label htmlFor="" className="col-form-label">
                {item.itemName}
              </label>
            </div>
            <div className="col-md-6">
              <label htmlFor="" className="col-form-label">
                {item.itemQuantity}
              </label>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
