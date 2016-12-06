var wrapper = require('../wrapper');
var Student = require('../Models/Student');

exports.checkListLesson = function (msg) {
  if (msg.Content === 'lesson')
    return true;
};

exports.handleListLesson = function (req, res) {
  Student.findOne({openid: req.weixin.FromUserName}, function(err,doc){
    if(!doc){
      res.reply("请先进行绑定");
      return;
    }
    else{
      res.reply([
        {
          title: '课程信息',
          description: '点击即可查看课程信息',
          url: wrapper.urlLessonInfo() + '?openid=' + req.weixin.FromUserName
        }
      ]);
    }
  });
};