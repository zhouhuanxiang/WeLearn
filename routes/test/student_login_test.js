var muk = require('muk');
var supertest = require("supertest");
should = require('should');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Student = require('../../Models/Student');
var Course = require('../../Models/Course');
var dbURI    = 'mongodb://localhost/welearndb_test';
var clearDB  = require('mocha-mongoose')(dbURI);

var path = require('path');
var express = require('express');
var session = require('express-session');
var studentLogin = require('../student/login');
var app = express();
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');
app.use(session({ secret: 'keyboard cat', cookie: { secure: false }, resave: false, saveUninitialized: true}));
app.use(function (req, res, next) {
  req.session.openid = '-1';
  next();
});
app.use('/student/login', studentLogin);
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

describe('GET /student/login', function () {
  before(function () {
    muk(Student,  'findOne', function (query, callback) {
      if (query.openid === '1'){
        var result = {
          course: ['course1', 'course2']
        };
        callback(undefined, result);
      }else if (query.openid === '2'){
        callback(new Error(), undefined);
      } else if (query.openid === '3'){
        callback(undefined, undefined);
      }
    })
  });

  it('should return login page', function (done) {
    var app1 = express();
    app1.set('views', path.join(__dirname, '../../views'));
    app1.set('view engine', 'ejs');
    app1.use(session({ secret: 'keyboard cat', cookie: { secure: false }, resave: false, saveUninitialized: true}));
    app1.use(function (req, res, next) {
      req.session.openid = '1';
      next();
    });
    app1.use('/student/login', studentLogin);
    app1.use(function(err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500);
      res.render('error');
    });
    supertest(app1)
      .get('/student/login')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.text.should.be.startWith('<!DOCTYPE html>');
        done();
      });
  });
  it('should return error page', function (done) {
    var app2 = express();
    app2.set('views', path.join(__dirname, '../../views'));
    app2.set('view engine', 'ejs');
    app2.use(session({ secret: 'keyboard cat', cookie: { secure: false }, resave: false, saveUninitialized: true}));
    app2.use(function (req, res, next) {
      req.session.openid = '2';
      next();
    });
    app2.use('/student/login', studentLogin);
    app2.use(function(err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500);
      res.render('error');
    });
    supertest(app2)
      .get('/student/login')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.be.equal(500);
        done();
      });
  });
  it('should return error page', function (done) {
    var app3 = express();
    app3.set('views', path.join(__dirname, '../../views'));
    app3.set('view engine', 'ejs');
    app3.use(session({ secret: 'keyboard cat', cookie: { secure: false }, resave: false, saveUninitialized: true}));
    app3.use(function (req, res, next) {
      req.session.openid = '3';
      next();
    });
    app3.use('/student/login', studentLogin);
    app3.use(function(err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500);
      res.render('error');
    });
    supertest(app3)
      .get('/student/login')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.text.should.be.startWith('<!DOCTYPE html>');
        done();
      });
  });

  after(function () {
    muk.restore();
  })
});

describe('POST /student/login', function (done) {
  it('should return json with fail msg', function (done) {
    supertest(app)
      .post('/student/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({studentId: '2014011909', password:'invalid'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.text.should.be.equal('{"status":"failed"}');
        done();
      });
  });
  // it('should return json with success msg', function (done) {
  //   supertest(app)
  //     .post('/student/login')
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     /**
  //      * TODO
  //      */
  //     .send({studentId: '2014011909', password:'invalid'})
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .end(function (err, res) {
  //       res.text.should.be.equal('{"status":"success"}');
  //       done();
  //     });
  // });
});

// describe('updateCourseDb() test', function (done) {
//   it('should update database', function (done) {
//     var student = {
//       studentnumber: '2014011909',
//       realname: '周焕祥',
//       position: 'undergraduate',
//       department: '软件学院',
//       email: 'zhx14@mails.tsinghua.edu.cn',
//       course: []
//     };
//   });
// });

