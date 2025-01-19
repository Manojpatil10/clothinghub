const Product = require('../../models/shopAddProductModel');

// exports.exploreMorePage=(req,res,next)=>{
//   const categoryContent = req.query.categoryId;

//   Product.find({categories: { $in: [categoryContent] }}).then((success)=>{
//     console.log(success)
//   }).catch((error)=>{
//     console.log(error)
//   })

// }

exports.exploreMorePage = (req, res, next) => {
  const categoryContent = req.query.categoryId;

  const page = parseInt(req.query.page) || 1;

  // Number of products to show per page
  const limit = 12;

  // Calculate the number of products to skip
  const skip = (page - 1) * limit;

  // Build query filter
  let query = { categories: { $in: [categoryContent] } };

  // Fetch total products count for pagination with category filter
  Product.countDocuments(query)
    .then((totalProducts) => {
      const totalPages = Math.ceil(totalProducts / limit);

      // Fetch products with pagination and category filter
      return Product.find(query)
        .skip(skip)
        .limit(limit)
        .then((product) => {
          // console.log(product.length);
          // Render the page with the products and pagination data
          res.render('indexPages/exploreMorePage', {
            productData: product,
            currentPage: page,
            totalPages: totalPages,
            categoryId: categoryContent // Make sure to pass the categoryId for the pagination links
          });
        });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      next(error);
    });
}


exports.pagination=(req,res,next)=>{
  // Get the page number from query params (default to 1 if not provided)
  const page = parseInt(req.query.page) || 1;

  // Number of products to show per page
  const limit = 12;

  // Calculate the number of products to skip
  const skip = (page - 1) * limit;

  // Fetch total products count for pagination
  Product.countDocuments()
    .then(totalProducts => {
      const totalPages = Math.ceil(totalProducts / limit);

      // Fetch products with pagination
      return Product.find()
        .skip(skip)
        .limit(limit)
        .then(products => {
          // Render the page with the products and pagination data
          res.render('indexPages/pagination', {
            products,
            currentPage: page,
            totalPages,
          });
        });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      next(error);
    });
}