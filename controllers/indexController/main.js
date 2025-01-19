const Product = require('../../models/shopAddProductModel');
const Profile = require('../../models/customerProfileModel');
const Cart = require('../../models/cartDataModel');


exports.main=(req,res)=>{

  const categoryContent = req.query.category || '';
 
  Product.find().then((product)=>{
    if(req.session.cstID){
      Profile.findOne({refID:req.session.cstID}).then((profile)=>{
        if(req.session.cstID){
          Cart.find({refID:req.session.cstID}).then((cartData)=>{
            // console.log(cartData)
            res.render('main',{productData:product,profileData:profile,sessionId:req.session.cstID,cartOffcanvasData:cartData,category:categoryContent});
          }).catch((error)=>{
            res.render('main',{productData:product,profileData:profile,sessionId:req.session.cstID,cartOffcanvasData:[],category:categoryContent});
          })
        }else{
          res.render('main',{productData:product,profileData:profile,sessionId:req.session.cstID,cartOffcanvasData:[],category:categoryContent});
        }
      }).catch((error)=>{
        res.render('main',{productData:product,profileData:{},sessionId:req.session.cstID,cartOffcanvasData:[],category:categoryContent});
      })
    }else{
      res.render('main',{productData:product,profileData:{},sessionId:req.session.cstID,cartOffcanvasData:[],category:categoryContent});
    }
  }).catch((error)=>{
    res.render('main',{productData:[],profileData:{},sessionId:false,cartOffcanvasData:[],category:categoryContent});
  })
}

