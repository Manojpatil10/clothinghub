const Profile = require('../../models/customerProfileModel');
const Signup = require('../../models/cutomerSignupModel');
const orderData = require('../../models/orderData');
const brcrypt = require('bcrypt');


exports.customerProfile=(req,res,next)=>{

  const content = req.query.contentId || 'profile'

  if(req.session.cstID){
    Signup.findOne({ _id: req.session.cstID }).then((signupData) => {
      if (signupData) {
        Profile.findOne({refID: req.session.cstID}).then((profileData) => {
            orderData.find({refID:req.session.cstID}).then((order)=>{
              // console.log(order);
              res.render("customerPages/customerProfile", {
                signupData: signupData,
                profileData: profileData,
                orderData:order,
                content:content 
              });
            }).catch((error)=>{
              res.render("customerPages/customerProfile", {
                signupData: signupData,
                profileData: profileData,
                orderData:[],
                content:content
              });
            }) 
          })
          .catch((error) => {
            res.render("customerPages/customerProfile", {
              signupData: signupData,
              profileData: {},
              orderData:[],
              content:content
            });
          });
      } else {
        res.render("customerPages/customerProfile", { signupData:{},profileData:{},content:content });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }else{
    res.redirect('/customerLoginPage')
  }


  
}


exports.customerProfileUpdate=(req,res,next)=>{
  const name = req.body.name;
    const phone = req.body.phone;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const pin = parseInt(req.body.pin);

    const cstProfileUrl = req.files['customerProfile']
    ? req.files['customerProfile'][0].path.replace('\\', '/')
    : null; // Default to null if no file is provided


    const updateFields = {
      name: name,
      phone: phone,
      DOB: dob,
      gender: gender,
      street: street,
      city: city,
      state: state,
      pin: pin
    };

    if (cstProfileUrl) {
      updateFields.profileImg = cstProfileUrl; // Only add if provided
    }
  
    Profile.updateOne({ refID: req.session.cstID },{ $set: updateFields }
      ).then((success) => {
        res.redirect("/customerProfile");
      }).catch((error) => {
        console.log(error);
      });
}