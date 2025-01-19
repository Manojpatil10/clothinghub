const Signup = require('../../models/shopSignupModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

exports.shopForgetPassPage=(req,res,next)=>{
  res.render('shopPages/shopForgetPassPage');
}

// exports.shopSendResetPassLink=(req,res,next)=>{
//   const email = req.body.email;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER, 
//       pass: process.env.EMAIL_PASS, 
//     },
//   }); 
//   const mailOptions = {
//     from: "mrpnashik@gmail.com", 
//     to: email, 
//     subject: "ClothingHub - Reset Password", 
//     text: "Click on the below link to reset password", 
//     html:`<p>localhost:8080/shopResetPassForm?email=${email}</p>`
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log("Error occurred:", error);
//     }
//     console.log("Email sent successfully:", info.response);
//     res.redirect('/shopForgetPassPage');
//   });
// }




exports.shopSendResetPassLink = (req, res, next) => {
  const email = req.body.email;


  // Check if email exists in the database
  Signup.findOne({ shopEmail : email })
    .then((shop) => {
      
      if (!shop) {
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
               <a href="http://localhost:8080/shopResetPassForm?email=${encodeURIComponent(
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

exports.shopResetPassForm=(req,res,next)=>{
  const email = req.query.email;
  res.render('shopPages/shopResetPassform',{email:email});
}

// exports.shopUpdatePass=(req,res,next)=>{
//   const email = req.body.email
//   const pass = req.body.pass;
//   const confirmPass = req.body.confirmPass;
//   const saltRounds = 10;

//   if(pass === confirmPass){
//     bcrypt.hash(pass,saltRounds).then((success)=>{
//       Signup.updateOne({shopEmail:email},{$set:{password:success}}).then((success)=>{
//         console.log(success)
//         res.redirect('/shopLoginPage')
//       }).catch((error)=>{
//         res.redirect('/shopResetPassform');
//       })
//     }).catch((error)=>{
//       console.log(error);
//     })
//   }
// }


exports.shopUpdatePass = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const confirmPass = req.body.confirmPass;
  const saltRounds = 10;

  if (pass === confirmPass) {
    bcrypt
      .hash(pass, saltRounds)
      .then((hashedPass) => {
        Signup.updateOne({ shopEmail: email }, { $set: { password: hashedPass } })
          .then((result) => {
            if (result.modifiedCount > 0) {
              res.status(200).json({ message: "Password updated successfully" });
            } else {
              res.status(400).json({ error: "Email not found or already up-to-date" });
            }
          })
          .catch((error) => {
            console.error("Database update error:", error);
            res.status(500).json({ error: "An error occurred while updating the password" });
          });
      })
      .catch((error) => {
        console.error("Password hashing error:", error);
        res.status(500).json({ error: "An error occurred while hashing the password" });
      });
  } else {
    res.status(400).json({ error: "Passwords do not match" });
  }
};
