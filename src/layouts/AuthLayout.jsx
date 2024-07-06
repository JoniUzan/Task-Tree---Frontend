import LogoLightGreen from "@/components/logo/LogoLightGreen";
import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <LogoLightGreen />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
