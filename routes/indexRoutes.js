const express = require('express');
const indexRouter = express.Router();

const main = require('../controllers/indexController/main').main;

//Pages
const addToCartPage = require('../controllers/indexController/addToCartPage').addToCartPage;
const cartOffcanvas = require('../controllers/indexController/cartOffcanvas').cartOffcanvas;
const addcartData = require('../controllers/indexController/addToCartPage').addCartData;
const exploreMorePage = require('../controllers/indexController/exploreMorePage').exploreMorePage;
const pagination = require('../controllers/indexController/exploreMorePage').pagination;
const checkoutPage = require('../controllers/indexController/checkoutPage').checkoutPage;
const orderDataSave = require('../controllers/indexController/checkoutPage').orderDataSave;
const otpVerification = require('../controllers/indexController/checkoutPage').otpVerification;
const verifyOTP = require('../controllers/indexController/checkoutPage').verifyOTP;
const search = require('../controllers/indexController/search').search;

indexRouter.get('/',main);

//Pages
indexRouter.get('/addToCartPage',addToCartPage);
indexRouter.get('/cartOffcanvas',cartOffcanvas);
indexRouter.post('/addCartData',addcartData);
indexRouter.get('/exploreMorePage',exploreMorePage);
indexRouter.get('/pagination',pagination);
indexRouter.get('/checkoutPage',checkoutPage);
indexRouter.post('/orderDataSave',orderDataSave);
indexRouter.post('/otpVerification',otpVerification);
indexRouter.post('/verifyOTP',verifyOTP);
indexRouter.get('/search',search);

module.exports = indexRouter;