var accountHandler = require('./account_handler');
var lessonHandler = require('./lesson_handler');
var conversationHandler=require('./conversation_handler');
var scheduleHandler=require('./schedule_handler')
var checkEmpty = function (msg) {
  return true;
};

var handleEmpty = function (msg, res) {
  res.reply("抱歉，没有你想要的信息:(这只是一个测试了呵呵哈哈哈");
};

var pattern = [
  [accountHandler.checkBindAccount,           accountHandler.handleBindAccount],
  [lessonHandler.checkListLesson,             lessonHandler.handleListLesson],
  [conversationHandler.checkConversation,     conversationHandler.handleConversation],
  [scheduleHandler.checkSchedule,            scheduleHandler.handleSchedule],
  [checkEmpty,                                handleEmpty]
];

module.exports = function (req, res){
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  for(var i = 0; i < pattern.length; ++i){
    if (pattern[i][0](message)){
      pattern[i][1](message, res);
      return;
    }
  }
};

var t=require("./menu_control");
var at = require('./access_token');
at.getAccessToken(t.create_menu)