const express = require('express');
const customerRouter = express.Router();


// Login Path
const customerLoginPage = require('../controllers/customerController/customerLogin').customerLoginPage;
const customerLogin = require('../controllers/customerController/customerLogin').customerLogin;

// Signup Path
const customerSignupPage = require('../controllers/customerController/customerSignup').customerSignupPage;
const customerSignupData = require('../controllers/customerController/customerSignup').customerSignupData;

//Pages Path
const customerProfile = require('../controllers/customerController/customerProfile').customerProfile;
const customerProfileUpdate = require('../controllers/customerController/customerProfile').customerProfileUpdate;
const cstForgetPassPage = require('../controllers/customerController/customerForgetPass').cstForgetPassPage;
const cstResetPassForm = require('../controllers/customerController/customerForgetPass').cstResetPassForm;
const cstSendResetPassLink = require('../controllers/customerController/customerForgetPass').cstSendResetPassLink;
const cstUpdatePass = require('../controllers/customerController/customerForgetPass').cstUpdatePass;
const customerCartPage = require('../controllers/customerController/customerCartPage').customerCartPage;
const deleteCartProduct = require('../controllers/customerController/customerCartPage').deleteCartProduct;
const updateCartProduct = require('../controllers/customerController/customerCartPage').updateCartProduct;

//Logout Path
const customerLogout = require('../controllers/customerController/customerLogout').customerLogout;




// login
customerRouter.get('/customerLoginPage',customerLoginPage);
customerRouter.post('/customerLogin',customerLogin)


//Signup
customerRouter.get('/customerSignupPage',customerSignupPage);
customerRouter.post('/customerSignupData',customerSignupData);

//Pages
customerRouter.get('/customerProfile',customerProfile);
customerRouter.post('/customerProfileUpdate',customerProfileUpdate);
customerRouter.get('/cstForgetPassPage',cstForgetPassPage);
customerRouter.get('/cstResetPassForm',cstResetPassForm);
customerRouter.post('/cstSendResetPassLink',cstSendResetPassLink);
customerRouter.post('/cstUpdatePass',cstUpdatePass);
customerRouter.get('/customerCartPage',customerCartPage);
customerRouter.get('/deleteCartProduct',deleteCartProduct);
customerRouter.get('/updateCartProduct',updateCartProduct);

//Logout
customerRouter.get('/customerLogout',customerLogout);

module.exports = customerRouter;