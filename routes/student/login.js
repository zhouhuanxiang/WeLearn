var wrapper = require('../../wrapper');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var utf8 = require('utf8');
var router = express.Router();
var Student = require('../../Models/Student');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function (req, res, next) {
  Student.findOne({openid: req.session.openid}, function (err, doc) {
    if (err){
      next(err);
      return;
    }
    if (doc){
      res.redirect('/student/lesson');
    }
    else{
      res.render('student/login', {
        title: '学生登录界面',
        condition: 'login'
      });
    }
  });
});

router.post('/', urlencodedParser, function (req, res, next) {
  var requestData = {
    apiKey: "",
    apisecret: "",
    username: utf8.encode(req.body.studentId),
    password: utf8.encode(req.body.password)
  };
  request({
    method: 'POST',
    url: 'http://se.zhuangty.com:8000/users/register',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  }, function (error, response, body) {
    if (response.statusCode === 200){
      body = JSON.parse(body);
      Student.findOne({studentnumber: body.information.studentnumber}, function (err, doc) {
        if (err){
          next(err);
          return;
        }
        if (doc === null) {
          var student = {
            openid: req.session.openid,
            studentnumber: body.information.studentnumber,
            realname: body.information.realname,
            position: body.information.position,
            department: body.information.department,
            email: body.information.email
          };
          var studentObj = new Student(student);
          studentObj.save(function (err, data) {
            if (err) res.send(err);
            res.render('student/login', {
              title: '绑定成功',
              condition: 'loginSuccess'
            });
          });
        }
        else{
          res.render('student/login', {
            title: '已绑定',
            condition: 'loginTwice'
          });
        }
      });
    }
    else{
      res.render('student/login', {
        title: '学生登录界面',
        condition: 'loginFail'
      });
    }
  });
});

module.exports = router;