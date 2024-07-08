import Logo from "@/components/logo/Logo";
import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <Logo color={"lightGreen"} />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
