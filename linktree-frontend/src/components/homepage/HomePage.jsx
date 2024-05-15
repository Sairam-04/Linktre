import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getTheme } from "../../utils/localStorage";

const HomePage = () => {
  useEffect(() => {
    const theme = getTheme();
    document.body.classList.toggle("dark", theme === "dark");
  }, []);
  return (
    <div className="h-screen w-full bg-white text-black dark:bg-black dark:text-white relative z-[10]">
      <div className="absolute block h-72 w-[40%] z-[-100] bg-[#C9FACB] top-[10vh] left-[20%] rounded-full opacity-40 blur-[200px]"></div>
      <Header />
      <Outlet />
    </div>
  );
};

export default HomePage;
