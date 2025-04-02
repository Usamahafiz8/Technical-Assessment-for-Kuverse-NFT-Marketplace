const config = require('./config')();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

let cookieParser = require('cookie-parser');

let flash = require('connect-flash');
let session = require('express-session');

const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require('method-override');
const app = express();
app.use(cors());
let api_route = require('./routes/api_route');
let admin_route = require('./routes/admin_route');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/web3-script', express.static(path.join(__dirname, '/node_modules/web3')));

app.use(cookieParser());
app.use(session({
    secret:"1234567890",
    cookie: {maxAge: 2592000000},
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(bodyParser.urlencoded({limit: '500mb', extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '500mb', extended: true}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db_name,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true},
    async function (err, db) {
        let d = new Date();
        if (err) {
            console.log('[' + d.toLocaleString() + '] ' + 'Sorry, there is no mongo db server running.');
        } else {
            let attachDB = function (req, res, next) {
                req.db = db;
                next();
            };
            app.use('/api', attachDB, api_route);
            app.use('/admin-routes', attachDB, admin_route);
            app.get('/*', (req, res) => {
                res.sendFile(path.join(__dirname, 'build', 'index.html'));
            });
            app.listen(config.port, async function () {
                console.log('[' + d.toLocaleString() + '] ' + 'Server listening ' + config.base_url);
            });
        }
    });
