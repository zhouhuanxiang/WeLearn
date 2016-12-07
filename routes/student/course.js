/**
 接口说明
 by 杨景
 2016/12/6

 get '/student/course'
 返回实例(课程动态信息)
 返回：
 {
   title: '我的课程',
   lessons: lessons
 }
以上lessons具体为以下json数据:
 {
    "message": "Success",
    "username": "Request username",
    "courses": [
        {
            "coursename": "Course Name",
            "courseid": "Course ID",
            "unreadnotice": Unread Notice Number,
            "newfile": New File Number,
            "unsubmittedoperations": Unsubmitted Operations Number
        }
    ]
}

 get '/student/course/:lesson_id/notices'
 获得 courseid 为 lesson_id 的课程公告
 返回：
 {
    title: '课程公告',
    notices: notices
 }
 其中notices为以下json数据:
 {
    "message": "Success",
    "username": "Request username",
    "notices": [
        {
            "sequencenum": Sequence Number,
            "title": "Title",
            "publisher": "the person publishing the notice",
            "publishtime": "Publish Time",
            "state": "read/unread",
            "content": "Content"
        }
    ]
}
 */

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
    if(!doc){
        res.reply("请先进行绑定");
        return;
    }
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
      //console.log(response.statusCode);
      if(response.statusCode === 200){
        var lessons = JSON.parse(body);
        for(var i = 0; i < lessons.courses.length; i++){
          lessons.courses[i].coursename = lessons.courses[i].coursename.substring(0,lessons.courses[i].coursename.length - 15);
        }
        res.render('student/course', {
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

router.get('/:lesson_id/notices', urlencodedParser, function (req, res, next) {
  //console.log(req.params.lesson_id);
  var lesson_id = req.params.lesson_id;
  var requestData = {
    apikey: "",
    apisecret: ""
  };

  Student.findOne({openid: req.session.openid}, function(err,doc){
    if(err) next(err);
    //console.log(docs);

    var username = doc.studentnumber;
    request({
      method: 'POST',
      url: 'http://se.zhuangty.com:8000/learnhelper/' + username + '/courses/' + lesson_id + '/notices',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }, function (error, response, body) {
      if(response.statusCode === 200) {
        var notices = JSON.parse(body);
        //console.log(notices);
        res.render('student/course', {
          title: '课程公告',
          notices: notices
        });
      }
      else {
        console.log(error);
      }

    });
  });
});

module.exports = router;

