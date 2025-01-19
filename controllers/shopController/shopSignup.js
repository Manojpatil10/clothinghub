const shopSignup = require('../../models/shopSignupModel');
const shopProfile = require('../../models/shopProfileModel');
const bcrypt = require('bcrypt')

exports.shopSignupPage = (req, res, next) => {
  res.render('shopPages/shopSignup');
}


// exports.shopSignupData = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const status = 1;
//   const saltRounds = 10;

//   shopSignup.findOne({ shopEmail: email }).then((success) => {
//       // console.log(success);

//       if (success === null) {
//         bcrypt.hash(password, saltRounds).then((success) => {
//             // console.log(success);

//             let data = new shopSignup({
//               shopEmail: email,
//               shopPass: success,
//               status : status
//             });

//             data.save().then((success) => {
//                 // console.log(success);

//                 let profileData = new shopProfile({
//                   refID: success._id,
//                 });

//                 profileData.save().then((success) => {
//                     console.log(success);
//                   }).catch((error) => {
//                     console.log(error);
//                   });

//                 res.redirect("/shopLoginPage");
//               }).catch((error) => {
//                 console.log(error);
//               });
//           }).catch((error) => {
//             console.log(error);
//           });
//       } else {
//         console.log("shop name already exists");
//         res.redirect("/shopSignupPage");
//       }
//     }).catch((error) => {
//       console.log(error);
//     });
// };




exports.shopSignupData = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const status = 1;
  const saltRounds = 10;

  shopSignup
    .findOne({ shopEmail: email })
    .then((shop) => {
      if (shop) {
        // Shop already exists
        return res.status(400).json({ email: "Shop email already exists." });
      }

      // Hash password and save new shop
      bcrypt
        .hash(password, saltRounds)
        .then((hashedPassword) => {
          const newShop = new shopSignup({
            shopEmail: email,
            shopPass: hashedPassword,
            status: status,
          });

          return newShop.save();
        })
        .then((savedShop) => {
          const profileData = new shopProfile({ refID: savedShop._id });
          return profileData.save();
        })
        .then(() => {
          res.status(200).json({ message: "Shop registered successfully!" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "An error occurred. Please try again later." });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "An error occurred. Please try again later." });
    });
};


