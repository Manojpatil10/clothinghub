const Product = require('../../models/shopAddProductModel');
const Shop = require('../../models/shopProfileModel');
const shopSignup = require('../../models/shopSignupModel');

exports.adminPage=(req,res,next)=>{
  if(req.session.adminId){
    const contentName = req.query.content || 'Dashboard';

    Product.find().then((product)=>{
      // console.log(product);
      Shop.find().then((shop)=>{
        res.render("adminPages/adminPage",{productData:product,shopData:shop,content:contentName});
      }).catch((error)=>{
        res.render("adminPages/adminPage",{productData:product,shopData:[],content:contentName});
      })
    }).catch((error)=>{
      res.render("adminPages/adminPage",{productData:[],shopData:[],content:contentName});
      // console.log(error)
    })
  }else{
    res.redirect('/adminLoginPage')
  }
}


exports.productApproved=(req,res,next)=>{
  const id = req.query.checkId;
  const val = req.query.value;
  Product.updateOne({_id:id},{$set:{check:val}}).then((success)=>{
    res.redirect('/adminPage?content=Products');
  }).catch((error)=>{
    res.redirect('/adminPage?content=Products');
  })
}


exports.deleteShop=(req,res,next)=>{
  id = req.query.id;
  console.log(id);

  // shopSignup.updateOne({_id:id},{$set:{status:1}}).then((success)=>{
  //   console.log(success);
  //   res.redirect('/adminPage');
  // }).catch((error)=>{
  //   console.log(error);
  // })
}

