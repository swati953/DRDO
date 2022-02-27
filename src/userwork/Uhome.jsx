import React, { useContext, useEffect } from "react";
import Sidebar from "./Sidebar";

import { useHistory } from "react-router";

import CartContext from "../context/usercart/Usercontext";
import CustomerOrder from "../context/customerOrders/CustomerOrder";
const Uhome = () => {
  const context = useContext(CartContext);
  let history = useHistory();
  const { cart, getCartItems, deleteItemFromCart } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCartItems();
    } else {
      history.push("/login");
    }
  }, []);
  
  return (
    <div className="row">
      <div className="col-md-4">
        <Sidebar />
      </div>

      <div className="col-md-8">
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
        {cart.map((item) => {
          // {console.log(item,'item-cart');}
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
              <div className="col-md-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    deleteItemFromCart(
                      item._id,
                      item.itemName,
                      item.itemQuantity
                    );
                  }}
                >
                  Remove item
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Uhome;
