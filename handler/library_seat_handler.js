var wrapper = require('../wrapper');

exports.checkListLibrarySeat = function (msg) {
    if (msg.Content === 'library seat')
        return true;
};

exports.handleListLibrarySeat = function (req, res) {
    res.reply([
        {
            title: '文图找座',
            description: '点击即可查看座位详情',
            url: wrapper.urlLibrarySeatInfo() + '?openid=' + req.weixin.FromUserName
        }
    ])
};