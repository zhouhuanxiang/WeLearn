var wrapper = require('../wrapper');
var Student = require('../Models/Student');
var checker = require("./checkRequest");
var menutmp = require("./menu_template");
var getDay = require('../routes/student/getTotalDay');
var sd = require('silly-datetime');
var request = require('request');

var startTime = getDay.getTotalDay(2016, 9, 12);

exports.checkListSchedule = function (msg) {
    if(msg.Content === 'schedule' || checker.checkMenuClick(msg)==menutmp.WEIXIN_EVENT_KEYS['course_schedule'])
        return true;
    return false;
};

exports.handleListSchedule = function (req, res) {
    Student.findOne({openid: req.weixin.FromUserName}, function(err,doc) {
        if (!doc) {
            res.reply("请先进行绑定");
        }
        else {
            var time = sd.format(new Date(), 'YYYY-MM-DD');
            time = time.split(/-/);
            var totalTime = 0;
            var year = parseInt(time[0]);
            for(var i = 0; i < year - 2016; i++){
                totalTime += getDay.getTotalDay(2016 + i, 12, 31);
            }
            totalTime += getDay.getTotalDay(year, parseInt(time[1]), parseInt(time[2]));
            var week = (parseInt((totalTime - startTime) / 7 + 1));
            var day = ((totalTime - startTime) % 7 + 1);
            //console.log(week);
            //console.log(day);

            var requestData = {
                apikey: "",
                apisecret: ""
            };

            var username = doc.studentnumber;
            request({
                method: 'POST',
                url: 'http://se.zhuangty.com:8000/curriculum/' + username,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            }, function (error, response, body) {
                if(response.statusCode === 200) {
                    var schedule = JSON.parse(body);
                    var reply_text = "";
                    var find = false;
                    var classes = schedule.classes;
                    var len = classes.length;
                    for(var j = 1; j < 7; j++){
                        find = false;
                        switch(j) {
                            case 1:
                                reply_text += "第一" + "大节 |\n";
                                break;
                            case 2:
                                reply_text += "第二" + "大节 |\n";
                                break;
                            case 3:
                                reply_text += "第三" + "大节 |\n";
                                break;
                            case 4:
                                reply_text += "第四" + "大节 |\n";
                                break;
                            case 5:
                                reply_text += "第五" + "大节 |\n";
                                break;
                            case 6:
                                reply_text += "第六" + "大节 |\n";
                                break;
                            default:
                                break;
                        }
                        for(var i = 0; i < len; i++){
                            if (classes[i].time[1] === j && classes[i].time[0] === day && classes[i].week[week - 1] === 1){
                                find = true;

                                reply_text += "        ";
                                reply_text += "课程名: " + classes[i].coursename + "\n";
                                reply_text += "        ";
                                reply_text += "老师: " + classes[i].teacher + "\n";
                                reply_text += "        ";
                                reply_text += "教室: " + classes[i].classroom + "\n";
                                break;
                            }
                            else if(i === classes.length - 1 && !find){
                                reply_text += "        ";
                                reply_text += "没课,真好!";
                                reply_text += '\n';
                            }
                        }
                    }
                    res.reply(reply_text);
                }
                else{
                    res.reply('error response.');
                }

            });

        }
    });
};
