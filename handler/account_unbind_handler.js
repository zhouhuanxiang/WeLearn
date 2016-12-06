var wrapper = require('../wrapper');
var unbind = require('../routes/student/unbind')

exports.checkUnbindAccount = function (msg) {
    if (msg.Content === 'unbind')
        return true;
};

exports.handleUnbindAccount = function (req, res) {
    var openid = req.weixin.FromUserName;
    unbind.unbind(openid, res.reply);
};
