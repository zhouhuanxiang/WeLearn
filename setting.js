var path = require('path');
var siteDomain = 'http://59.66.138.44';
var token = 'RYhopG1zq6oan1toNtiHfcq96KHinZ90gpuKt8pEx3mEQPmz7T';
var appid = 'wxf0cb75c245008b64';
var appSecret = '91e15fb902a7081ca1a2002b1fe71da9';

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