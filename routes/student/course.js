var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var utf8 = require('utf8');
var router = express.Router();
var Student = require('../../Models/Student');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', urlencodedParser, function (req, res, next) {
  Student.findOne({openid: req.session.openid}, function (err, doc) {
    if (err) next(err);
    var requestData = {
      apiKey: "",
      apisecret: ""
    };
    console.log(doc.studentnumber);
    request({
      method: 'POST',
      url: 'http://se.zhuangty.com:8000/learnhelper/'+ doc.studentnumber +'/courses',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestData)
    }, function (error, response, body) {
      console.log(response.statusCode);
      if(response.statusCode === 200){
        var lessons = JSON.parse(body);
        //console.log(lessons);
        res.render('student/lessons', {
          title: '我的课程',
          lessons: lessons
        });
      }
      else{
        console.log(error);
      }

    });
  })
});

module.exports = router;

