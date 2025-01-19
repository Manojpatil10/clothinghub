const mongoose = require('mongoose');
const schema = mongoose.Schema;

const shopProfile = new schema({
  shopOwner:{
    type: String,
    require: true
  },
  shopName:{
    type: String,
    require: true
  },
  GSTIN:{
    type: String,
    require: true
  },
  refID:{
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  profileImg:{
    type:String,
    require:false
  },
  coverImg:{
    type:String,
    require:false
  },
  status:{
    type: Number,
    require: true
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

const profileData = mongoose.model('shopprofile',shopProfile);
module.exports=profileData;