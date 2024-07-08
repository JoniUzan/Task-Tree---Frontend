import { useAuth } from "@/context/UserProvider";
import React from "react";
import Logo from "./logo/Logo";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function NavBar() {
  const { loggedInUser, logout } = useAuth();

  return (
    <div className="flex justify-between items-center font-sofia-sans">
      <Logo color={"darkGreen"} />

      <div className="flex space-x-8 p-4 items-center text-blue-text text-lg ">
        <Link className=" hover:text-mongo-dark-green" to={"/task"}>
          Tasks
        </Link>
        {loggedInUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>
                  {loggedInUser.firstName[0].toUpperCase()}
                  {loggedInUser.lastName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {loggedInUser.firstName.toUpperCase()}{" "}
                {loggedInUser.lastName.toUpperCase()}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={"/profile"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </div>
  );
}

export default NavBar;
