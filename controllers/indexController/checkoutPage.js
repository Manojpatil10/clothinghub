const cartData = require('../../models/cartDataModel');
const orderData = require('../../models/orderData');

exports.checkoutPage = (req, res, next) => {
  const content = req.query.content || 'shopCheckout';

  cartData.find({ refID: req.session.cstID }).then((success) => {
    // console.log(success)
    orderData.findOne({ refID: req.session.cstID }).then((order) => {
      res.render('indexPages/checkoutPage', { productData: success, content: content, orderData: order });
    }).catch((error) => {
      res.render('indexPages/checkoutPage', { productData: success, content: content, orderData: {} });
    })
  }).catch((error) => {
    console.log(error)
  })
}


exports.orderDataSave = (req, res, next) => {
  const name = req.body.firstname + ' ' + req.body.lastname;
  const phone = parseInt(req.body.phone);
  const email = req.body.email;
  const street = req.body.street;
  const city = req.body.city;
  const pin = parseInt(req.body.pin);
  const state = req.body.state;
  const country = req.body.country;
  const note = req.body.note;
  const totalAmt = parseInt(req.body.totalAmount);
  const paymentMethod = req.body.paymentMethod;
  const shopNames = Array.isArray(req.body.shopName) ? req.body.shopName : [req.body.shopName];
  const productNames = Array.isArray(req.body.productName) ? req.body.productName : [req.body.productName];
  const quantities = Array.isArray(req.body.quantity) ? req.body.quantity : [req.body.quantity];
  const productImage = Array.isArray(req.body.productImg) ? req.body.productImg : [req.body.productImg];


  const productDetails = shopNames.map((shopName, index) => ({
    shopName: shopName,
    productName: productNames[index],
    productImage: productImage[index],
    quantity: parseInt(quantities[index], 10), // Convert to number
  }));

  function generateOrderNumber() {
    return Math.floor(10000 + Math.random() * 90000);
  }
  const orderNumber = generateOrderNumber();
  // console.log(orderNumber);

  function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Ensure 2 digits for day
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const currentDate = getCurrentDate();
  // console.log(currentDate);

  const Data = new orderData({
    refID: req.session.cstID,
    orderNumber: orderNumber,
    date: currentDate,
    fullName: name,
    phone: phone,
    email: email,
    street: street,
    city: city,
    pin: pin,
    state: state,
    country: country,
    note: note,
    totalAmount: totalAmt,
    paymentMethod: paymentMethod,
    productDetails: productDetails,
    status: 'pending'
  })

  Data.save().then((success) => {
    // console.log(success)
    res.redirect(`/otpVerification?email=${email}`);
  }).catch((error) => {
    console.log(error)
  })

}



exports.otpVerification = (req,res,next) => {

  const email = req.body.email;

  function generateRandomOTP() {
    return Math.floor(100000 + Math.random() * 900000); // Ensures a 6-digit number
  }

  const otp = generateRandomOTP();

  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service provider (e.g., Gmail, Outlook, etc.)
    auth: {
      user: "mrpnashik@gmail.com", // Your email
      pass: "ymze pbed rebv diqo", // Your email password or app-specific password
    },
  });
  const mailOptions = {
    from: "mrpnashik@gmail.com", // Sender address
    to: email, // Recipient address(es)
    subject: "ClothingHub - Reset Password", // Email subject
    text: "This OTP is valid for 10 minutes. If you didn't request this, please ignore this message.", // Plain text body
    html: `<p>Your OTP is ${otp}</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred:", error);
    }
    console.log("Email sent successfully:", info.response);
    res.redirect(`/verifyOTP?otp=${otp}`);
  });
}


exports.verifyOTP=(req,res,next)=>{
  const otp = req.query.otp;
  const formOTP = parseInt(request.body.otp);

  if(otp === formOTP){
    res.redirect('/checkoutPage?content=order');
  }
  else{
    res.redirect('/checkoutPage?content=verification');
  }

}
