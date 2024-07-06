import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/UserProvider";
import api from "@/lib/utils";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [logInData, setLogInData] = useState({});
  const { login } = useAuth();

  function handleLogInData(e) {
    const { name, value } = e.target;
    setLogInData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  async function handleLogInButton() {
    console.log(logInData);
    await login(logInData);
  }
  return (
    <div className="mt-24">
      <div className="mx-8 font-sofia-sans ">
        <h2 className="text-3xl">Login</h2>
        <div className="flex flex-col gap-6 ">
          <div>
            <Label className="text-blue-text" htmlFor="username">
              Username
            </Label>
            <Input onChange={handleLogInData} id="username" name="username" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input onChange={handleLogInData} id="password" name="password" />
          </div>
        </div>
        <div className="space-y-4 mt-4">
          <Button
            onClick={handleLogInButton}
            className="bg-mongo-light-green text-blue-text "
          >
            Login
          </Button>
          <div>
            Don't have an account?
            <div className="text-sky-600 inline-block mx-2">
              <Link to={"/auth/register"}>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
