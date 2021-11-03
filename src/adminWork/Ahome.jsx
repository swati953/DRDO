import React from "react";
import Fetchitems from "../userwork/Fetchitems";
import Sidebar from "./Sidebar";

export default function Ahome() {
  return (
    <div className="row">
      <div className="col-md-4">
          <Sidebar/>
      </div>
        <div className="col-md-8" style={{backgroundColor:"blue"}}>
        <Fetchitems/>
      </div>
    </div>
  );
}
