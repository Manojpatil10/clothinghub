const bcrypt = require('bcrypt');

exports.adminLoginPage=(req,res,next)=>{
  res.render('adminPages/adminLogin');
}

exports.adminLogin=(req,res,next)=>{
  const adminEmail = req.body.email;
  const adminPass = req.body.pass;
  const password = '$2b$10$o7C7Pq/9/wnvJk2VCaz2b.X1EP2XjqWJL/LLE/CBJeb0v4nec2P8G';

  bcrypt.compare(adminPass,password).then((isMatch)=>{
    // console.log(isMatch);
    // console.log(adminEmail);
    // console.log(adminPass);

    if(adminEmail==='admin@gmail.com' && isMatch){
      req.session.adminId = adminEmail;
      res.redirect('/adminPage');
    }
    else{
      res.redirect('/adminLoginPage');
    }
  }).catch((error)=>{
    console.log(error);
  })
}
