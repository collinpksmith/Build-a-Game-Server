require('./models/product.model');
require('./models/user.model');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const requireAuth = require('./middlewares/requireAuth')
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(authRoutes);
app.use(productRoutes);

const mongoUri = 'mongodb://localhost:27017/hook_exam'

mongoose.connect(mongoUri, {
    useNewUrlParser : true,
    useCreateIndex : true
})

mongoose.connection.on('connected', () => {
    console.log("Connnected to mongo instance ....");
})

mongoose.connection.on('error', (err) => {
    console.error("Error on connecting to mongo\n",err);
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email : ${req.user.email}`);
});

app.listen(3000, () => {
    console.log("Listening on port 3000 .......");
})
