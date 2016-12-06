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

 get '/student/course/:lesson_id/documents'
 获得 courseid 为 lesson_id 的课程文件
 返回：
 {
    title: '课程文件',
    documents: documents
 }
 其中documents为以下json数据:
 {
    "message": "Success",
    "username": "Request username",
    "documents": [
        {
            "sequencenum": Sequence Number,
            "title": "Title",
            "explanation": "Brief explanation",
            "updatingtime": "Updating Time",
            "state": "new/previous",
            "size": "Size of file",
            "url": "File url"
        }
    ]
}

 get '/student/course/:lesson_id/homeworks'
 获得 courseid 为 lesson_id 的课程作业
 返回：
 {
    title: '课程作业',
    assignments: assignments
 }
 其中assignments为以下json数据:
 {
    "message": "Success",
    "username": "Request username",
    "assignments": [
        {
            "sequencenum": Sequence Number,
            "title": "Title",
            "detail": "Detail of the assignment",
            "startdate": "Start date",
            "duedate": "Due Time",
            "scored": true/false
            "evaluatingteacher": "Evaluating teacher",
            "evaluatingdate": "Evaluating date",
            "comment": "Comment of teacher",
            "grade": Grade of the homework
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
      console.log(response.statusCode);
      if(response.statusCode === 200){
        var lessons = JSON.parse(body);
        //console.log(lessons);
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
        res.json({
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

router.get('/:lesson_id/documents', urlencodedParser, function (req, res, next) {
  var lesson_id = req.params.lesson_id;
  //console.log(lesson_id);
  var requestData = {
    apikey: "",
    apisecret: ""
  };

  Student.findOne({openid: req.session.openid}, function(err,doc){
    if(err) next(err);
    //console.log(docs);

    var username = doc.studentnumber;
    console.log(username);
    request({
      method: 'POST',
      url: 'http://se.zhuangty.com:8000/learnhelper/' + username + '/courses/' + lesson_id + '/documents',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }, function (error, response, body) {
      //console.log(body);
      //console.log(response.statusCode);
      if(response.statusCode === 200) {
        var documents = JSON.parse(body);
        //console.log(documents);
        res.json({
          title: '课程文件',
          documents: documents
        });
      }
      else {
        console.log(error);
      }

    });
  });
});

router.get('/:lesson_id/homeworks', urlencodedParser, function (req, res, next) {
  //console.log(req.baseUrl);
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
      url: 'http://se.zhuangty.com:8000/learnhelper/' + username + '/courses/' + lesson_id + '/assignments',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }, function (error, response, body) {
      if(response.statusCode === 200) {
        var assignments = JSON.parse(body);
        //console.log(assignments);

        res.json({
          title: '课程作业',
          assignments: assignments
        });
      }
      else {
        console.log('error response.');
      }

    });
  });
});


module.exports = router;

