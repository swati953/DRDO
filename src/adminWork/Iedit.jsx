import React, { useState } from "react";
import { useContext } from "react/cjs/react.development";
import itemContext from "../context/items/Itemcontext";
import Sidebar from "./Sidebar";

export default function Iedit() {
  const context = useContext(itemContext); //use ker re ha context ko yha pe
  const { item, deleteItem, editItem } = context;
  const deleteItem1 = () => {};
  const editItem1 = () => {};
  const [notEdit, setNotEdit] = useState("block");
  const [nowEdit, setNowEdit] = useState("none");
  const [select, setSelect] = useState(-1);
  const [itemState, setItemState] = useState({
    id: "",
    itemName: "",
    itemQuantity: "",
  });
  const onchange = (e) => {
    setItemState({ ...itemState, [e.target.name]: e.target.value });
  };
  const handleEdit=(currentItem)=>{
    setItemState({
      id: currentItem._id,
      itemName: currentItem.itemName,
      itemQuantity: currentItem.itemQuantity,
    });
  }
  const handleUpdate=(e)=>{
    editItem(itemState.id,itemState.itemName,itemState.itemQuantity)
    setNotEdit("block");
     setNowEdit("none");
  }
  return (
    <div className="row">
      <div className="col-md-4">
        <Sidebar />
      </div>
      <div className="col-md-8">
        {item.map((item, i) => {
          return (
            <div className="row my-3">
              <div className="col-3">
                <label
                  htmlFor=""
                  className="col-form-label"
                  style={{ display: i === select ? notEdit : "block" }}
                >
                  {item.itemName}
                </label>
                <input
                  type="text"
                  placeholder={item.itemName}
                  style={{ display: i === select ? nowEdit : "none" }}
                  onChange={onchange}
                  name="itemName"
                  value={itemState.itemName}
                />
              </div>

              <div className="col-3">
                <label
                  htmlFor=""
                  className="col-form-label"
                  style={{ display: i === select ? notEdit : "block" }}
                 
                >
                  {item.itemQuantity}
                </label>
                <input
                  type="text"
                  placeholder={item.itemQuantity}
                  style={{ display: i === select ? nowEdit : "none" }}
                  onChange={onchange}
                  name="itemQuantity"
                  value={itemState.itemQuantity}
                />
              </div>
              <div className="col-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    setSelect(i);

                    setNotEdit("none");
                    setNowEdit("block");
                    handleEdit(item);
                    // editItem(item._id,item.itemName,item.itemQuantity)
                  }}
                  style={{ display: i === select ? notEdit : "block" }}
                >
                  Edit Item
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ display: i === select ? nowEdit : "none" }}
                  onClick={handleUpdate}
                >
                  Update item
                </button>
              </div>
              <div className="col-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Delete Item
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
