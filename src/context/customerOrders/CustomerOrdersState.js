import React from "react";
import { useState } from "react/cjs/react.development";

import CustomerOrder from "./CustomerOrder";
const CustomerOrderState = (props) => {
  const host = "http://localhost:5000"; //on this server we make request that's in our backend folder.

  const itemInitial = [];
  const [customerOrder, setCustomerOrder] = useState(itemInitial);
  const addCustomerOrder = async (
    customerId,
    customerName,
    customerItemId,
    customerItemIname,
    customerItemQuantity
  ) => {
    const response = await fetch(`${host}/api/customerOrders/addOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        customerId,
        customerName,
        customerItemId,
        customerItemIname,
        customerItemQuantity,
      }), //converts a JavaScript object or value to a JSON string,
    });
    const itemToAdd = await response.json();
    console.log(JSON.stringify(itemToAdd) + "<--------");
    setCustomerOrder(customerOrder.concat(itemToAdd));
  };
  const getCustomerOrders = async () => {
    const response = await fetch(
      `${host}/api/customerOrders/fetchCustomerOrders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setCustomerOrder(json);
  };
  const getMyOrders = async () => {
    const response = await fetch(`${host}/api/customerOrders/fetchMyOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setCustomerOrder(json);
  };
  const changeStatus = async (_id, status) => {
    const response = await fetch(
      `${host}/api/customerOrders/updateCustomerOrders/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ status }),
      }
    );
    const json = await response.json();
    let item1 = JSON.parse(JSON.stringify(customerOrder));
    console.log(_id, "2item1");
    for (let index = 0; index < item1.length; index++) {
      const element = item1[index];
      if (element.itemId === _id) {
        item1[index].status = status;

        break;
      }
    }

    setCustomerOrder(item1);
  };
  return (
    <CustomerOrder.Provider
      value={{
        customerOrder,
        addCustomerOrder,
        getCustomerOrders,
        getMyOrders,
        changeStatus,
      }}
    >
      {props.children}
    </CustomerOrder.Provider>
  );
};
export default CustomerOrderState;
