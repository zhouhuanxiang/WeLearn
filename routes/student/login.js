var wrapper = require('../../wrapper');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var utf8 = require('utf8');
var router = express.Router();
var Student = require('../../Models/Student');
<<<<<<< HEAD
=======
var Course = require('../../Models/Course');
>>>>>>> origin/master
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function (req, res, next) {
  Student.findOne({openid: req.session.openid}, function (err, doc) {
    if (err){
      next(err);
      return;
    }
    if (doc && doc.studentnumber){
      res.render('student/login', {
        title: '已绑定',
        condition: 'loginTwice'
      });
    }
    else{
      res.render('student/login', {
        title: '学生登录界面',
        condition: 'login'
      });
    }
  });
});

function updateCourseDb(student) {
  var requestData = {
    apiKey: "",
    apisecret: ""
  };
  request({
    method: 'POST',
    url: 'http://se.zhuangty.com:8000/learnhelper/'+ student.studentnumber +'/courses',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestData)
  }, function (error, response, body) {
    var courses = JSON.parse(body).courses;
    for (var i = 0; i < courses.length; i++){
      (function (i) {
        Course.findOne({courseid: courses[i].courseid}, function (err, doc) {
          if (err) console.log(err);
          if (doc){
            if (student.position === 'teacher'){
              doc.teacher.push(student.realname);
              doc.save();
            }else{
              doc.student.push(student.realname);
              doc.save();
            }
          }else{
            var course = {
              courseid: courses[i].courseid,
              coursename: courses[i].coursename,
              teacher: [],
              student: [],
              message: []
            };
            if (student.position === 'teacher'){
              course.teacher.push(student.realname);
            }else{
              course.student.push(student.realname);
            }
            var courseObj = new Course(course);
            courseObj.save();
          }
        })
      })(i);
    }
  });
}

router.post('/', urlencodedParser, function (req, res, next) {
  var requestData = {
    apikey: "",
    apisecret: "",
    username: utf8.encode(req.body.studentId),
    password: utf8.encode(req.body.password)
  };
  request({
    method: 'POST',
    url: 'http://se.zhuangty.com:8000/users/register',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestData)
  }, function (err, response, body) {
    if (err){
      next(err);
      return;
    }
    if (response.statusCode === 200){
<<<<<<< HEAD
      body = JSON.parse(body);
      Student.findOne({studentnumber: body.information.studentnumber}, function (err, doc) {
        if (err) next(err);
        //console.log(body.information.studentnumber);
        //console.log(doc);
        if (doc === null) {
          var student = {
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

=======
      var jsonBody = JSON.parse(body);
      var student = {
        openid: req.session.openid,
        studentnumber: jsonBody.information.studentnumber,
        realname: jsonBody.information.realname,
        position: jsonBody.information.position,
        department: jsonBody.information.department,
        email: jsonBody.information.email,
        course: []
      };
      //TODO
      if (student.openid === 'o3HdVwWHa0uJNuNLQ7u_1Tf0VEng')
        student.position = 'teacher';
      //
      var studentObj = new Student(student);
      studentObj.save(function (err) {
        if (err){
          next(err);
          return;
        }
        updateCourseDb(student);
        res.render('student/login', {
          title: '绑定成功',
          condition: 'loginSuccess'
        });
>>>>>>> origin/master
      });
    } else{
      res.render('student/login', {
        title: '学生登录界面',
        condition: 'loginFail'
      });
    }
  });
});

module.exports = router;