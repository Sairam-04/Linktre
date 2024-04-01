import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import smallLogo from "../../assets/Logo-small.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const displayMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="header w-full h-[9vh] flex justify-between items-center backdrop-blur-lg bg-white/10 top-0 sticky px-4 py-1">
      <div className="logo w-1/2 h-full flex items-center">
        <Link to="/">
          <img
            src={Logo}
            alt=""
            className="w-[250px] hidden sm:block cursor-pointer"
          />
        </Link>
        <Link to="/">
          <img
            src={smallLogo}
            alt=""
            className="w-[10vw] block sm:hidden cursor-pointer"
          />
        </Link>
      </div>
      <ul className="navmenu w-1/2 sm:flex md:text-lg gap-10 justify-end hidden text-md">
        <li className="navitem">
          <Link to="/">Home</Link>
        </li>
        <li className="navitem">
          <Link to="/features">Features</Link>
        </li>
        <li className="navitem">
          <Link to="/about">About</Link>
        </li>
        <li className="navitem">
          <Link to="/faq">FAQ </Link>
        </li>
      </ul>
      <ul className="navmenu w-1/2 sm:flex md:text-lg gap-4 justify-end hidden text-md">
        <li className="cursor-pointer hover:text-[#9bff9e] hover:scale-105 border-[0.1px] border-[#d8ffda] font-extralight px-5 py-1 rounded-3xl">
          <Link to="/register/login">Login</Link>
        </li>
        <li className="cursor-pointer hover:text-[#9bff9e] hover:scale-105 border-[0.1px] border-[#d0ffd2] font-extralight px-5 py-1 rounded-3xl">
          <Link to="/register">SignUp</Link>
        </li>
      </ul>
      <div className="block sm:hidden" onClick={() => displayMenu()}>
        <i className="bi bi-list text-2xl"></i>
      </div>
      {showMenu && (
        <ul className="navmenu absolute backdrop-blur-lg bg-white/10 top-[9vh] right-0 w-[90%] flex flex-col gap-2 text-md py-2 px-2 overflow-hidden">
          <li className="border-b-[.5px] pb-3 cursor-pointer hover:text-[#C9FACB]">
            <Link to="/">Home</Link>
          </li>
          <li className="border-b-[.5px] pb-3 cursor-pointer hover:text-[#C9FACB]">
            <Link to="/features">Features</Link>
          </li>
          <li className="border-b-[.5px] pb-3 cursor-pointer hover:text-[#C9FACB]">
            <Link to="/about">About</Link>
          </li>
          <li className="border-b-[.5px] pb-3 cursor-pointer hover:text-[#C9FACB]">
            <Link to="/faq">FAQ </Link>
          </li>
          <li className="border-b-[.5px] pb-3 cursor-pointer hover:text-[#C9FACB]">
            <Link to="/register">SignUp</Link>
          </li>
          <li>
            <Link to="/register/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
