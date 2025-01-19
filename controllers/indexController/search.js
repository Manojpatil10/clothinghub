const Product = require('../../models/shopAddProductModel');

exports.search=(req,res,next)=>{
  const query = req.query.q;

  console.log(query);

  Product.find({productName: { $regex: query, $options: 'i' } }).then((product)=>{
    console.log(product);
  }).catch((error)=>{
    console.log(error);
  })
}