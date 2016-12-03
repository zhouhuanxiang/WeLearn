var settings = require('../setting');
var wrapper = require('../wrapper');
var express = require('express');
var router = express.Router();
var wechat = require('wechat');


var config = {
  token: settings.token,
  appid: settings.appid,
  //appsecret: settings.appsecret
};


router.use('/', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  if (message.Content === 'bind'){
    res.reply([
      {
        title: '登录',
        description: '点击即可进入学生、老师（助教）登录界面',
        url: wrapper.urlStudentLogin()
      }
    ])
  }
  else if (message.Content === 'lesson'){
    res.reply([
      {
        title: '课程信息',
        description: '点击即可查看课程信息',
        url: wrapper.urlLessonInfo()
      }
    ])
  }
  else {
    res.reply("抱歉，没有你想要的信息:(");
  }
}));

module.exports = router;
