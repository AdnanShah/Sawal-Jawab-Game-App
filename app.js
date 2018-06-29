const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const configFile = require('./config/configuration');

require('./config/database');
const expressValidator = require('express-validator');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('superSecret', configFile.secret);

app.get('/table', function(req, res) {
	res.render('viewUsers');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(expressValidator());
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join('config')));

app.use( (req, res, next) =>{
 // res.contentType('application/json');
 // console.log("req headers",req.headers);
 // console.log("whole req",req);
  next();
});
// app.use(function ( req, res, next ) {
//   var headers = {};

//   // set header to handle the CORS
//   headers['Access-Control-Allow-Origin'] = '*';
//   headers['Access-Control-Allow-Headers'] = 'Content-Type,x-access-key,x-access-token';
//   headers['Access-Contrl-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS';
//   headers["Access-Control-Max-Age"] = '86400';
//   headers['x-access-key']='x-access-key';
//   headers['x-access-token']='x-access-token';
//  // res.writeHead(200, headers);

//   if ( req.method === 'OPTIONS' ) {
//       console.log('OPTIONS SUCCESS');
//    //console.log("req headers",req.header);
//       // res.json({ status: 500, message: 'QueryError' + err });
//       // res.end();
//   }

//   console.log("req headers",req.headers);
//     next()
// });

// HTTP routes
routes.router(app);
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
      console.log(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
process.on('uncaughtException',  (error) => {
  console.log(error.stack);
});
module.exports = app;
