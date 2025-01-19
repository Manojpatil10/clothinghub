const { json } = require('body-parser');
const Cart = require('../../models/cartDataModel');

exports.customerCartPage=(req,res,next)=>{
  Cart.find({refID:req.session.cstID}).then((success)=>{
    // console.log(success);
    const count = success.length;
    res.render('customerPages/customerCartPage',{cartData:success,productCount:count})
  }).catch((error)=>{
    console.log(error);
  })
}

exports.updateCartProduct=(req,res,next)=>{
  let id = req.query.cartData;
  id = JSON.parse(id);
  console.log(id); 
  console.log(id.length)
  console.log(typeof(id));

  // id.map((i)=>{
  //   Cart.updateOne({_id:i.id},{$set:{quantity:i.quantity}}).then((success)=>{
  //     console.log(success);
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  // })

  Promise.all(id.map((i) => {
    return Cart.updateOne({ _id: i.id }, { $set: { quantity: i.quantity } });
  }))
    .then((success) => {
      res.redirect('/customerCartPage');
    })
    .catch((error) => {
      console.log(error);
    });
}


exports.deleteCartProduct=(req,res,next)=>{
  const id = req.query.id;
  // console.log(id);

  Cart.deleteOne({_id:id}).then((success)=>{
    console.log(success);
    res.redirect('/customerCartPage')
  }).catch((error)=>{
    console.log(error);
  })
}