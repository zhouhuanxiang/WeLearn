var siteDomain = 'http://101.5.210.250';
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
  teacherTextTemplateID: 'AMx-DhYdngumTKUMRwgEPu6XG_F-YPgt6eTR3knWfUU',
  studentTextTemplateID: 'WLYiKCaSFMaet3vLJiQsjg430SUQkGjcEx04nOmEwyM',
  teacherMessageID: 'R_c_YYACNNO5P9ccoQg-FTt4jz9mUUfyQdcRWhDsC1c',
  studentMessageID: 'oZrLU__lg568RKc3txLK0Z8Fxv2ZKTKrerg5DYNXxic',
  yourOpenid: 'oVP35wC1bsdlsEmcBPVzbe5FkdrI',
  studentOpenid: 'oVP35wC1bsdlsEmcBPVzbe5FkdrI',
  teacherOpenid: 'oVP35wBPxW4z4nFlnsAsIw_NwaQA',

  messageContent: 'msg',
  noticeContent: 'notice'
};

module.exports = settings;

//o3HdVwQhhR9vV2MhK0zS6WruOLmE
//o3HdVwWHa0uJNuNLQ7u_1Tf0VEng