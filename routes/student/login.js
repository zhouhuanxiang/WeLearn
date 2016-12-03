var wrapper = require('../../wrapper');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var utf8 = require('utf8');
var router = express.Router();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function (req, res, next) {
  res.render('student/login', {
    title: '学生登录界面',
    condition: 'login'
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
      res.render('student/login', {
        title: '绑定成功',
        condition: 'loginSuccess'
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