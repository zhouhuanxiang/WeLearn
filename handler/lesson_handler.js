var wrapper = require('../wrapper');
var checker = require("./checkRequest");
//var basicInfo = require("../weixin_basic/settings.js");
var menutmp=require("./menu_template");


exports.checkListLesson = function (msg) {
  if (msg.Content === 'lesson')
    return true;
  if (checker.checkMenuClick(msg)==menutmp.WEIXIN_EVENT_KEYS['course_info'])
    return true;
 /* console.log("***********************************************8what the hell");
  console.log("the return key is "+checker.checkMenuClick(msg));
  console.log("the eventkey is "+tmp.WEIXIN_EVENT_KEYS['courseinfo']);
  if(checker.checkMenuClick(msg)===tmp.WEIXIN_EVENT_KEYS['courseinfo'])
  {
      console.log("***************equal!!!!!!!!!")
  }

  else
  {
    console.log("$$$$$$$$$$$$$$$$$$$$$oh no not equal")

  }*/

  return false;
};
/*exports.check_bind_accout=function(msg)
{
    if (msg.MsgType[0]==="text")
        if (msg.Content[0]==="绑定")
            return true;
    if (checker.checkMenuClick(msg)===tmp.WEIXIN_EVENT_KEYS['account_bind'])
        return true;
    return false;
}*/
exports.handleListLesson = function (msg, res) {
  res.reply([
    {
      title: '课程信息',
      description: '点击即可查看课程信息',
      url: wrapper.urlLessonInfo() + '?openid=' + msg.FromUserName
    }
  ])
};