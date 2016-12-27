var WechatAPI = require('wechat-api');
var wrapper = require('../wrapper');
var setting  =require('../setting');

var textMessage = function (openid, message) {
  var url;
  var api = new WechatAPI(setting.appid, setting.appsecret);
  var msgData = {
    'msgHead':{
      'value': message.msgHead,
      color: '#771523'
    },
    'msgBody':{
      'value': message.msgBody,
      color: '#771523'
    }
  };
  if (message.toTeacher){
    url = wrapper.urlTeacherMessage()+'/'+message.course+'/'+message.student+'?openid='+openid;
    api.sendTemplate(openid, setting.teacherTextTemplateID, url, msgData, function (err) {
      if (err){
        console.log(err);
      }
    });
  }else{
    url = wrapper.urlStudentMessage()+'/msg_list/'+message.course+'?openid='+openid;
    api.sendTemplate(openid, setting.studentTextTemplateID, url, msgData, function (err) {
      if (err){
        console.log(err);
      }
    });
  }
};

module.exports = textMessage;