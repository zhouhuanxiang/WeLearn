var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var url = require('url');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/welearndb');
mongoose.connection.on('open', function () {
  console.log('Mongodb is connected.');
});

var wechat = require('./routes/wechat');
var studentLogin = require('./routes/student/login');

var studentSchedule = require('./routes/student/schedule');
var studentLesson = require('./routes/student/course');
var studentMessage = require('./routes/student/message');
var teacherMessage = require('./routes/teacher/message');
var studentNotice = require('./routes/student/notice');
var teacherNotice = require('./routes/teacher/notice');
var message = require('./routes/message');

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
app.use(session({
  maxAge: 1800000,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//var dataInsert = require('./data_insert');
//dataInsert();
var Student = require('./Models/Student');
var Course = require('./Models/Course');
var Message = require('./Models/Message');
var Notice = require('./Models/Notice');

// Student.remove({}, function (err, doc) {});
// Course.remove({}, function (err, doc) {});
// Message.remove({}, function (err, doc) {});
// Notice.remove({}, function (err, doc) {});

// Student.find({}, function (err, doc) {
//   console.log('---Student---');
//   console.log(doc);
// });
// Course.find({}, function (err, doc) {
//   console.log('---Course---');
//   console.log(doc);
// });
// Notice.find({}, function (err, doc) {
//   console.log('---Notice---');
//   console.log(doc);
// });
// Message.find({}, function (err, doc) {
//   console.log('---Message---');
//   console.log(doc);
// });

/*
var menu = require('./handler/menu_control');
var access_token = require('./handler/access_token');
access_token.getAccessToken(function(token){
  menu.create_menu(token);
});
*/

app.use('/wechat', wechat);
app.use(function (req, res, next) {
  var openid = url.parse(req.url, true).query['openid'];
  if (openid){
    req.session.openid = url.parse(req.url, true).query['openid'];
    console.log('');
    console.log("new guest: " + req.session.openid);
    next();
  }else if (req.session.openid){
    next();
  }else{
    var err = new Error('服务不可用');
    err.status = 503;
    next(err);
  }
});

app.use('/message', message);

app.use('/student/login', studentLogin);

app.use('/student/schedule', studentSchedule);
app.use('/student/course', studentLesson);

app.use('/student/message', studentMessage);
app.use('/teacher/message', teacherMessage);
app.use('/student/notice', studentNotice);
app.use('/teacher/notice', teacherNotice);

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
app.listen(80);
