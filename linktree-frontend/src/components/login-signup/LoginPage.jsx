import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/slice";
import Image from "../../assets/SignUpImg.png";
import Classic from "../../assets/Classic.svg";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../utils/localStorage";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const status = useSelector((state) => state.users.loginData.status);
  const data = useSelector((state) => state.users.loginData.data);
  const error_data = useSelector((state) => state.users.loginData.error);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username or Email is Required";
    } else if (values.username.length < 4) {
      errors.username = "Username length should be more than 4 characters";
    }

    if (!values.password) {
      errors.password = "Password is Required";
    } else if (values.password.length < 6) {
      errors.password = "Password length should be more than 6 characters";
    }
    return errors;
  };

  const login = (e) => {
    e.preventDefault();
    const errors = validateForm(loginData);
    setErrors(errors);
    if(!Object.keys(errors).length){
      dispatch(loginUser(loginData));
    }
  };

  useEffect(() => {
    if (status === "idle" && data && data.success) {
      setUser(data.token);
      navigate("/all-links");
    }
    if (error_data && error_data === "Network Error") {
      console.log("500");
    }
  }, [status, data, error_data]);

  return (
    <div className="w-full h-full flex">
      <div className="w-full sm:w-1/2 flex flex-col gap-10 py-10 px-5">
        <div className="logo w-[180px] sm:w-[200px] md:w-[250px]">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={Classic}
            alt=""
            className="w-[40px] block cursor-pointer"
          />
          <div className="text-xl font-medium">ConnectVerse</div>
        </Link>
        </div>
        <div className="heading flex flex-col gap-2 items-center">
          <div className="text-4xl">Welcome Back</div>
          <div className="text-sm text-gray-500">
            Log in to your ConnectVerse
          </div>
        </div>
        <form
          className="form flex flex-col items-center gap-10"
          onSubmit={login}
        >
          <div className="w-3/5">
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder="Email or Username"
              className="w-full bg-[#2a322b] py-3 px-2 rounded-xl outline-none border-transparent focus:border-transparent focus:ring-0 shadow-3xl"
            />
            {errors && (
              <div className="text-red-500 text-sm pl-2 pt-1">{errors.username}</div>
            )}
          </div>
          <div className="w-3/5">
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-[#2a322b] py-3 px-2 rounded-xl outline-none border-transparent focus:border-transparent focus:ring-0 shadow-3xl"
            />
            {errors && (
              <div className="text-red-500 text-sm pl-2 pt-1">{errors.password}</div>
            )}
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
              disabled={status === "pending"}
              className="bg-[#4d8552] text-white px-5 py-2 text-lg rounded-2xl hover:scale-105 hover:drop-shadow-2xl box-shadow-slate-400 shadow-relative z-index:1 disabled:bg-slate-400"
            >
              Login
            </button>
          </div>
          {status === "pending" ? (
            <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-green-500"></div>
          ) : (
            <div className="text-red-500 text-sm">
              {(error_data && error_data) || (data && data.message)}
            </div>
          )}
        </form>
      </div>
      <div className="w-1/2 sm:block hidden">
        <img src={Image} className="h-full w-full" alt="Side Image" />
      </div>
    </div>
  );
};

export default LoginPage;
