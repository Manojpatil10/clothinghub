const mongoose = require("mongoose");
const schema = mongoose.Schema;

const shopSignup = new schema({
  shopEmail: {
    type: String,
    required: true,
  },
  shopPass:{
    type: String,
    required:true
  },
  status:{
    type:Number,
    require:true
  }
});

const shopSignupData = mongoose.model('shopsignup', shopSignup);
module.exports = shopSignupData;
