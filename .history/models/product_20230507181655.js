/* eslint-disable import/extensions */
/* eslint-disable prefer-const */
const Sequelize = require('sequelize');

// eslint-disable-next-line import/order
const sequelize = require('../util/database');

const fs = require('fs');
const path = require('path');

const Cart = require('./cartModel.js');

sequelize.de
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
     if(this.id){
      const proudctIndex = products.findIndex(prod=> prod.id === this.id);
      products[proudctIndex] = this;
      // products = [...updateProducts];
      }
      else{
        this.id = Math.random().toFixed(3).toString();
        products.push(this);
      }
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });

    });

  }



  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static delProduct(id) {
    getProductsFromFile(products => {
       products = products.filter(prod => prod.id !== id);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if(!err){
            Cart.filterCart(id)
          }
        })
    })
  }
  
};