const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = mongoose.model('User');


function signup(req, res) {
	const { firstName, lastName, email, password } = req.body;
	try {
		const user = new User({ firstName, lastName, email, password});
	  user.save();
		const token = jwt.sign({ userId : user._id}, 'MY_SECRET_KEY');
		res.send({ user });
	} catch(err) {
			return res.status(422).send(err.message); 
	}
}

async function login(req, res) {
	const { email, password } = req.body;
	if(!email || !password) {
			return res.status(422).send({ error : 'Must provide email and password' });
    }
	const user = await User.findOne({ email : email });
	if(!user) {
			return res.status(422).send({ error : "Invalid email or password"});
	}
	try {
		await user.comparePassword(password);
		const token = jwt.sign({ 
			userId : user._id,
			firstName : user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
		 }, 'MY_SECRET_KEY');

		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
			token,
		 });
    }
    catch (err) {
        return res.status(422).send({ error : "Invalid email or passsword"})
    }
}

module.exports = {
  signup,
  login,
};
