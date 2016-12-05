var wrapper = require('../wrapper');


exports.checkBindAccount = function (msg) {
  if (msg.Content === 'bind')
    return true;
};

exports.handleBindAccount = function (msg, res) {
  res.reply([
    {
      title: '登录',
      description: '点击即可进入学生、老师（助教）登录界面',
      url: wrapper.urlStudentLogin() + '?openid=' + msg.FromUserName
    }
  ])
};
