import React, { useEffect, useState } from "react";
import Image from "../../assets/SignUpImg.png";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/user/slice";
import { setUser } from "../../utils/localStorage";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [signupData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const status = useSelector((state) => state.users.registerData.status);
  const error_data = useSelector((state) => state.users.registerData.error);
  const data = useSelector((state) => state.users.registerData.data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
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

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is Required";
    } else if (values.password.length < 6) {
      errors.password = "Password length should be more than 6 characters";
    }

    return errors;
  };

  const submitSignup = (e) => {
    e.preventDefault();
    setErrors(validateForm(signupData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && Object.keys(errors).length === 0) {
      dispatch(registerUser(signupData));
      setIsSubmit(false);

    }
    if (status === "idle" && data && data.success) {
      setUser(data.token);
    }
    if (error_data && error_data === "Network Error") {
      console.log("500");
    }
  }, [isSubmit, errors, status, data, error_data]);

  return (
    <div className="w-full h-full flex">
      <div className="w-full sm:w-1/2 flex flex-col gap-10 py-10 px-5">
        <div className="logo w-[180px] sm:w-[200px] md:w-[250px]">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-full" />
          </Link>
        </div>
        <div className="heading text-4xl flex justify-center">
          Join ConnectVerse
        </div>
        <form
          className="form flex flex-col items-center gap-10"
          onSubmit={submitSignup}
        >
          <div className="w-3/5">
            <input
              type="text"
              name="username"
              value={signupData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full bg-[#2a322b] py-3 px-2 rounded-xl outline-none border-transparent focus:border-transparent focus:ring-0 shadow-3xl"
            />
            {errors && (
              <div className="text-red-500 text-sm pl-2 pt-1">
                {errors.username}
              </div>
            )}
          </div>
          <div className="w-3/5">
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-[#2a322b] py-3 px-2 rounded-xl outline-none border-transparent focus:border-transparent focus:ring-0 shadow-3xl"
            />
            {errors && (
              <div className="text-red-500 text-sm pl-2 pt-1">
                {errors.email}
              </div>
            )}
          </div>
          <div className="w-3/5">
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-[#2a322b] py-3 px-2 rounded-xl outline-none border-transparent focus:border-transparent focus:ring-0 shadow-3xl"
            />
            {errors && (
              <div className="text-red-500 text-sm pl-2 pt-1">
                {errors.password}
              </div>
            )}
          </div>
          <div className="text-md">
            Already have an Account?{" "}
            <Link to="/register/login" className="text-blue-400">
              Login
            </Link>
          </div>
          <div>
            <button
              type="submit"
              disabled={status === "pending" && isSubmit}
              className="bg-[#4d8552] text-white px-5 py-2 text-lg rounded-2xl hover:scale-105 hover:drop-shadow-2xl box-shadow-slate-400 shadow-relative z-index:1"
            >
              Register
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

export default RegisterPage;
