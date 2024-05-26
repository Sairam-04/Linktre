import axios from "axios";
import { getUser } from "../../utils/localStorage";
import { BACKEND_URL } from "../../constants/urls";
const BASE_URL = BACKEND_URL;

const ResetPassword = (data) =>{
    const uri = `${BASE_URL}/create-new-password`;
    return axios.post(uri, data, {
        headers: {
            "Content-Type": "application/json",
            "ltree-token": ""
        }
    })
};

const fetchUserDetails = (data) =>{
    const uri = `${BASE_URL}/me`;
    return axios.get(uri,{
        headers: {
            "Content-Type": "application.json",
            "ltree-token" : data
        }
    })
}

const RegisterUser = (data) =>{
    const uri = `${BASE_URL}/register`;
    return axios.post(uri, data);
}

const LoginUser = (data) =>{
    const uri=`${BASE_URL}/login`;
    return axios.post(uri, data);
};

const sendEmailPassword = (data) =>{
    const uri=`${BASE_URL}/send-password-reset-email`;
    return axios.post(uri, data);
}

const VerifyResetToken = (token) =>{
    const uri=`${BASE_URL}/forgot-password/${token}`;
    return axios.post(uri, {
        headers: {
            "Content-Type": "application.json",
        }
    });
}

export default {
    ResetPassword,
    fetchUserDetails,
    RegisterUser,
    LoginUser,
    sendEmailPassword,
    VerifyResetToken
}
