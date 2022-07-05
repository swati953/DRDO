import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomerOrder from "../context/customerOrders/CustomerOrder";
import Sidebar from "./Sidebar";
const YourOrders = () => {
  let history = useHistory();
  const cust_context = useContext(CustomerOrder);
  const { customerOrder, getMyOrders } = cust_context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getMyOrders();
      console.log(customerOrder);
    } else {
      history.push("/addtocart");
    }
  }, []);
  return (
    <div className="row" style={{width:'100%',margin:'0'}}>
      <div className="col-md-4 p-0" >
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
              <th>
                <div className="col-6">Status</div>
              </th>
            </tr>
          </table>
        </div>
        {customerOrder.map((item) => {
          return (
            <div className="row my-3">
              <div className="col-3">
                <label htmlFor="" className="col-form-label">
                  {item.customerItemIname}
                </label>
              </div>
              <div className="col-3">
                <label htmlFor="" className="col-form-label">
                  {item.customerItemQuantity}
                </label>
              </div>
              <div className="col-3">
                <label htmlFor="" className="col-form-label">
                  {item.status}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YourOrders;
