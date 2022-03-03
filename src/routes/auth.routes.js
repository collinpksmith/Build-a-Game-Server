const express = require('express');
const authCtrl = require('../controllers/auth.controller')
const router = express.Router();

router.route('/auth/login')
	.post(authCtrl.login);
	
router.route('/auth/signup')
	.post(authCtrl.signup);


module.exports = router;
