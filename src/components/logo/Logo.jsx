import React from "react";
import lightGreenLeef from "../../assets/MongoDB_Logomark_SpringGreen.png";
import datkGreenLeef from "../../assets/MongoDB_Logomark_ForestGreen.png";
import { useNavigate } from "react-router-dom";

function LogoLightGreen({ color }) {
  

  return color == "lightGreen" ? (
    <div
     
      className="flex items-end justify-center  text-mongo-light-green font-libre-baskerville font-normal gap-2 p-4  "
    >
      <img src={lightGreenLeef} alt="" className="inline-block w-4" />
      <p className="inline-block text-xl">Task Tree</p>
    </div>
  ) : (
    <div
      
      className="flex items-end justify-center  text-mongo-dark-green font-libre-baskerville font-normal gap-2 p-4"
    >
      <img src={datkGreenLeef} alt="" className="inline-block w-4" />
      <p className="inline-block text-xl">Task Tree</p>
    </div>
  );
}

export default LogoLightGreen;
