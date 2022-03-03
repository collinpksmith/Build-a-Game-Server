const res = require('express/lib/response');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ROLES = require('../config/role');

// add new product record
async function create (req, res) {
  const { date, price, productname, userID } = req.body;
  const product = new Product ({ date, price, productname, user: userID});
  product.save()
  .then((product) => {
    res.json(product);
  })
}

//get specific record 
async function getrecord(req, res) {
  const record = await Product.findById(req.params._id);
  res.json(record);
}

// get all product record
async function getproducts (req, res) {
  const products = await Product.find();
  res.json(products);
}

// update specific record
async function update( req, res) {
  const product = await Product.findById(req.body.recordID)
  Object.assign(product, req.body)
  await product.save()
  res.json(product);
}

//delete one specific record
async function remove ( req, res ) {
  const product = await Product.findById(req.params._id)
  if(!product) {
    return res.status(422).send({ error : "Record not found"});
  }
  await product.remove()
  res.json(product);
}


module.exports = {
  getproducts,
  getrecord,
  create,
  update,
  remove
};
  