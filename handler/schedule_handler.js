
var wrapper = require('../wrapper');
var checker = require("./checkRequest");
//var basicInfo = require("../weixin_basic/settings.js");
var menutmp=require("./menu_template");


exports.checkSchedule= function (msg) {

    if (checker.checkMenuClick(msg)==menutmp.WEIXIN_EVENT_KEYS['course_schedule'])
        return true;
    console.log("schedule checker")
    console.log(checker.checkMenuClick(msg))
    console.log("envent key is ")
    console.log(menutmp.WEIXIN_EVENT_KEYS['course_schedule'])
    return false;
};

exports.handleSchedule= function (msg, res) {
    /*
     your implementation




     */
    res.reply("课程表")
};
