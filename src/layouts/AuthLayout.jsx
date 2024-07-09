import Logo from "@/components/logo/Logo";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <Link to={"/"}>
        <Logo color={"lightGreen"} />
      </Link>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
