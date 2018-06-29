/**
 * Created by Abdul jabbar on 20/07/2017.
 */
/* GET home page. */
var jsonwebtoken = require('jsonwebtoken');
var users = require('./api/users');
var profile = require('./api/profile');
var catalog = require('./api/catalog');
var contactus = require('./api/contactus');

var config = require('../config/configuration.js');
var apiPrefix = '/api/';

console.log("Regime is running on port 3399!");

exports.router = function (app) {
    // app.use((req, res, next) => {
    //     if (req.headers['x-access-key'] === config.accessKey) {
    //         next();
    //     } else {
    //         res.json({ status: 401, message: 'ServerInvalidSecretKey' });
    //        // next();
    //     }
    //    // next();
    // });
    app.use(apiPrefix + 'users', users);
    app.use(apiPrefix + 'profile', profile);
    app.use(apiPrefix + 'contact', contactus);

    //start middleware
    app.use((req, res, next) => {
        console.log('*----------MiddleWare------------*');
        var token = req.body.token || req.query.token || req.headers["x-access-token"];
        // var token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4NCwibmFtZSI6IkFsZXgiLCJpYXQiOjE1MDkyOTMzNDN9.iHQDAtKxfFjN_pWLzcC6uqm1k1TrsZIF6Sq0P5HgmxI";
        if (token) {
            jsonwebtoken.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    res.status(403).send({ success: false, status: 403, message: "Invalid user token." });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({ success: false, message: "No token provided" });
        }
    }); //end middleware
    app.use(apiPrefix + 'profile', profile);
    // app.use(apiPrefix + 'catalog', catalog);
};


