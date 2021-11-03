import React from "react";
import { useState } from "react/cjs/react.development";

import Itemcontext from "./Itemcontext";

const Itemstate = (props) => {
  const host = "http://localhost:5000"; //on this server we make request that's in our backend folder.

  const itemInitial = [
    // {
    //   _id: "6171509d82091c79605292f2",
    //   itemName: "Eraser",
    //   itemQuantity: "45",
    //   date: "2021-10-21T11:35:57.134Z",
    //   __v: 0,
    // },
    // {
    //   _id: "6171512418dbcb0231948a67",
    //   itemName: "pen",
    //   itemQuantity: "45",
    //   date: "2021-10-21T11:38:12.377Z",
    //   __v: 0,
    // },
  ];
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
  const addItem = async (itemName, itemQuantity) => {
  
      //Adding item
      const response = await fetch(`${host}/api/store/additem`, {
        method: "POST", //post request to add items
        headers: {
          //all the adders
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')//ye hme last ma use kerna ha after making login and sigin
          // "auth-token":
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZmY0MjI1MmFmZWIzNTdkYzZkZjQ1In0sImlhdCI6MTYzNDcyODg1M30.kjXX9uFiZ6MFzdg0ff_mQKAlHgI3TnWjMh7aGBGbIt0", // use just for checking compelet application
        },
        body: JSON.stringify({ itemName, itemQuantity }), //converts a JavaScript object or value to a JSON string,
      });
      const item1 = await response.json();
      console.log(item);
      setItem(item.concat(item1));
  
  };


  return (
    <Itemcontext.Provider value={{ item, addItem, getItems }}>
      {props.children}
    </Itemcontext.Provider>
  );
};
export default Itemstate;
