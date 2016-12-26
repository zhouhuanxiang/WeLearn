var wrapper = require('../wrapper');
var utf8 = require('utf8');
var checker = require("./checkRequest");
var Student = require('../Models/Student');
var menutmp=require("./menu_template");

exports.checkSendMessage = function (msg) {
  if (msg.Content === 'msg' || checker.checkMenuClick(msg)==menutmp.WEIXIN_EVENT_KEYS['private_conversation'])
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

exports.checkSendNotice = function (msg) {
  if (msg.Content === 'notice')
    return true;
};

exports.handleSendNotice = function (req, res) {
  Student.findOne({openid: utf8.encode(req.weixin.FromUserName)}, function (err, student) {
    if (student.position !== 'teacher'){
      res.reply('没有该权限:(');
      return;
    }
    res.reply([
      {
        title: '发送图文公告',
        description: '点击即可发送图文消息给学生',
        url: wrapper.urlTeacherNotice() + '?openid=' + req.weixin.FromUserName
      }
    ]);
  });
};