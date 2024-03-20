import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/slice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.users.loginData.status);
//   const data = useSelector((state) => state.users.loginData.data);
  const login = () =>{
    dispatch(loginUser({
        username: "sairam100@gmail.com",
        password: "sairam123"
    }))
  }
  return <div>
    {
        status === "pending" ? "Loading..." : JSON.stringify(data)
    }
    <button onClick={()=> login()}
        disabled = {status === "pending"}
    >
        {
            status === "pending" ? "Loading ...." : "Delete Link"
        }
    </button>
  </div>;
};

export default LoginPage;
