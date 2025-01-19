const shopSignup = require('../../models/shopSignupModel');
const shopProfile = require('../../models/shopProfileModel');
const bcrypt = require('bcrypt');


exports.shopProfilePage = (req, res, next) => {
  if(req.session.shopId){
    const shopId = req.session.shopId;
    shopSignup.findOne({ _id: shopId }).then((shop) => {
    // console.log(sData);
    // console.log(shopId);

      if (shop) {
        shopProfile.findOne({ refID : shopId }).then((profile) => {
            // console.log(pData)
            res.render("shopPages/shopProfile", {
              signupData: shop,
              profileData: profile,
            });
          }).catch((error) => {
            console.log(error);
          });
      } else {}
    }).catch((error) => {
      console.log(error);
    });
  }else{
    res.redirect('/shopLoginPage')
  }
  
};


exports.shopProfileUpdate=(req,res,next)=>{
  const email = req.body.email;
  const shopOwner = req.body.shopOwner;
  const shopName = req.body.shopName;
  const gstin = req.body.gstin;
  const rating = req.body.rating;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const pin = parseInt(req.body.pin);

  // const shopProfileUrl = req.files['shopProfile'][0].path.replace('\\','/');
  // const shopCoverUrl = req.files['shopCover'][0].path.replace('\\','/');

  const shopProfileUrl = req.files['shopProfile']
  ? req.files['shopProfile'][0].path.replace('\\', '/')
  : null; // Default to null if no file is provided

  const shopCoverUrl = req.files['shopCover']
  ? req.files['shopCover'][0].path.replace('\\', '/')
  : null; // Default to null if no file is provided

  // console.log(shopProfileUrl);
  // console.log(shopCoverUrl);

  shopSignup.findOne({ shopEmail: email }).then((shop) => {

      const updateFields = {
        shopOwner: shopOwner,
        shopName: shopName,
        GSTIN: gstin,
        rating: rating,
        street: street,
        city: city,
        state: state,
        pin: pin,
      };

      if (shopProfileUrl) {
        updateFields.profileImg = shopProfileUrl; // Only add if provided
      }
      if (shopCoverUrl) {
        updateFields.coverImg = shopCoverUrl; // Only add if provided
      }

      shopProfile.updateOne({ refID: shop._id },{ $set: updateFields })
        .then((isMatch) => {
          // console.log(isMatch);
          console.log("data updated");
          res.redirect("/shopProfilePage");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

