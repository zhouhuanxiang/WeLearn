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
    ////////////////////if (Student.)
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