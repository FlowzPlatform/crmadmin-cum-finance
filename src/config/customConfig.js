
// console.log(process.env.domainkey)
// module.exports =  {
//     default : {
//         loginUrl : "http://auth.flowz.com/api/login",
//         ldapLoginUrl : "http://auth.flowz.com/api/ldapauth",
//         registrationUrl : "http://api.flowz.com/serverapi/register",
//         signupUrl:          "http://auth.flowz.com/api/setup",
//         userDetail:             "http://auth.flowz.com/api/userdetails",
//         forgotPasswordUrl :         "http://auth.flowz.com/api/forgetpassword",
//         resetpassword :                 "http://auth.flowz.com/api/resetpassword",
//         feathersServiceBaseUrl :            "http://api.flowz.com/serverapi/",
//         facebookSuccessCallbackUrl :            "http://dashboard.flowz.com",
//         loginWithFacebookUrl :                      "http://auth.flowz.com/auth/facebook",
//         googleSuccessCallbackUrl :                      "http://dashboard.flowz.com",
//         loginWithGoogleUrl :                                "http://auth.flowz.com/auth/Gplus",
//         serviceUrl :                                            "http://api.flowz.com/crm/",
//        //serviceUrl :                                                "http://localhost:3037/",
//         projecturl :                                                       'http://api.flowz.com/mom/',
//         assigneeapi :                                                           'http://api.flowz.com/user/alluserdetails/'
//     }

// }


console.log("???????????????????????? " ,process.env.domainkey)

//let frontEndUrl = 'http://localhost:8081/#/login';
let frontEndUrl = 'https://crm.'+process.env.domainkey+'/#/login';

module.exports =  {
    default : {

        loginUrl : "https://auth."+process.env.domainkey+"/api/login",
        ldapLoginUrl : "https://auth."+process.env.domainkey+"/api/ldapauth",
        registrationUrl : "https://api."+process.env.domainkey+"/serverapi/register",
        signupUrl:          "https://auth."+process.env.domainkey+"/api/setup",
        userDetail:             "https://auth."+process.env.domainkey+"/api/userdetails",
        forgotPasswordUrl :         "https://auth."+process.env.domainkey+"/api/forgetpassword",
        resetpassword :                 "https://auth."+process.env.domainkey+"/api/resetpassword",
        feathersServiceBaseUrl :            "https://api."+process.env.domainkey+"/serverapi/",
        varifyEmailUrl :                    "https://auth."+process.env.domainkey+"/api/verifyemail",



        facebookSuccessCallbackUrl: frontEndUrl,
        googleSuccessCallbackUrl: frontEndUrl,
        twitterSuccessCallbackUrl: frontEndUrl,
        githubSuccessCallbackUrl: frontEndUrl,
        linkedInSuccessCallbackUrl: frontEndUrl,




        flowzDashboardUrl : 'https://dashboard.'+process.env.domainkey,
        flowzBuilderUrl : 'https://webbuilder.'+process.env.domainkey ,
        flowzVmailUrl : 'https://vmail.'+process.env.domainkey ,
        flowzUploaderUrl : 'https://uploader.'+process.env.domainkey ,
        flowzDbetlUrl : 'https://dbetl.'+process.env.domainkey ,

        loginWithFacebookUrl : 'https://auth.'+process.env.domainkey+'/auth/facebook',
        loginWithGoogleUrl : 'https://auth.'+process.env.domainkey+'/auth/Gplus',
        loginWithTwitterUrl : 'https://auth.'+process.env.domainkey+'/auth/twitter',
        loginWithGithubUrl : 'https://auth.'+process.env.domainkey+'/auth/github',
        loginWithLinkedInUrl : 'https://auth.'+process.env.domainkey+'/auth/linkedin',
        serviceUrl :            'https://api.'+process.env.domainkey+'/crm/',
        // serviceUrl :            'http://localhost:3037/',
        projecturl :            'https://api.'+process.env.domainkey+'/mom/',
        assigneeapi :           'https://api.'+process.env.domainkey+'/user/alluserdetails/'

    }

}
