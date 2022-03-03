const express = require('express');
const productCtrl = require('../controllers/product.controller')
const router = express.Router();

router.route('/products')
	.post(productCtrl.create)
  .get(productCtrl.getproducts);

router.route('/products/:_id')
  .get(productCtrl.getrecord)
  .put(productCtrl.update)
  .delete(productCtrl.remove)
module.exports = router;
