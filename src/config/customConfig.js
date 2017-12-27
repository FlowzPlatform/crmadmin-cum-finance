
console.log(process.env.baseURL)
module.exports =  {
    default : {
        loginUrl : "http://auth.flowz.com/api/login",
        ldapLoginUrl : "http://auth.flowz.com/api/ldapauth",
        registrationUrl : "http://api.flowz.com/serverapi/register",
        signupUrl:          "http://auth.flowz.com/api/setup",
        userDetail:             "http://auth.flowz.com/api/userdetails",
        forgotPasswordUrl :         "http://auth.flowz.com/api/forgetpassword",
        resetpassword :                 "http://auth.flowz.com/api/resetpassword",
        feathersServiceBaseUrl :            "http://api.flowz.com/serverapi/",
        facebookSuccessCallbackUrl :            "http://dashboard.flowz.com",
        loginWithFacebookUrl :                      "http://auth.flowz.com/auth/facebook",
        googleSuccessCallbackUrl :                      "http://dashboard.flowz.com",
        loginWithGoogleUrl :                                "http://auth.flowz.com/auth/Gplus",  
        serviceUrl :                                            "http://api.flowz.com/crm/"
        //serviceUrl :                                                "http://localhost:3037/",
        paymentUrl :                                                    "http://172.16.230.88:3039/",
        databaseurl :                                                       'http://172.16.230.225:3037/',
        projecturl :                                                            'http://api.flowz.com/mom/',
        assigneeapi :                                                               'http://api.flowz.com/user/alluserdetails/'
    }

}





