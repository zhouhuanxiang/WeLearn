var wrapper = require('../wrapper');

exports.checkListSchedule = function (msg) {
    if (msg.Content === 'schedule')
        return true;
};

exports.handleListSchedule = function (req, res) {
    res.reply([
        {
            title: '我的课表',
            description: '点击即可查看我的课表',
            url: wrapper.urlScheduleInfo() + '?openid=' + req.weixin.FromUserName
        }
    ])
};