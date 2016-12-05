var WechatAPI = require('wechat-api');
var wrapper = require('../wrapper');
var setting  =require('../setting');

var textMessage = function (openid, msgHead, msgBody) {
  var api = new WechatAPI(setting.appid, setting.appsecret);
  var url = wrapper.urlTeacherMessage()+'?openid='+openid;
  var msgData = {
    'msgHead':{
      'value': msgHead,
      color: '#771523'
    },
    'msgBody':{
      'value': msgBody,
      color: '#771523'
    }
  };
  api.sendTemplate(openid, setting.textTemplateID, url, msgData, function (err) {
    if (err){
      console.log(err);
    }
  });
};

module.exports = textMessage;