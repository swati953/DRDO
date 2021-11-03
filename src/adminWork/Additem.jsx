import React, { useContext, useState } from "react";
import itemContext from "../context/items/Itemcontext";
import Sidebar from "./Sidebar";

export default function Additem(props) {
  const context = useContext(itemContext); //use ker re ha context ko yha pe
   const { addItem } = context; // context mesa jo use kerna ha usa destruct ker lea
  const [item, setItem] = useState({
    //use state bnai yha takki unhe bina class bnaye all over project ma use ker ske
    //yha woh sare attributes ayenge jo hme add kerna ha ITEM se realted at the time of addItem
    itemName: "",
    itemQuantity: "",
  });
  const handleClick = (e) => {
    e.preventDefault(); //page reload ni hone dega
    console.log(item.itemName, item.itemQuantity);
    addItem(item.itemName, item.itemQuantity); //calling add note by passing state variables as argumnets
    setItem({
      //ye islea kea takki akk bare add hone ke badd sare state clear ho jaye
      itemName: "",
      itemQuantity: "",
    });
  };
  const onchange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  return (
    <div className="row">
    <div className="col-md-4">
        <Sidebar/>
    </div>
    <div className="col-md-8" style={{backgroundColor:"blue"}}>
    <div className="container">
      <form>
        <div class="form-group row my-3 ">
          <label for="itemName" class="col-sm-2 col-form-label">
            Item Name
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="itemName"
              placeholder="ItemName"
              onChange={onchange} //to reflect changes in state
              name="itemName" //use this to make changes
              value={item.itemName}
            />
          </div>
        </div>
        <div class="form-group row my-3 ">
          <label for="itemQuantity" class="col-sm-2 col-form-label">
            Item Quantity
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="itemQuantity"
              placeholder="ItemQuantity"
              onChange={onchange} //to reflect changes in state
              name="itemQuantity" //use this to make changes
              value={item.itemQuantity}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          ADD Item
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}
