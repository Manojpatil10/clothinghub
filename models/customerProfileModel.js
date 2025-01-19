const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Profile = new schema({
  name:{
    type: String,
    require: true
  },
  refID:{
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  phone:{
    type: Number,
    require: true
  },
  DOB:{
    type: String,
    require: true
  },
  gender:{
    type: String,
    require: true
  },
  profileImg:{
    type:String,
    require:true
  },
  street:{
    type: String,
    require: true
  },
  city:{
    type: String,
    require: true
  },
  state:{
    type: String,
    require: true
  },
  pin:{
    type: Number,
    require: true
  }
});

const profileData = mongoose.model('customerProfile',Profile);
module.exports=profileData; 