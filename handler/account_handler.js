var wrapper = require('../wrapper');
var Student = require('../Models/Student');
var Message = require('../Models/Message');
var Course = require('../Models/Course');
var utf8 = require('utf8');
var request = require('request');
var checker = require("./checkRequest");
//var basicInfo = require("../weixin_basic/settings.js");
var menutmp=require("./menu_template");

exports.checkBindAccount = function (msg) {
  if (msg.Content === 'bind' || checker.checkMenuClick(msg)==menutmp.WEIXIN_EVENT_KEYS['account_bind'])
    return true;
};

exports.handleBindAccount = function (req, res) {
  Student.findOne({openid: utf8.encode(req.weixin.FromUserName)}, function (err, student) {
    if (student){
      res.reply('已经绑定');
    }
  });
  res.reply([
    {
      title: '登录',
      description: '点击即可进入学生、老师（助教）登录界面',
      url: wrapper.urlStudentLogin() + '?openid=' + req.weixin.FromUserName
    }
  ]);
};

exports.checkUnbindAccount = function (msg) {
  if (msg.Content === 'unbind' || checker.checkMenuClick(msg)==menutmp.WEIXIN_EVENT_KEYS['account_unbind'])
    return true;
};

exports.handleUnBindAccount = function (req, res) {
  Student.findOne({openid: utf8.encode(req.weixin.FromUserName)}, function (err, student) {
    if (err){
      res.reply('出了一些问题:(');
      return;
    }
    if (student === null){
      res.reply('本微信号未绑定:(');
      return;
    }
    res.reply('已经解除绑定');
    var courses = student.course;
    var openid = student.openid;
    var studentnumber = student.studentnumber;
    console.log(openid);
    request({
      method: 'POST',
      url: 'http://se.zhuangty.com:8000/students/'+studentnumber+'/cancel',
      headers: {'Content-Type': 'application/json'},
      body: "{  \"apikey\": \"API Key\",  \"apisecret\": \"API Secret Key\"}"
    }, function () {
      student.remove(function () {
        for(var i = 0; i < courses.length; i++) {
          (function (i) {
            Course.findOne({coursename: courses[i]}, function (err, course) {
              var j;
              for(j=0; j<course.teacher.length; j++) {
                if(course.teacher[j].openid === openid) {
                  course.teacher.splice(j, 1);
                  course.save();
                  return;
                }
              }
              for(j=0; j<course.student.length; j++) {
                if(course.student[j].openid === openid) {
                  course.student.splice(j, 1);
                  course.save();
                  return;
                }
              }
            })
          })(i);
        }
      })
    });
  });
};
