var wrapper = require('../wrapper');
var Student = require('../Models/Student');
var Message = require('../Models/Message');
var Course = require('../Models/Course');
var utf8 = require('utf8');
var request = require('request');
var checker = require("./checkRequest");
//var basicInfo = require("../weixin_basic/settings.js");
var menutmp=require("./menu_control");

exports.checkBindAccount = function (msg) {
  if (msg.Content === 'bind' || checker.checkMenuClick(msg)==menutmp.WEIXIN_EVENT_KEYS['account_bind'])
    return true;
};

exports.handleBindAccount = function (req, res) {
  Student.findOne({openid: utf8.encode(req.weixin.FromUserName)}, function (err, student) {
    if (student){
      res.reply('已经绑定');
    }else{
      res.reply([
        {
          title: '登录',
          description: '点击即可进入学生、老师（助教）登录界面',
          url: wrapper.urlStudentLogin()
        }
      ]);
    }
  });
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

var deadlineInform = function(studentnumber, courseid, coursename, requestData, timestamp, deadline_have_informed){
    var notice = {};
    request({
        method: 'POST',
        url: 'http://se.zhuangty.com:8000/learnhelper/' + studentnumber + '/courses/' + courseid + '/assignments',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestData)
    }, function (error, response, body) {
        if (response.statusCode === 200) {
            var assignments = JSON.parse(body);
            for(var num = 0; num < assignments.assignments.length; num++){
                if((assignments.assignments)[num].state === "尚未提交"){
                    var interv = (parseInt((assignments.assignments)[num].duedate) - parseInt(timestamp)) / 1000 / 60 / 60 / 24;
                    var len = deadline_have_informed.length;
                    if(len === 0){
                        if(parseInt(interv) <= 1){
                            deadline_have_informed.push({assid: (assignments.assignments)[num].assignmentid, date: (assignments.assignments)[num].duedate});
                            notice['course'] = "" + coursename;
                            notice['msgHead'] = "deadline 提醒";
                            notice['msgBody'] = "SOS! 作业: " + (assignments.assignments)[num].title + "dealine只剩下1天左右";
                            noticeMessage(notice, (assignments.assignments)[num].assignmentid);
                        }
                    }
                    else{
                        for(i = 0; i < len; i++){
                            if(deadline_have_informed[i].assid === (assignments.assignments)[num].assignmentid){
                                break;
                            }
                            if(i === len - 1){
                                if(parseInt(interv) <= 1){
                                    deadline_have_informed.push({assid: (assignments.assignments)[num].assignmentid, date: (assignments.assignments)[num].duedate});
                                    notice['course'] = "" + coursename;
                                    notice['msgHead'] = "deadline 提醒";
                                    notice['msgBody'] = "SOS! 作业: " + (assignments.assignments)[num].title + "dealine只剩下1天左右";
                                    noticeMessage(notice, (assignments.assignments)[num].assignmentid);
                                }
                            }
                        }
                    }

                }
            }

        }
    });
}