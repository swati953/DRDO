import React, { useContext } from "react";
import itemContext from "../context/items/Itemcontext";

export default function Fetchitems(props) {
  const context = useContext(itemContext); //use ker re ha context ko yha pe
  const { item } = context;
  console.log(item);
  return (
    <div className="container">
      <form>
        {item.map((item) => {
          return (
            <div className="row">
              <div class="form-group col-md-6 my-3 ">
                <label
                  for="inputEmail3"
                  style={{ border: "0.3rem solid black" }}
                >
                  {item.itemName}
                </label>
              </div>
              <div class="form-group col-md-6  my-3 ">
                <label
                  for="inputEmail3"
                  style={{ border: "0.3rem solid black" }}
                >
                  {item.itemQuantity}
                </label>
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
}
