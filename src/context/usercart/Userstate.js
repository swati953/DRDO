import React from "react";
import { useState } from "react/cjs/react.development";

import Cartcontext from "./Usercontext";

const Userstate = (props) => {
  const host = "http://localhost:5000"; //on this server we make request that's in our backend folder.

  const itemInitial = [];
  const [cart, setCart] = useState(itemInitial);
  const getCartItems = async () => {
    //api call to bring notes on frontend
    const response = await fetch(`${host}/api/cart/fetchcartitem`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        //"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZmY0MjI1MmFmZWIzNTdkYzZkZjQ1In0sImlhdCI6MTYzNDcyODg1M30.kjXX9uFiZ6MFzdg0ff_mQKAlHgI3TnWjMh7aGBGbIt0",
      },
    });
    const json = await response.json();
    console.log(json);
    setCart(json);
  };
  //Adding item

  const addItemInCart = async (itemId, itemName, itemQuantity) => {
    const response = await fetch(`${host}/api/cart/additemtocart`, {
      method: "POST", //post request to add items
      headers: {
        //all the adders
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"), //ye hme last ma use kerna ha after making login and sigin
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZmY0MjI1MmFmZWIzNTdkYzZkZjQ1In0sImlhdCI6MTYzNDcyODg1M30.kjXX9uFiZ6MFzdg0ff_mQKAlHgI3TnWjMh7aGBGbIt0", // use just for checking compelet application
      },
      body: JSON.stringify({ itemId, itemName, itemQuantity }), //converts a JavaScript object or value to a JSON string,
    });
    const item1 = await response.json();
    console.log(JSON.stringify(item1)+'<--------');
    setCart(cart.concat(item1));
  };
  const deleteItemFromCart = async (id) => {
    const response = await fetch(`${host}/api/cart/deleteItemFromCart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newItem = cart.filter((item) => {
      return item._id !== id;
    });
    setCart(newItem);
  };
  return (
    <Cartcontext.Provider
      value={{ cart, getCartItems, addItemInCart, deleteItemFromCart }}
    >
      {props.children}
    </Cartcontext.Provider>
  );
};
export default Userstate;
