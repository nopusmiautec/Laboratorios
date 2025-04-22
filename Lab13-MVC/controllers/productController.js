const Product = require('../models/Product');

exports.getProducts = (req, res) => {
  const products = Product.getAll();
  res.render('products/list', {
    pageTitle: 'Lista de Productos',
    path: '/products',
    products: products
  });
};

exports.getProductDetail = (req, res) => {
  const productId = req.params.id;
  const product = Product.getById(productId);
  
  if (!product) {
    return res.redirect('/404');
  }
  
  res.render('products/detail', {
    pageTitle: `Detalle: ${product.name}`,
    path: '/products',
    product: product
  });
};