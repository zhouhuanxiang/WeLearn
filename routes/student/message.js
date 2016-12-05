var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Student = require('../../Models/Student');
var Course = require('../../Models/Course');
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
      title: '私信老师',
      courses: courses
    })
  });
});

router.post('/', urlencodedParser, function (req, res, next) {
  Course.findOne({coursename: req.body.courseName}, function (err, course) {
    if (err){
      next(err);
      return;
    }
    Student.findOne({openid: req.session.openid}, function (err, student) {
      if (err){
        next(err);
        return;
      }
      course.message.push({
        toTeacher: true,
        student: student.realname,
        msgHead: req.body.msgHead,
        msgBody: req.body.msgBody
      });
      course.save();
      Student.findOne({realname: course.teacher[0].name}, function (err, teacher) {
        if (err){
          next(err);
          return;
        }
        textMessage(teacher.openid, req.body.msgHead, req.body.msgBody);
        res.redirect('/student/message');
      })
    })
  });
});

module.exports = router;