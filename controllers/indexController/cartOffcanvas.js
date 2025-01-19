const Cart = require('../../models/cartDataModel');

exports.cartOffcanvas=(req,res,next)=>{
  Cart.find({refId:req.session.cstId}).then((product)=>{
    console.log(product)
    res.render('indexPages/cartOffcanvas',{cartOffcanvasData:product});
  }).catch((error)=>{
    console.log(error)
  });
}