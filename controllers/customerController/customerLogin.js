const Signup = require('../../models/cutomerSignupModel');
const Profile = require('../../models/customerProfileModel');
const Product = require('../../models/shopAddProductModel');
const bcrypt = require('bcrypt');

exports.customerLoginPage=(req,res,next)=>{
  res.render('customerPages/customerLogin');
}

// exports.customerLogin=(req,res,next)=>{
//   const email = req.body.email;
//   const pass = req.body.password;

//   Signup.findOne({ customerEmail: email }).then((customer) => {
//       // console.log(customer);

//       if (customer) {
//         bcrypt.compare(pass, customer.password).then((isMatch) => {
//           if (isMatch) {
//             req.session.cstID = customer._id;
//             res.redirect('/');
//           } else {
//             res.redirect("/customerLoginPage");
//           }
//         });
//       } else {
//         res.redirect("/customerSignupPage");
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }


exports.customerLogin = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;

  // Find customer by email
  Signup.findOne({ customerEmail: email })
    .then((customer) => {
      if (!customer) {
        // Customer not found
        return res.status(404).json({ email: 'No account found with this email. Please sign up.' });
      }

      // Compare passwords
      return bcrypt.compare(pass, customer.password).then((isMatch) => {
        if (!isMatch) {
          // Password mismatch
          return res.status(401).json({ password: 'Incorrect password. Please try again.' });
        }

        // Successful login
        req.session.cstID = customer._id; // Setting session for the customer
        return res.status(200).json({ message: 'Login successful!', redirectUrl: '/' });
      });
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
      res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    });
};