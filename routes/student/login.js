/**
 * 用例说明
 * by 周焕祥
 * 2016/12/6
 *
 * get '/student/login'
 *   若没有登录
 *   返回
 *   {
 *      status: 'login'
 *   }
 *   若已经登录(重复登录)
 *   {
 *      status: 'loginTwice'
 *   }
 *
 * post '/student/login'
 *   输入的表单
 *   {
 *      username,
 *      password
 *   }
 *   验证成功，返回
 *   {
 *      status: 'success'
 *   }
 *   验证失败，返回
 *   {
 *      status: 'failed'
 *   }
 *
 */

var wrapper = require('../../wrapper');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var utf8 = require('utf8');
var router = express.Router();
var Student = require('../../Models/Student');
var Course = require('../../Models/Course');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function (req, res, next) {
  Student.findOne({openid: req.session.openid}, function (err, doc) {
    if (err){
      next(err);
      return;
    }
    if (doc){
      res.render('student/login', {
        status: 'loginTwice'
      });
    }
    else{
      res.render('student/login', {
        status: 'login'
      });
    }
  });
});

function updateCourseDb(student) {
  var requestData = { apiKey: "", apisecret: ""};
  request({
    method: 'POST',
    url: 'http://se.zhuangty.com:8000/learnhelper/'+ student.studentnumber +'/courses',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestData)
  }, function (error, response, body) {
    var courses = JSON.parse(body).courses;
    var courseNames = [];
    for (var i = 0; i < courses.length; i++){
      courseNames.push(courses[i].coursename);
      (function (i) {
        Course.findOne({courseid: courses[i].courseid}, function (err, doc) {
          if (err) console.log(err);
          if (doc){
            if (student.position === 'teacher'){
              doc.teacher.push({name: student.realname, userid: student.openid});
              doc.save();
            }else{
              doc.student.push({name: student.realname, userid: student.openid});
              doc.save();
            }
          }else{
            var course = {
              courseid: courses[i].courseid, coursename: courses[i].coursename, teacher: [], student: [], message: []
            };
            if (student.position === 'teacher'){
              course.teacher.push({name: student.realname, userid: student.openid});
            }else{
              course.student.push({name: student.realname, userid: student.openid});
            }
            var courseObj = new Course(course);
            courseObj.save();
          }
        })
      })(i);
    }
    Student.findOne({openid: student.openid}, function (err, student) {
      if (err){
        console.log(err);
        return;
      }
      student.course = courseNames;
      student.save();
    })
  });
}

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
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestData)
  }, function (err, response, body) {
    if (err){
      next(err);
      return;
    }
    if (response.statusCode === 200){
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
        res.json({
          status: 'success'
        });
      });
    } else{
      res.json({
        status: 'failed'
      });
    }
  });
});

module.exports = router;