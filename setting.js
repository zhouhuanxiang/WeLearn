var path = require('path');
var siteDomain = 'http://59.66.138.50';
var token = 'ThisIsAWeChatTokenWhichCanBeARandomString';
var appid = 'wx8d7a006090c3ae66';
var appSecret = '85b8c974f08b5e62e38a8d8beec962bf';

/**
 * token
 * appid
 * appsecret
 * siteDomain 每次都有修改（如果用微信端的，浏览器调试直接用localhost）
 * teacherTextTemplateID      格式--标题：{{msgHead.DATA}} 内容：{{msgBody.DATA}}
 * studentTextTemplateID      格式--标题：{{msgHead.DATA}} 内容：{{msgBody.DATA}}
 * noticeTemplateID           格式--课名：{{course.DATA}} 标题：{{msgHead.DATA}} 内容：{{msgBody.DATA}}
 * 以上3个都是模板消息 id，要在测试号填写模板格式获得 id
*/
var settings = {
  token: token,
  appid: appid,
  appsecret: appSecret,
  siteDomain: siteDomain,
  noticeTemplateID: 'QHaABmPXr8d0_XXH6IYhnOSw6S_YzrWz3nLNRKp13u4',
  teacherTextTemplateID: 'VFaqOQ65bMz5_pNoZOz-4zEjeGfHn1nSD9kw1yuvP8w',
  studentTextTemplateID: 'k75GY_pOzjTWVkJtCPnS6fotrcDb3LHRApKKXgu4PXg'
};

module.exports = settings;