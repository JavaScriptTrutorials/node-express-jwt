const express = require('express');
const mongoose = require('mongoose');
const {PORT, DB} = require('./config');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());

app.use('/public', express.static('public'));
app.use(cookieParser());

app.set('view engine', 'ejs');

// connect to mongoDB
const dbURI = `mongodb+srv://${DB.USER}:${DB.PASSWORD}@nodecluster.mjkee.mongodb.net/${DB.NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(result => app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`)))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.render('./home');
});

app.get('/smoothies', (req, res) => {
    res.render('./smoothies')
});

// cookies
app.get('/set-cookies', (req, res) => {
    //res.setHeader('Set-Cookie', 'newUser=True');
    res.cookie('newUser', false);
    res.cookie('isEmploy', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
    res.send('you got the cookies!');
});

app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.json(cookies);
});

app.use(authRouter);
