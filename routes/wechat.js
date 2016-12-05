var settings = require('../setting');
var wrapper = require('../wrapper');
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var handler = require('../handler/main_handler');

var config = {
  token: settings.token,
  appid: settings.appid,
  //appsecret: settings.appsecret
};
/*
//验证成功 调用回掉函数
var validate = function(res, callback){
  Student.find({}, function(err,docs) {
    if (err) next(err);
    //console.log(docs);
    if (JSON.stringify(docs) === '[]') {//未绑定
      res.reply('请先进行绑定');
    }
    else{
      callback(docs);
    }
  });
};
*/
router.use('/', wechat(config, function (req, res, next) {
/*
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
  else if(message.Content === 'unbind'){
    validate(res, function(docs){
      var requestData = {
        apiKey: "",
        apisecret: ""
      };

      var username = docs[0].studentnumber;
      request({
        method: 'POST',
        url: 'http://se.zhuangty.com:8000/users/' + username + '/cancel',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      }, function (error, response, body) {
        if(response.statusCode === 200) {
          res.reply('解绑成功');
          Student.remove({},function(err,docs){
            console.log('remove success');
          });
        }
        else{
          res.reply("解绑失败");
        }

      });
    });

  }
  else if (message.Content === 'lessons'){
      validate(res, function (docs) {
        res.reply([
          {
            title: '我的课程',
            description: '点击即可查看所有课程',
            url: wrapper.urlLessonInfo()
          }
        ]) ;
      });

  }
  else if(message.Content === 'schedule'){
    validate(res, function(docs){
      res.reply([
        {
          title: '我的课表',
          description: '点击即可查看我的课表',
          url: wrapper.urlScheduleInfo()
        }
      ]) ;
    });
  }
  else if(message.Content === 'library seats'){
    validate(res, function(docs){
      res.reply([
        {
          title:'文图找座',
          description: '点击即可查看座位详情',
          url:wrapper.urlLibrarySeatInfo()
        }
      ]);
    });
  }
  else {
    res.reply("抱歉，没有你想要的信息:(");
  }
*/
  handler(req, res);
}));

module.exports = router;
