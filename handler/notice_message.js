var WechatAPI = require('wechat-api');
var wrapper = require('../wrapper');
var setting  =require('../setting');
var Course = require('../Models/Course');

var noticeMessage = function (notice, noticeid) {
  var url;
  var api = new WechatAPI(setting.appid, setting.appsecret);
  var msgData = {
    'course':{
      'value': notice.course,
      color: '#771523'
    },
    'msgHead':{
      'value': notice.msgHead,
      color: '#771523'
    },
    'msgBody':{
      'value': notice.msgBody,
      color: '#771523'
    }
  };
  Course.findOne({coursename: notice.course}, function (err, course) {
    var students = course.student;
    for (var i = 0; i < students.length; ++i){
      (function () {
        var openid = students[i].openid;
        console.log(openid);
        url = wrapper.urlStudentNotice()+'/'+noticeid+'?openid='+openid;
        api.sendTemplate(openid, setting.noticeTemplateID, url, msgData, function (err) {
          if (err){
            console.log(err);
          }
        });
        console.log(msgData);
      })(i);
    }
  });
};

module.exports = noticeMessage;