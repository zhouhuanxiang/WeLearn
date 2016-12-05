var wrapper = require('../wrapper');

exports.checkListLesson = function (msg) {
  if (msg.Content === 'lesson')
    return true;
};

exports.handleListLesson = function (req, res) {
  res.reply([
    {
      title: '课程信息',
      description: '点击即可查看课程信息',
      url: wrapper.urlLessonInfo() + '?openid=' + req.weixin.FromUserName
    }
  ])
};