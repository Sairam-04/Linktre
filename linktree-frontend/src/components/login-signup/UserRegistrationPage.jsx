import React from "react";
import {Outlet } from "react-router-dom";

const UserRegistrationPage = () => {
  return (
    <div className="h-screen w-full bg-black text-white relative z-[10]">
      <div className="absolute block h-72 w-[30%] z-[-100] bg-[#90EE90] top-0 left-[5%] rounded-full opacity-40 blur-[200px]"></div>
      <div className="absolute block h-48 w-[30%] z-[-100] bg-[#90EE90] bottom-0 left-0 rounded-full opacity-40 blur-[200px]"></div>

      <Outlet />
    </div>
  );
};

export default UserRegistrationPage;
