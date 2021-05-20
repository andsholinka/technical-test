const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./config/db');
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//default error
app.use((err, req, res, next) => {
    res.send(err.message)
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

app.get('/', function (req, res) {
    res.json({
        message: 'SejutaCita'
    })
});

const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/user');

app.use('/api', AuthRoute);
app.use('/api/', UserRoute);