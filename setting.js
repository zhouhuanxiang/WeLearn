var siteDomain = 'http://101.5.208.167';
var token = 'ThisIsAWeChatTokenWhichCanBeARandomString';
var appid = 'wx09a561e87eba34ed';
var appSecret = '3ab9db2f6a5a10f1c30b252faa5fb9c3';

/**
 * token
 * appid
 * appsecret
 * siteDomain 每次都有修改（如果用微信端的，浏览器调试直接用localhost）
 * teacherTextTemplateID      格式--标题：{{msgHead.DATA}} 内容：{{msgBody.DATA}}
 * studentTextTemplateID      格式--标题：{{msgHead.DATA}} 内容：{{msgBody.DATA}}
 * noticeTemplateID           格式--课名：{{course.DATA}} 标题：{{msgHead.DATA}} 内容：{{msgBody.DATA}}
 * 以上3个都是模板消息 id，要在测试号填写模板格式获得 id
 * deadlineInformID           格式-内容：{{msg.DATA}}
 * newDocumentID           格式-内容：{{msg.DATA}}
 * newNoticeID           格式-内容：{{msg.DATA}}
 * newAssignmentID           格式-内容：{{msg.DATA}}
*/
var settings = {
  token: token,
  appid: appid,
  appsecret: appSecret,
  siteDomain: siteDomain,
  noticeTemplateID: '6lQZOtEAQclvHlXRpWXxNoYtwsbjFB0uUGWjEefXoOw',
  teacherTextTemplateID: 'PnH0eplbIqPYfUBvbWNqWntDISa2w4ikBylZicl9X3U',
  studentTextTemplateID: 'PnH0eplbIqPYfUBvbWNqWntDISa2w4ikBylZicl9X3U',
  deadlineInformID: 'M_wnadJiO2lXxy6zGhXQfphDsjTkDbjiiM98Amu8sQs',
  newDocumentID: '4JF7CyK7wwuAvR6qC6vLNXtimHezrQuDIbQok75zVRE',
  newNoticeID: 'dncgMmX7Yk47anzgJlEKdl7WqPW7BlfhRXaiDgiw68Y',
  newAssignmentID: '4FMzeSzSxpOArHk8OrzvLHlJwIKXn3ZgDlKQUtjwYfE',
  yourOpenid: 'oBu1dv0TCi_9UEIHwqY4F0IbfX6E',
  studentOpenid: 'oBu1dv5_0wvgk7U686jTHfs2oTsE',
  teacherOpenid: 'oBu1dv0TCi_9UEIHwqY4F0IbfX6E',
  messageContent: 'msg',
  noticeContent: 'notice'
};

module.exports = settings;

//o3HdVwQhhR9vV2MhK0zS6WruOLmE
//o3HdVwWHa0uJNuNLQ7u_1Tf0VEng