const mongoose = require('mongoose');
const schema = mongoose.Schema;

const order = new schema({
  refID:{
    type:String,
    required:true
  },
  orderNumber:{
    type:Number,
    required:true
  },
  date:{
    type:String,
    required:true
  },
  fullName:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  street:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  pin:{
    type:Number,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  note:{
    type:String,
    required:false
  },
  totalAmount:{
    type:Number,
    required:true
  },
  paymentMethod:{
    type:String,
    required:true
  },
  productDetails: {
    type: [
      {
        shopName: {
          type: String,
          required: true
        },
        productName: {
          type: String,
          required: true
        },
        productImage:{
          type:String,
          required:true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    required: true
  },
  status:{
    type:String,
    required:true
  }
})

const orderData = mongoose.model('orderData',order);
module.exports = orderData;