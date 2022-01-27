import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    // <div className="row">
    //   <div className="col-md-4">
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
          style={{ width: " 280px;" }}
        >
          <Link to="/uhome"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <i className="fas fa-user-cog bi me-2" width="40" height="32"></i>
            {/* <img className="bi me-2" width="40" height="32" /> */}
            <span className="fs-4">Welcome User</span>
          </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            
            <li>
              <Link to="/addtocart" 
                className={`nav-link ${
                  location.pathname === "/addtocart" ? "active" : "text-white"
                }`}
              >
                <i className="fas fa-plus bi me-2" width="16" height="16"></i>
                Add Item in your Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/uhome" 
                className={`nav-link ${
                  location.pathname === "/uhome" ? "active" : "text-white"
                }`}

               aria-current="page">
                <i className="fas fa-store bi me-2" width="16" height="16"></i>All Item
              </Link>
            </li>
          
          </ul>
          <hr />
        </div>
    //   </div>
    // </div>
  );
}
