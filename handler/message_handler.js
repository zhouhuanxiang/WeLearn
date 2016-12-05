var wrapper = require('../wrapper');
var utf8 = require('utf8');
var Student = require('../Models/Student');

exports.checkSendMessage = function (msg) {
  if (msg.Content === 'msg')
    return true;
};

exports.handleSendMessage = function (req, res) {
  Student.findOne({openid: utf8.encode(req.weixin.FromUserName)}, function (err, student) {
    if (err){
      console.log(err);
      return;
    }
    if (student.position !== 'teacher'){
      res.reply([
        {
          title: '发消息给老师',
          description: '点击即可选择课程，并发送消息给老师',
          url: wrapper.urlStudentMessage() + '?openid=' + req.weixin.FromUserName
        }
      ]);
    }else{
      res.reply([
        {
          title: '查看消息记录',
          description: '点击即可查看来自学生的消息',
          url: wrapper.urlTeacherMessage() + '?openid=' + req.weixin.FromUserName
        }
      ]);
    }
  });
};