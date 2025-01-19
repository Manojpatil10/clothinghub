const Signup = require('../../models/cutomerSignupModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

exports.cstForgetPassPage = (req, res, next) => {
  res.render('customerPages/customerForgetPass');
}

// exports.cstSendResetPassLink = (req, res, next) => {
//   const email = req.body.email;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "mrpnashik@gmail.com",
//       pass: "ymze pbed rebv diqo",
//     },
//   });
//   const mailOptions = {
//     from: "mrpnashik@gmail.com", // Sender address
//     to: email, // Recipient address(es)
//     subject: "ClothingHub - Reset Password",
//     text: "Click on the below link to reset password",
//     html: `<p>localhost:8080/cstResetPassForm?email=${email}</p>`
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log("Error occurred:", error);
//     }
//     console.log("Email sent successfully:", info.response);
//     res.redirect('/cstForgetPassPage');
//   });
// }



exports.cstSendResetPassLink = (req, res, next) => {
  const email = req.body.email;


  // Check if email exists in the database
  Signup.findOne({ customerEmail : email })
    .then((customer) => {
      
      if (!customer) {
        return res.status(400).json({ email: "Email not found in the database." });
      }

      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email options
      const mailOptions = {
        from: "mrpnashik@gmail.com",
        to: email,
        subject: "ClothingHub - Reset Password",
        html: `<p>Click the link below to reset your password:</p>
               <a href="http://localhost:8080/cstResetPassForm?email=${encodeURIComponent(
          email
        )}">Reset Password</a>`,
      };

      // Send email
      transporter.sendMail(mailOptions)
        .then((info) => {
          console.log("Email sent successfully:", info.response);
          res.json({ message: "Reset password link sent successfully!" });
        })
        .catch((error) => {
          console.log("Error occurred while sending email:", error);
          res.status(500).json({ error: "Failed to send reset password email." });
        });
    })
    .catch((error) => {
      console.log("Error occurred while checking email in the database:", error);
      res.status(500).json({ error: "An unexpected error occurred." });
    });
};




exports.cstResetPassForm = (req, res, next) => {
  const email = req.query.email;
  res.render('customerPages/cstResetPassform', { email: email });
}

// exports.cstUpdatePass = (req, res, next) => {
//   const email = req.body.email
//   const pass = req.body.pass;
//   const confirmPass = req.body.confirmPass;
//   const saltRounds = 10;

//   if (pass === confirmPass) {
//     bcrypt.hash(pass, saltRounds).then((success) => {
//       Signup.updateOne({ customerEmail: email }, { $set: { password: success } }).then((success) => {
//         console.log(success)
//         res.redirect('/customerLoginPage')
//       }).catch((error) => {
//         res.redirect('/cstResetPassform');
//       })
//     }).catch((error) => {
//       console.log(error);
//     })
//   }
// }

exports.cstUpdatePass = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const confirmPass = req.body.confirmPass;
  const saltRounds = 10;


  // Validate password length and match
  if (pass.length <= 2) {
    // If password length is not valid, return a failure response
    return res.status(400).json({ message: 'Password must be greater than 2 characters.' });
  }

  if (pass !== confirmPass) {
    // If passwords do not match, return a failure response
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  // Proceed with hashing the password and updating the database
  bcrypt.hash(pass, saltRounds).then((hashedPassword) => {
    Signup.updateOne({ customerEmail: email }, { $set: { password: hashedPassword } })
      .then((result) => {
        if (result.modifiedCount > 0) {
          // Password updated successfully
          res.status(200).json({ message: 'Password updated successfully.' });
        } else {
          // If no document was updated (e.g., no matching email found)
          res.status(404).json({ message: 'Email not found.' });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while updating the password.' });
      });
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while hashing the password.' });
  });
};
