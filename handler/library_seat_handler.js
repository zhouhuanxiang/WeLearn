var wrapper = require('../wrapper');
var Student = require('../Models/Student');

exports.checkListLibrarySeat = function (msg) {
    if (msg.Content === 'library seat')
        return true;
};

exports.handleListLibrarySeat = function (req, res) {
    Student.findOne({openid: req.weixin.FromUserName}, function(err,doc) {
        if (!doc) {
            res.reply("请先进行绑定");
            return;
        }
        else {
            res.reply([
                {
                    title: '文图找座',
                    description: '点击即可查看座位详情',
                    url: wrapper.urlLibrarySeatInfo() + '?openid=' + req.weixin.FromUserName
                }
            ])
        }
    });
};