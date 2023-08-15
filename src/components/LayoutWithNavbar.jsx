import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function LayoutWithNavbar() {
  return (
    <div>
      <Navbar />
      <div className="home-bg">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutWithNavbar;
