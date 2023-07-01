import React from "react";
import Sidebar from "./layout/sidebar/Sidebar";
import Navbar from "./layout/navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./App.css";

const Wrapper = () => {
  return (
    <div className="appWrapper">
      <Sidebar />
      <div className="mainContainer">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Wrapper;
