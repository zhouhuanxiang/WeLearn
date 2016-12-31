var WechatAPI = require('wechat-api');
var wrapper = require('../wrapper');
var setting  =require('../setting');
var Student = require('../Models/Student');
var Course = require('../Models/Course');
var oauth = require('./oauth_handler');

var Stl = new Object(); 

function checkTime(time1, time2){
  var tm = time2 - time1;
  if(tm > 1200000 || tm < -1200000){//10分钟
    return true;
  }else{
    return false;
  }
}

var textMessage = function (openid, message) {
  var url;
  var api = new WechatAPI(setting.appid, setting.appsecret);
  var msgData = {
    'msgHead':{
      'value': message.msgHead,
      color: '#771523'
    },
    'course':{
      'value': message.course,
      color: '#771523'
    }
  };
  var now = new Date();
  if (message.toTeacher){
    Course.findOne({coursename: message.course}, function (err, doc){
      var teacher = doc.teacher;
      for(var i = 0; i < teacher.length; i++){
        if(!Stl.hasOwnProperty(teacher[i].openid))
          Stl[teacher[i].openid] = 1;
        var t = checkTime(Stl[teacher[i].openid], now.getTime());
        if (t){
          url = wrapper.urlTeacherMessage() + '?course=' + message.course + '&studentid=' + message.student + '&openid=' + teacher[i].openid;
          api.sendTemplate(teacher[i].openid, setting.teacherTextTemplateID, oauth.getAuthorizeURL(url), msgData, function (err) {
            if (err){

            }
          });
          Stl[teacher[i].openid] = now.getTime();
        }
      }
    });
    
  }else{
    if(!Stl.hasOwnProperty(message.student))
          Stl[message.student] = 1;
    var tt = checkTime(Stl[message.student], now.getTime());
    if (tt){
      url = wrapper.urlMessage() + '?openid=' + message.student + '&course=' + message.course;
      api.sendTemplate(openid, setting.studentTextTemplateID, oauth.getAuthorizeURL(url), msgData, function (err) {
        if (err){

        }
      });
      Stl[message.student] = now.getTime();
    }
  }
};

module.exports = textMessage;