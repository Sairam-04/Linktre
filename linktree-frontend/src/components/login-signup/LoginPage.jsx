import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/slice";
import Image from "../../assets/SignUpImg.jpg";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.users.loginData.status);
  const data = useSelector((state) => state.users.loginData.data);
  const login = () => {
    dispatch(
      loginUser({
        username: "sairam100@gmail.com",
        password: "sairam123",
      })
    );
  };
  return (
    <div className="w-full h-full flex">
      <div className="w-full sm:w-1/2 flex flex-col gap-10 py-10 px-5">
        <div className="logo w-[180px] sm:w-[200px] md:w-[250px]">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-full" />
          </Link>{" "}
        </div>
        <div className="heading flex flex-col gap-2 items-center">
          <div className="text-4xl">Welcome Back</div>
          <div className="text-sm text-gray-500">
            Log in to your ConnectVerse
          </div>
        </div>
        <form className="form flex flex-col items-center gap-10">
          <div className="w-3/5">
            <input
              type="text"
              name="email"
              placeholder="Email or Username"
              className="w-full bg-[#2a322b] py-3 px-2 rounded-xl outline-none border-transparent focus:border-transparent focus:ring-0 shadow-3xl"
            />
          </div>
          <div className="w-3/5">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-[#2a322b] py-3 px-2 rounded-xl outline-none border-transparent focus:border-transparent focus:ring-0 shadow-3xl"
            />
          </div>
          <div className="text-md">
            Don't have an Account?{" "}
            <Link to="/register" className="text-blue-400">
              SignUp
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#4d8552] text-white px-5 py-2 text-lg rounded-2xl hover:scale-105 hover:drop-shadow-2xl box-shadow-slate-400 shadow-relative z-index:1"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 sm:block hidden">
        <img src={Image} className="h-full w-full" alt="Side Image" />
      </div>
    </div>
  );
};

export default LoginPage;
