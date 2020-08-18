const express = require('express');
const mongoose = require('mongoose');
const {PORT, DB} = require('./config');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/public', express.static('public'));

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
})

app.use(authRouter);
