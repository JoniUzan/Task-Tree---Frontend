import NavBar from "@/components/NavBar";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
