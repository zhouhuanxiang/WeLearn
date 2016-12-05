var WechatAPI = require('wechat-api');
var wrapper = require('../wrapper');
var setting  =require('../setting');

var textMessage = function (openid, text) {
  var api = new WechatAPI(setting.appid, setting.appsecret);
  console.log(openid);
  console.log('~~~~~');
  console.log(text);
  api.sendTemplate(openid,
    setting.textTemplateID,
    wrapper.urlTeacherMessage() + '?openid=' + openid,
    {'text':{'value': text, 'color': '#771523'}},
    function (err) {
      if (err){
        console.log(err);
      }
    });
};

module.exports = textMessage;