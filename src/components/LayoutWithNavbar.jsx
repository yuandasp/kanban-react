import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function LayoutWithNavbar() {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "70vh" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutWithNavbar;
