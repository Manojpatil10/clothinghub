const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const indexRouter = require('./routes/indexRoutes');
const shopRouter = require('./routes/shopRoutes');
const adminRouter = require('./routes/adminRoutes');
const customerRouter = require('./routes/customerRoutes');
const session = require("express-session");
const mongoose = require('mongoose');
const multer=require('multer');
require('dotenv').config();
const mongooseConnect = require('connect-mongodb-session')(session);


app.use(bodyparser.urlencoded({extended:false}));
// const mongoUri = process.env.ATLAS_URI;
const mongoUri = process.env.MONGODB_URI;



app.use('/uploads',express.static((path.join(__dirname,"uploads"))));
const store = new mongooseConnect({
  uri:mongoUri,
  collection:'session',
});

app.use(session({
  secret:'This is session storage',
  resave:false,
  saveUninitialized:true,
  store:store
}));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const imgArray = [
  {
    name:'productImg',
    maxCount:1
  },
  {
    name:'shopProfile',
    maxCount:1
  },
  {
    name:'shopCover',
    maxCount:1
  },{
    name:'customerProfile',
    maxCount:1
  }
]


app.use(express.static((path.join(__dirname,"public"))));
app.use(multer({storage:fileStorage}).fields(imgArray));
app.set("view engine","ejs");
app.use(indexRouter);
app.use(shopRouter);
app.use(adminRouter);
app.use(customerRouter);





mongoose.connect(`${process.env.MONGODB_URI}`).then((success)=>{
  console.log('Database connected successfully');
}).catch((error)=>{
  console.log(error);
});

// mongoose.connect(`${process.env.ATLAS_URI}`).then((success)=>{
//   console.log('Database connected successfully');
// }).catch((error)=>{
//   console.log(error);
// });
 
app.listen(`${process.env.PORT}`); 