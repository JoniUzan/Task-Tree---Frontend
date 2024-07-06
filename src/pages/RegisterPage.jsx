import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/UserProvider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [registerData, setregisterData] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleRegisterData(e) {
    const { name, value } = e.target;
    setregisterData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  async function handleLogInButton() {
    console.log(registerData);
    await register(registerData);
    
  }
  return (
    <div className="mt-12">
      <div className="mx-8 font-sofia-sans ">
        <h2 className="text-3xl">Register</h2>
        <div className="flex flex-col gap-6 ">
          <div>
            <Label className="text-blue-text" htmlFor="firstName">
              First name
            </Label>
            <Input
              onChange={handleRegisterData}
              id="firstName"
              name="firstName"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              onChange={handleRegisterData}
              id="lastName"
              name="lastName"
              required
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              onChange={handleRegisterData}
              id="username"
              name="username"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input onChange={handleRegisterData} id="email" name="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={handleRegisterData}
              id="password"
              name="password"
              required
            />
          </div>
        </div>
        <div className="space-y-4 mt-4">
          <Button
            onClick={handleLogInButton}
            className="bg-mongo-light-green text-blue-text "
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
