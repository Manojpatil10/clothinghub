const shopSignup = require('../../models/shopSignupModel');
const shopProfile = require('../../models/shopProfileModel');
const bcrypt = require('bcrypt');


exports.shopLoginPage = (req,res,next) =>{
  res.render('shopPages/shopLogin');
} 


// exports.shopLogin = (req, res, next) => {
//   const email = req.body.email;
//   const pass = req.body.password;

//   shopSignup.findOne({ shopEmail: email }).then((shop) => {
//       if (shop) {
//         bcrypt.compare(pass, shop.shopPass).then((isMatch) => {
//           if (isMatch) {
//             req.session.shopId = shop._id;
//             res.redirect("/shopProfilePage");
//           } else {
//             res.redirect("/shopLoginPage");
//           }
//         });
//       } else {
//         res.redirect("/shopSignupPage");
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };


exports.shopLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  shopSignup
    .findOne({ shopEmail: email })
    .then((shop) => {
      if (!shop) {
        // Shop not found
        return res.status(400).json({ email: "No account found with this email address." });
      }

      // Compare the password
      bcrypt.compare(password, shop.shopPass).then((isMatch) => {
        if (isMatch) {
          // Set session and respond with success
          req.session.shopId = shop._id;
          res.status(200).json({ message: "Login successful!" });
        } else {
          // Incorrect password
          res.status(400).json({ password: "Incorrect password. Please try again." });
        }
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "An error occurred. Please try again later." });
    });
};





