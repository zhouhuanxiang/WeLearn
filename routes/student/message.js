/**
接口说明
 by 周焕祥
 2016/12/6

get '/student/message'
返回实例(课程列表)
  返回：
  {
    status: 'courses'，
    courses: [{name: '软工3'， courseid: '123456'}]    //课程数组
  }

post '/student/message'
发送消息
  表单输入：
  {
    courseid,   //课程 id
    msgHead,    //消息标题
    msgBody     //消息内容
  }
  返回：
  {
    status: 'msgSend'
  }

get '/student/message/123456'
获得 courseid 为 123456 的课程里该用户与老师的所有谈话记录
  返回：
  {
    status: 'messages',
    messages: [{  _id: 5846299d02145b150c349fe0,
                  toTeacher: true,
                  student: 'o3HdVwWHa0uJNuNLQ7u_1Tf0VEng',
                  course: '136947',
                  msgHead: '234',
                  msgBody: '1234',
                  __v: 0,
                  date: 2016-12-06T02:59:41.279Z }]
  }
*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Student = require('../../Models/Student');
var Course = require('../../Models/Course');
var Message = require('../../Models/Message');
var textMessage = require('../../handler/text_message');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var wechat = require('wechat');

router.get('/', function (req, res, next) {
  Student.findOne({openid: req.session.openid}, function (err, doc) {
    if (err){
      next(err);
      return;
    }
    var courses = doc? (doc.course) : [];
    res.render('student/message', {
      courses: courses,
      status: 'courses'
    })
  });
});

router.post('/', urlencodedParser, function (req, res, next) {
  var message = {
    toTeacher: true,
    student: req.session.openid,
    course: req.body.courseid,
    msgHead: req.body.msgHead,
    msgBody: req.body.msgBody
  };
  var messageObj = new Message(message);
  messageObj.save(function (err, doc) {
    if (err){
      next(err);
      return;
    }
    textMessage(true, 'o3HdVwQhhR9vV2MhK0zS6WruOLmE', message);
    res.json({
      status: 'msgSend'
    });
  });
});

router.get('/:courseid', urlencodedParser, function (req, res, next) {
  Message.find({student: req.session.openid,  course: req.params.courseid}, function (err, messages) {
    if (err){
      next(err);
      return;
    }
    res.json({
      messages: messages,
      status: 'messages'
    });
  });
});

module.exports = router;
