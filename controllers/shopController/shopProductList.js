const Signup = require('../../models/shopSignupModel');
const Profile = require('../../models/shopProfileModel');
const Product = require('../../models/shopAddProductModel');


exports.shopProductList=(req,res,next)=>{
  if(req.session.shopId){
    Profile.findOne({refID:req.session.shopId}).then((profile)=>{
      Product.find({GSTIN:profile.GSTIN}).then((product)=>{
        res.render('shopPages/shopProductList',{productData:product,profileData:profile,showStatus:true});
      })
    }).catch((error)=>{
      res.render('shopPages/shopProductList',{productData:{},profileData:{},showStatus:true});
    })
  }else{
    res.redirect('/shopLoginPage')
  }
}


exports.updateProductPage=(req,res,next)=>{
  if(req.session.shopId){
    const id = req.query.updateID;

    Profile.findOne({refID:req.session.shopId}).then((profile)=>{
      Product.findOne({_id:id}).then((product)=>{
        // console.log(product);
      res.render('shopPages/shopProductList',{productData:product,showStatus:false,profileData:profile});
    }).catch((error)=>{
      console.log(error);
    })
  })
  }else{
    res.redirect('/shopLoginPage')
  } 
}


exports.updateProduct=(req,res,next)=>{
  const productId = req.query.productId;

  const shopName = req.body.shopName;
  const gstin = req.body.gstin;
  const productName = req.body.productName;
  const productBrand = req.body.productBrand;
  const categories = req.body.categories;
  const sizes = req.body.sizes;
  const currentPrice = parseInt(req.body.currentPrice);
  const originalPrice = parseInt(req.body.originalPrice);
  const discount = req.body.discount;
  const quantity = parseInt(req.body.quantity);
  const description = req.body.description;

  const productUrl = req.files['productImg']
  ? req.files['productImg'][0].path.replace('\\', '/')
  : null;


  Product.findOne({ _id: productId }).then((product) => {

    const updateFields = {
      shopName: shopName,
      GSTIN: gstin,
      productName: productName,
      productBrand: productBrand,
      categories: categories,
      sizes: sizes,
      currentPrice: currentPrice,
      originalPrice: originalPrice,
      discount: discount,
      quantity: quantity,
      description: description,
    };

    if (productUrl) {
      updateFields.productImage = productUrl; // Only add if provided
    }


    Product.updateOne({ _id : productId },{ $set: updateFields })
      .then((success) => {
        // console.log(success);
        // console.log("data updated");
        res.redirect("/shopProductList");
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
}


exports.deleteProduct=(req,res,next)=>{
  const id = req.query.deleteID;

  // console.log(id);

  Product.deleteOne({_id:id}).then((success)=>{
    res.redirect('/shopProductList');
  }).catch((error)=>{
    console.log(error);
  })
}