const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan')
const UserRoute = require('./routes/user')
var cors = require('cors')
const path = require('path')

const app = express();
app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
const dbConfig = require('./config/db');

app.use('', UserRoute)


mongoose.Promise = global.Promise;

app.use(morgan("dev"))


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Databse Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

mongoose.set('strictQuery', false);


app.get('/', (req, res) => {
    res.json({ "message": "Hello Node Express Application" });
});


app.get('/insta', (req, res) => {
    const instaData = {
        "Name": "Sumit Sharma",
        "Followers": 400,
        "email":"sumit12@gmail.com"
    }
    res.json(instaData)
})
app.listen(9080, () => {
    console.log("Server is listening on port 9080");
});

