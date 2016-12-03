var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/welearndb');
mongoose.connection.on('open', function () {
  console.log('database ok');
});
// 以下三行处理带文件表单的依赖
// var multer = require('multer');
// var upload = multer({ dest: 'public/photos/' });
// var fs = require('fs');

var wechat = require('./routes/wechat');
var studentLogin = require('./routes/student/login');
var studentLesson = require('./routes/student/lesson');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.query());

app.use('/wechat', wechat);
app.use('/student/login', studentLogin);
app.use('/student/lesson', studentLesson);


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

module.exports = app;
