
var wrapper = require('../wrapper');
var checker = require("./checkRequest");
var menutmp=require("./menu_template");


exports.checkConversation = function (msg) {
    /*if (msg.Content === '私信')
        return true;*/
    if (checker.checkMenuClick(msg)==menutmp.WEIXIN_EVENT_KEYS['private_conversation'])
        return true;

    return false;
};

exports.handleConversation = function (msg, res) {
    /*
    your implementation




     */
    res.reply("私信")
};