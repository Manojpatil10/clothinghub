const express = require('express');
const shopRouter = express.Router();

//Login Path
const shopLoginPage = require('../controllers/shopController/shopLogin').shopLoginPage;
const shopLogin = require('../controllers/shopController/shopLogin').shopLogin;

//Signup Path
const shopSignupPage = require('../controllers/shopController/shopSignup').shopSignupPage;
const shopSignupData = require('../controllers/shopController/shopSignup').shopSignupData;

//Pages Path
const shopProfilePage = require('../controllers/shopController/shopProfilePage').shopProfilePage;
const shopProfileUpdate = require('../controllers/shopController/shopProfilePage').shopProfileUpdate;
const shopAddProductPage = require('../controllers/shopController/shopAddProductPage').ShopAddProductPage;
const addProduct = require('../controllers/shopController/shopAddProductPage').addProduct;
const shopProductList = require('../controllers/shopController/shopProductList').shopProductList;
const updateProductPage = require('../controllers/shopController/shopProductList').updateProductPage;
const updateProduct = require('../controllers/shopController/shopProductList').updateProduct;
const deleteProduct = require('../controllers/shopController/shopProductList').deleteProduct;
const shopForgetPassPage = require('../controllers/shopController/shopForgetPassPage').shopForgetPassPage;
const shopResetPassForm = require('../controllers/shopController/shopForgetPassPage').shopResetPassForm;
const shopSendResetPassLink = require('../controllers/shopController/shopForgetPassPage').shopSendResetPassLink;
const shopUpdatePass = require('../controllers/shopController/shopForgetPassPage').shopUpdatePass;

//delete
const shopDelete = require('../controllers/shopController/shopDelete').shopDelete;

//Logout Path
const shopLogout = require('../controllers/shopController/shopLogout').shopLogout;

//Login
shopRouter.get('/shopLoginPage',shopLoginPage);
shopRouter.post('/shopLogin',shopLogin);

//Signup
shopRouter.get('/shopSignupPage',shopSignupPage);
shopRouter.post('/shopSignupData',shopSignupData);

//Pages
shopRouter.get('/shopProfilePage',shopProfilePage);
shopRouter.post('/shopProfileUpdate',shopProfileUpdate);
shopRouter.get('/shopAddProductPage',shopAddProductPage);
shopRouter.post('/addProduct',addProduct);
shopRouter.get('/shopProductList',shopProductList);
shopRouter.get('/updateProductPage',updateProductPage);
shopRouter.post('/updateProduct',updateProduct);
shopRouter.get('/deleteProduct',deleteProduct);
shopRouter.get('/shopForgetPassPage',shopForgetPassPage);
shopRouter.get('/shopResetPassForm',shopResetPassForm);
shopRouter.get('/shopSendResetPassLink',shopSendResetPassLink);
shopRouter.get('/shopUpdatePass',shopUpdatePass);

//Logout
shopRouter.get('/shopLogout',shopLogout);

//detete
shopRouter.get('/shopDelete',shopDelete)


module.exports = shopRouter;