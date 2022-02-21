import React from "react";
import { useState } from "react/cjs/react.development";

import Itemcontext from "./Itemcontext";

const Itemstate = (props) => {
  const host = "http://localhost:5000"; //on this server we make request that's in our backend folder.

  const itemInitial = [];
  const [item, setItem] = useState(itemInitial);
  //get all items al notes
  const getItems = async () => {
    //api call to bring notes on frontend
    const response = await fetch(`${host}/api/store/fetchallitems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        //"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZmY0MjI1MmFmZWIzNTdkYzZkZjQ1In0sImlhdCI6MTYzNDcyODg1M30.kjXX9uFiZ6MFzdg0ff_mQKAlHgI3TnWjMh7aGBGbIt0",
      },
    });
    const json = await response.json();
    console.log(json);
    setItem(json);
  };
  const addItem = async (id, itemName, itemQuantity) => {
    //Adding item
    const response = await fetch(`${host}/api/store/additem`, {
      method: "POST", //post request to add items
      headers: {
        //all the adders
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"), //ye hme last ma use kerna ha after making login and sigin
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZmY0MjI1MmFmZWIzNTdkYzZkZjQ1In0sImlhdCI6MTYzNDcyODg1M30.kjXX9uFiZ6MFzdg0ff_mQKAlHgI3TnWjMh7aGBGbIt0", // use just for checking compelet application
      },
      body: JSON.stringify({id, itemName, itemQuantity  }), //converts a JavaScript object or value to a JSON string,
    });
    const item1 = await response.json();
    console.log(item);
    setItem(item.concat(item1));
  };
  //edit note
  const editItem = async (id, itemName, itemQuantity) => {
    //Adding item
    const response = await fetch(`${host}/api/store/updateitem/${id}`, {
      method: "PUT", //post request to add items
      headers: {
        //all the adders
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"), //ye hme last ma use kerna ha after making login and sigin
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZmY0MjI1MmFmZWIzNTdkYzZkZjQ1In0sImlhdCI6MTYzNDcyODg1M30.kjXX9uFiZ6MFzdg0ff_mQKAlHgI3TnWjMh7aGBGbIt0", // use just for checking compelet application
      },
      //body have new content
      body: JSON.stringify({ itemName, itemQuantity }), //converts a JavaScript object or value to a JSON string,
    });
    const json = await response.json();
    let item1 = JSON.parse(JSON.stringify(item));

    for (let index = 0; index < item1.length; index++) {
      const element = item1[index];
      if (element._id === id) {
        item1[index].itemName = itemName;
        item1[index].itemQuantity = itemQuantity;
        break;
      }
    }

    setItem(item1);
  };
  //delete note
  const deleteItem = async (id) => {
    //API call
    const response = await fetch(`${host}/api/store/deleteitem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    //  console.log(json);
    //add note
    // console.log("deleting the note wth id : " + id);
    const newItem = item.filter((item) => {
      return item._id !== id;
    });
    setItem(newItem);
  };

  return (
    <Itemcontext.Provider
      value={{ item, addItem, getItems, deleteItem, editItem }}
    >
      {" "}
      {props.children}
    </Itemcontext.Provider>
  );
};
export default Itemstate;
