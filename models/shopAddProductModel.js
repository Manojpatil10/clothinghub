const mongoose = require("mongoose");
const schema = mongoose.Schema;

const shopAddProductModel = new schema({
  shopName: {
    type: String,
    required: true,
  },
  GSTIN: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productBrand: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  check:{
    type:String,
    require:true
  }
});

const product = mongoose.model('shopProduct', shopAddProductModel);
module.exports = product;
