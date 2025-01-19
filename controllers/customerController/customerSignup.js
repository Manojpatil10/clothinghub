const Signup = require('../../models/cutomerSignupModel');
const Profile = require('../../models/customerProfileModel');
const bcrypt = require('bcrypt');

exports.customerSignupPage=(req,res,next)=>{
  res.render('customerPages/customerSignup');
}

// exports.customerSignupData=(req,res,next)=>{
//   const email = req.body.email;
//   const password = req.body.pass;
//   const saltRounds = 10;

//   Signup.findOne({ customerEmail: email }).then((success) => {
//       console.log(success);

//       if (success === null) {
//         bcrypt.hash(password, saltRounds).then((success) => {
//             console.log(success);

//             let signupData = new Signup({
//               customerEmail: email,
//               password: success,
//             });

//             signupData.save().then((success) => {
//                 console.log(success);

//                 let profileData = new Profile({
//                   refID: success._id,
//                 });

//                 profileData.save().then((success) => {
//                     console.log(success);
//                   })
//                   .catch((error) => {
//                     console.log(error);
//                   });

//                 res.redirect("/customerLoginPage");
//               })
//               .catch((error) => {
//                 console.log(error);
//               });
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } else {
//         console.log("username already exists");
//         res.redirect("/customerSignupPage");
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }






exports.customerSignupData = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.pass;
  const saltRounds = 10;

  Signup.findOne({ customerEmail: email })
    .then((existingUser) => {
      if (existingUser) {
        // Email already exists
        return res.status(400).json({ email: "This email is already registered." });
      }

      // Hash the password
      bcrypt.hash(password, saltRounds)
        .then((hashedPassword) => {
          // Save the user data
          const signupData = new Signup({
            customerEmail: email,
            password: hashedPassword,
          });

          return signupData.save();
        })
        .then((savedUser) => {
          // Create a related profile for the user
          const profileData = new Profile({
            refID: savedUser._id,
          });

          return profileData.save();
        })
        .then(() => {
          // Respond with success message
          res.status(200).json({ message: "Registration successful!" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "An error occurred while processing your request." });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "An error occurred while checking email." });
    });
};
