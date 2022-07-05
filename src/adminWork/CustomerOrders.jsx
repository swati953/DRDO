import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomerOrder from "../context/customerOrders/CustomerOrder";
import Sidebar from "./Sidebar";

const CustomerOrders = () => {
  let history = useHistory();
  const cust_context = useContext(CustomerOrder);
  const { customerOrder, getCustomerOrders, changeStatus } = cust_context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCustomerOrders();
      console.log(customerOrder);
    } else {
      history.push("/addtocart");
    }
  }, []);
  const handleChangeStatus = (id, status) => {
    console.log("hahall");

   // changeStatus("621a329e8a4960365d12ed1f", "accepted");
  };
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
              <th>
                <div className="col-6">Status</div>
              </th>
            </tr>
          </table>
        </div>
        {customerOrder.map((item) => {
          return (
            <div className="row my-2">
              <div className="col-md-3">
                <label htmlFor="" className="col-form-label">
                  {item.customerItemIname}
                </label>
              </div>
              <div className="col-md-3">
                <label htmlFor="" className="col-form-label">
                  {item.customerItemQuantity}
                </label>
              </div>
              <div className="col-md-3">
                <label htmlFor="" className="col-form-label">
                  {item.status}
                </label>
              </div>
              <div className="col-md-3">
                <button
                class="btn  btn-primary mx-2"
                  onClick={handleChangeStatus(item._id,'accepeted')}
                >
                  Accepted 
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerOrders;
