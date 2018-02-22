var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const axios = require("axios");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/courses', (req, res) => {
  axios.get('https://cobalt.qas.im/api/1.0/courses',{
    headers:{
	    Authorization: 'QF2Jgy8zLDg9CUQ6LanNBwnF94ex8UYk'
    }
  })	
    .then((response) => {
      console.log(response);
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("Hello there");
});

app.get('/index', (req,res) => {
  res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/ab*cd', function(req, res){
	console.log("Got a GET request");
	res.send("Page match");
});

app.post('/get_information', (req, res) => {
  console.log("Hello there");
  console.log(req.body);
  var course_id = req.body.course_id;
  console.log(course_id);

  axios.get('http://127.0.0.1:4242/1.0/courses/search', {
    params: {
      q: course_id
    }
  })
  .then( (response) => {
    res.end(JSON.stringify(response.data));
  })
  .catch( (error) => {
    res.status = 404;
    res.send("Failed!");
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var server = app.listen(8081, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

module.exports = app;
