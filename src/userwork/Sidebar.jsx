import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CartContext from "../context/usercart/Usercontext";
import CustomerOrder from "../context/customerOrders/CustomerOrder";

export default function Sidebar() {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const cust_context = useContext(CustomerOrder);
  const { addCustomerOrder } = cust_context;
  const cartContext = useContext(CartContext);
  const { cart } = cartContext;
  const handlePost = () => {
    cart.map((item) => {
      addCustomerOrder(
        item.user,
        "Not defined",
        item.itemId,
        item.itemName,
        item.itemQuantity
      );
    });
  };
  return (
    // <div className="row">
    //   <div className="col-md-4">
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: " 280px;" }}
    >
      <Link
        to="/uhome"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <i className="fas fa-user-cog bi me-2" width="40" height="32"></i>
        {/* <img className="bi me-2" width="40" height="32" /> */}
        <span className="fs-4">Welcome User</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link to="/YourOrder" className={`nav-link ${
              location.pathname === "/YourOrder" ? "active" : "text-white"
            }`}>
            <i className="fas fa-plus bi me-2" width="16" height="16"></i>
            Your Orders
          </Link>
        </li>
        <li>
          <Link
            to="/addtocart"
            className={`nav-link ${
              location.pathname === "/addtocart" ? "active" : "text-white"
            }`}
          >
            <i className="fas fa-plus bi me-2" width="16" height="16"></i>
            Add Item in your Cart
          </Link>
        </li>
        <li className="nav-item">
          <div>
            <Link
              style={{ width: "70%" }}
              to="/uhome"
              className={`nav-link ${
                location.pathname === "/uhome" ? "active" : "text-white"
              }`}
              aria-current="page"
            >
              <i className="fas fa-store bi me-2" width="16" height="16"></i>All
              Item
            </Link>
          </div>
        </li>
        <li>
          <button className="btn  btn-warning  nav-item" onClick={handlePost}>
            Proceed to Checkout
          </button>
        </li>
      </ul>

      <hr />
    </div>
    //   </div>
    // </div>
  );
}
