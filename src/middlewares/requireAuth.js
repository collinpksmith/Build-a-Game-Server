const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
	console.log(req);
	const { authorization } = req.headers;
	console.log("headers in requireAuth : \n",req.headers);

	if(!authorization) {
			res.status(401).send({ error : 'You must be logged in.' });
	}
	
	const token = authorization.replace('JWT ', '');
	jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
		if(err) {
				return res.status(401).send({ error : 'You must be logged in.' })
		}
		const { userId } = payload;
		const user = await User.findById(userId);
		req.user = user;
		next();
	});
};
