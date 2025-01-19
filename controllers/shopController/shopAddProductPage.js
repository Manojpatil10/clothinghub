const Product = require('../../models/shopAddProductModel');
const shopProfile = require('../../models/shopProfileModel');
const Signup = require('../../models/shopSignupModel');


exports.ShopAddProductPage=(req,res,next)=>{
  if(req.session.shopId){
    Signup.findOne({_id:req.session.shopId}).then((shop)=>{
      shopProfile.findOne({refID:req.session.shopId}).then((profile)=>{
        res.render("shopPages/shopAddProduct",{profileData:profile,signupData:shop});
      }).catch((error)=>{
        res.render("shopPages/shopAddProdut",{profileData:{},signupData:{}});
      })
    }).catch((error)=>{
      console.log(error)
    });
  }else{
    res.redirect('/shopLoginPage');
  }
}

exports.addProduct=(req,res,next)=>{
  const shopName = req.body.shopName;
  const gstin = req.body.gstin;
  const productName = req.body.productName;
  const brand = req.body.brand;
  const categories = req.body.category;
  const sizes = req.body.size;
  const currentPrice = parseInt(req.body.currentPrice);
  const originalPrice = parseInt(req.body.originalPrice);
  const discount = parseInt(req.body.discount);
  const quantity = parseInt(req.body.quantity);
  const description = req.body.description;
  const check = "Pending";

  const imgUrl = req.files['productImg'][0].path.replace('\\','/');

  //  console.log("this is addproduct")
  // let image = req.files["image"][0];
  // let imgUrl = image.path.replace("\\", "/");

  // Convert the first letter of the name to uppercase
  // if (typeof name === "string" && name.trim() !== "") {
  //   name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  // }

  // Ensure category is an array, even if no checkbox is selected
  // if (category && !Array.isArray(category)) {
  //   category = [category];
  // } else if (!category) {
  //   category = []; // Default to empty array if undefined or empty
  // }

  // Ensure sizes is an array, even if no checkbox is selected
  // if (sizes && !Array.isArray(sizes)) {
  //   sizes = [sizes];
  // } else if (!sizes) {
  //   sizes = []; // Default to empty array if undefined or empty
  // }

  let data = new Product({
    shopName: shopName,
    GSTIN: gstin,
    productName: productName,
    productBrand: brand,
    categories: categories,
    sizes: sizes,
    currentPrice: currentPrice,
    originalPrice: originalPrice,
    discount: discount,
    quantity: quantity,
    productImage: imgUrl,
    description: description,
    check : check
  });

  data.save().then((success) => {
      // console.log(success);
      res.redirect("/shopAddProductPage");
    })
    .catch((error) => {
      console.log(error);
    });
}