import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import smallLogo from "../../assets/Logo-small.png";
import { Link } from "react-router-dom";
import { getUser } from "../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/user/slice";
import Switch from "./SwitchTheme";
import Classic from "../../assets/Classic.svg"

const Header = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Adjust default value
  const token = getUser();
  const userData = useSelector((state) => state.users.fetchUserData.data);
  const status = useSelector((state) => state.users.fetchUserData.status);
  const error_data = useSelector((state) => state.users.fetchUserData.error);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (status === "idle" && userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [status, userData]);

  const displayMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="header w-full h-[9vh] flex justify-between items-center backdrop-blur-lg bg-white/10 top-0 sticky px-4 py-1">
      <div className="logo w-1/2 h-full flex items-center">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={Classic}
            alt=""
            className="w-[40px] block cursor-pointer"
          />
          <div className="text-xl font-medium">ConnectVerse</div>
        </Link>
      </div>
      <ul className="navmenu w-1/2 sm:flex md:text-lg gap-10 justify-end hidden text-md">
        {!isLoggedIn ? (
          <>
            <li className="navitem">
              <Link to="/">Home</Link>
            </li>
            <li className="navitem">
              <Link to="/">Features</Link>
            </li>
            <li className="navitem">
              <Link to="/">About</Link>
            </li>
            <li className="navitem">
              <Link to="/">FAQ </Link>
            </li>
          </>
        ) : (
          <>
            <li className="navitem">
              <Link to="/all-links">Links</Link>
            </li>
            <li className="navitem">
              <Link to="/all-links">Apperance </Link>
            </li>
            <li className="navitem">
              <Link to="/all-links">Settings </Link>
            </li>
          </>
        )}
      </ul>
      <ul className="navmenu w-1/2 sm:flex md:text-lg gap-4 justify-end items-center hidden text-md">
        <Switch />
        {!isLoggedIn ? (
          <>
            <li className="cursor-pointer hover:text-[#9bff9e] hover:scale-105 border-[0.1px] border-[#d8ffda] font-extralight px-5 py-1 rounded-3xl">
              <Link to="/register/login">Login</Link>
            </li>
            <li className="cursor-pointer hover:text-[#9bff9e] hover:scale-105 border-[0.1px] border-[#d0ffd2] font-extralight px-5 py-1 rounded-3xl">
              <Link to="/register">SignUp</Link>
            </li>
          </>
        ) : (
          <>
            {status === "idle" ? (
              <div className="w-[35px] h-[35px] rounded-full bg-white text-black flex justify-center items-center text-3xl">{userData.username[0]}</div>
            ) : (
              <div>dkfmdkf</div>
            )}
          </>
        )}
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
