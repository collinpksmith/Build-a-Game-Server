const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  date : {
    type : Date,
    required : true
  },
  price : {
    type : Number,
    default: 0,
    required : true
  },
  productname : {
    type : String,
    required : true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  } 
});

module.exports = mongoose.model('Product', ProductSchema);