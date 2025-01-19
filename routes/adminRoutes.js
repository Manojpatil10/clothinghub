const express = require('express');
const adminRouter = express.Router();


//Login Path 
const adminLoginPage = require('../controllers/adminController/adminLogin').adminLoginPage;
const adminLogin = require('../controllers/adminController/adminLogin').adminLogin;

//Pages path
const adminPage = require('../controllers/adminController/adminPage').adminPage;
const productApproved = require('../controllers/adminController/adminPage').productApproved;
const deleteShop = require('../controllers/adminController/adminPage').deleteShop;

// Logout Path 
const adminLogout  = require('../controllers/adminController/adminLogout').adminLogout;


//Login
adminRouter.get('/adminLoginPage',adminLoginPage);
adminRouter.post('/adminLogin',adminLogin);

//adminPage
adminRouter.get('/adminPage',adminPage);
adminRouter.get('/productApproved',productApproved);
adminRouter.get('/deleteShop',deleteShop);

//Logout 
adminRouter.get('/adminLogout',adminLogout);

module.exports=adminRouter;