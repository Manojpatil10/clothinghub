const Product = require('../../models/shopAddProductModel');
const Cart = require('../../models/cartDataModel');

exports.addToCartPage = (req, res, next) => {
  if (req.session.cstID) {
    const productId = req.query.productId;
    // console.log(productId);

    Product.findOne({ _id: productId }).then((product) => {
      // console.log(product)
      res.render('indexPages/addToCartPage', { productData: product });
    }).catch((error) => {
      console.log(error)
    });
  } else {
    res.redirect('/customerLoginPage');
  }

}


exports.addCartData = (req, res, next) => {
  const size = req.body.size;
  const category = req.body.category;
  const quantity = parseInt(req.body.quantity);
  const productImg = req.body.productImg;
  const price = parseInt(req.body.price);
  const productName = req.body.productName;
  const shopName = req.body.shopName;
  const refID = req.session.cstID;


  Cart.find({
    $and: [
      { productName: { $regex: productName, $options: 'i' } },
      { refID: refID }
    ]
  }).then((success) => {
    // console.log('this is matched data');
    // console.log(success);
    if (success.length > 0) {
      Cart.updateOne({_id:success[0]._id},{$set:{
        productName:productName,
        category:category,
        size:size,
        quantity:quantity,
        price:price
      }}).then((success) => {
        console.log('data updated');
        console.log(success);
        res.redirect('/')
      }).catch((error) => {
        console.log(error)
      })
    } else {
      const data = new Cart({
        refID: refID,
        productImage: productImg,
        productName: productName,
        shopName:shopName,
        category: category,
        size: size,
        quantity: quantity,
        price: price
      })

      data.save().then((success) => {
        console.log('data inserted');
        res.redirect('/');
      }).catch((error) => {
        console.log(error)
      })
    }
  })
}