/* eslint-disable prefer-const */
const Cart = require("../models/cartModel");
const Product = require("../models/product");


exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });

};

exports.getProducts = (req, res, next) => {
   
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.fetchById(productId , (product) => {
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};



exports.getCart = (req, res, next) => {
  Cart.getFromCart((cart) => {
    cart = cart[0];
  //   res.render("shop/cart", {
  //     path: "/cart",
  //     prods: cart.products,
  //     totalPrice: cart.totalPrice,
  //     qty: cart.qty,
  //     pageTitle: "Your Cart",
  //   });
  });
};

exports.postCart = async (req, res, next) => {
  const { productId } = req.body;
  Cart.addToCart(productId);
  res.redirect("/cart");
};

exports.deleteCart = (req, res, next) => {
  const { cartId } = req.body;
  Cart.filterCart(cartId);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};