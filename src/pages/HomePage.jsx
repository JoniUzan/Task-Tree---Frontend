import React from "react";
import LogoLightGreen from "../components/logo/Logo";
import { Button } from "../components/ui/button";
import { CheckCircle, Clock, Users, TrendingUp } from "lucide-react";

import lightGreenLeef from "../assets/MongoDB_Logomark_SpringGreen.png";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/UserProvider";

const reasons = [
  {
    icon: <CheckCircle className="text-blue-text" size={32} />,
    text: "Boost your productivity with organized task management.",
  },
  {
    icon: <Clock className="text-blue-text" size={32} />,
    text: "Stay on top of your deadlines and never miss a task.",
  },
  {
    icon: <Users className="text-blue-text" size={32} />,
    text: "Collaborate seamlessly with your team.",
  },
  {
    icon: <TrendingUp className="text-blue-text" size={32} />,
    text: "Track your progress and achieve your goals.",
  },
];

function HomePage() {
  const { loggedInUser } = useAuth();
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center ">
      <div className="text-center bg-blue-text p-4 sm:p-10 rounded-lg m-4">
        <div className="flex items-end justify-center  text-mongo-light-green font-libre-baskerville font-normal gap-2 p-4">
          <img src={lightGreenLeef} alt="" className="inline-block w-8" />
          <p className="inline-block text-4xl">Task Tree</p>
        </div>
        <h2 className="text-3xl  text-mongo-light-green font-libre-baskerville mb-4">
          Improve Your Productivity
        </h2>
        <h2 className="text-3xl  text-mongo-light-green font-libre-baskerville mb-4">
          Start now
        </h2>

        <div>
          {loggedInUser ? (
            <div>
              <Link to={"auth/login"}>
                <Button className="bg-mongo-light-green text-blue-text block mx-auto w-28 ">
                  Get started
                </Button>
              </Link>
            </div>
          ) : (
            <div className=" space-y-4 ">
              <div>
                <Link to={"auth/login"}>
                  <Button className="bg-mongo-light-green text-blue-text block mx-auto w-28 ">
                    Login
                  </Button>
                </Link>
              </div>
              <div>
                <Link to={"auth/register"}>
                  <Button className="bg-text-blue-text text-mongo-light-green border block border-mongo-light-green mx-auto w-28">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white text-[#061E2B] w-full py-8 px-4">
        <div className="flex flex-wrap justify-center gap-4 ">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-mongo-light-green text-blue-text flex items-center p-4 rounded-md shadow-md max-w-lg w-full "
            >
              {reason.icon}
              <p className="ml-4">{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
