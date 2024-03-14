const FORGOT_PASSWORD_URL = ({protocol, host, token}) =>{
    return `${protocol}://${host}/api/forgot-password/${token}`
};

const FORGOT_PASSWORD_EMAIL_MSG = (link) =>{
   return  `You have requested to reset your password for your account. To complete this process, please click the following link:
             \n\n ${link} \n\n If you did not request this change, you can safely ignore this email. Your password will remain unchanged.\n\n\n\n
             Thank you,`;
};

const FORGOT_PASSWORD_EMAIL_SUB = "LINKTREE Reset Password Link";

module.exports = {
    FORGOT_PASSWORD_URL,
    FORGOT_PASSWORD_EMAIL_MSG,
    FORGOT_PASSWORD_EMAIL_SUB
}