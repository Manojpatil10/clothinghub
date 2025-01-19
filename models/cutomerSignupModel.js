const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customer = new schema({
  customerEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const custData = mongoose.model('customerSignup', customer);
module.exports = custData;
