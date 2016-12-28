var muk = require('muk');
var request = require("supertest");
should = require('should');

// var mongoose = require('mongoose');
var Notice = require('../../Models/Notice');
// var dbURI    = 'mongodb://localhost/welearndb_test';
// var clearDB  = require('mocha-mongoose')(dbURI);

var path = require('path');
var express = require('express');
var studentNotice = require('../student/notice');
var app = express();
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');
app.use('/student/notice', studentNotice);
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

describe('GET /student/notice', function () {
  before(function () {
    muk(Notice,  'findOne', function (query, callback) {
      if (query._id === '1'){
        var result = {
          course: 'this is course name',
          msgHead: 'this is msg head',
          msgBody: 'this is msg body',
          photo: 'this is photo name'
        };
        callback(undefined, result);
      }else if (query._id === '0'){
        callback(new Error(), undefined);
      }
    })
  });

  it('should return error info', function (done) {
    request(app)
      .get('/student/notice/0')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.be.equal(500);
        done();
      });
  });
  it('should return rendered page', function (done) {
    request(app)
      .get('/student/notice/1')
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