import React from "react";
import leef from "../../assets/MongoDB_Logomark_SpringGreen.png";

function LogoLightGreen() {
  return (
    <div className="flex items-end  text-mongo-light-green font-libre-baskerville font-normal gap-2 p-4">
      <img src={leef} alt="" className="inline-block w-4" />
      <p className="inline-block text-xl">Task Tree</p>
    </div>
  );
}

export default LogoLightGreen;
