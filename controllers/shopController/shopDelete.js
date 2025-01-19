const Shop = require('../../models/cutomerSignupModel');

exports.shopDelete=(req,res,next)=>{
  const shopId = req.query.shopId;
  console.log(shopId);
  Shop.updateOne({_id:shopId},{$set:{status:2}}).then((success)=>{
    res.redirect('/');
  }).catch((error)=>{
    console.log(error);
  })
} 