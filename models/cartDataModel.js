const mongoose = require('mongoose');
const schema = mongoose.Schema;


const cart = new schema({
  productImage:{
    type:String,
    require:true
  },
  productName:{
    type:String,
    require:true
  },
  shopName:{
    type:String,
    require:true
  },
  category:{
    type:String,
    require:true
  },
  size:{
    type:String,
    require:true
  },
  quantity:{
    type:Number,
    require:true
  },
  price:{
    type:Number,
    require:true
  },
  refID:{
    type:String,
    require:true
  }
})


const cartData = mongoose.model('cartData',cart)
module.exports=cartData;