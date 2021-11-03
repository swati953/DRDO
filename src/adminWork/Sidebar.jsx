import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    // <div className="row">
    //   <div className="col-md-4">
        <div
          class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
          style={{ width: " 280px;" }}
        >
          <Link to="/ahome"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <i class="fas fa-user-cog bi me-2" width="40" height="32"></i>
            {/* <img class="bi me-2" width="40" height="32" /> */}
            <span class="fs-4">Welcome Admin</span>
          </Link>
          <hr />
          <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
              <Link to="/ahome" class="nav-link active" aria-current="page">
                <i class="fas fa-store bi me-2" width="16" height="16"></i>
                All Item
              </Link>
            </li>
            <li>
              <Link to="/additem" class="nav-link text-white">
                <i class="fas fa-plus bi me-2" width="16" height="16"></i>
                Add New Item
              </Link>
            </li>
            <li>
              <Link to="/edit" class="nav-link text-white">
                <i class="fas fa-edit bi me-2" width="16" height="16"></i>
                Delete/Update Items
              </Link>
            </li>
          </ul>
          <hr />
        </div>
    //   </div>
    // </div>
  );
}
