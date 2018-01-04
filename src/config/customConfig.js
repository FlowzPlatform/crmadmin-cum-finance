
//console.log("???????????????????????? " ,process.env.baseURL)
let frontEndUrl = 'http://localhost:8081/login';

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
        
        facebookSuccessCallbackUrl: frontEndUrl,
        googleSuccessCallbackUrl: frontEndUrl,
        twitterSuccessCallbackUrl: frontEndUrl,
        githubSuccessCallbackUrl: frontEndUrl,
        linkedInSuccessCallbackUrl: frontEndUrl,
        
        loginWithFacebookUrl : 'http://auth.flowz.com/auth/facebook',
        loginWithGoogleUrl : 'http://auth.flowz.com/auth/Gplus',
        loginWithTwitterUrl : 'http://auth.flowz.com/auth/twitter',
        loginWithGithubUrl : 'http://auth.flowz.com/auth/github',
        loginWithLinkedInUrl : 'http://auth.flowz.com/auth/linkedin',  
        //serviceUrl :                                            "http://api.flowz.com/crm/",
        serviceUrl :                                                "http://localhost:3037/",
        projecturl :                                                       'http://api.flowz.com/mom/',
        assigneeapi :                                                           'http://api.flowz.com/user/alluserdetails/'
    }

}





