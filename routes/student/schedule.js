/**
 接口说明
 by 杨景
 2016/12/6

 get '/student/schdule'
 返回实例(课程动态信息)
 返回：
 {
   title: '我的课表',
   schedule:schedule
 }
 以上schedule具体为以下json数据:
 {
    "message": "Success",
    "username": "Request username",
    "classes": [
        {
            "courseid": "Course ID",
            "coursename": "Course name",
            "coursesequence": "course sequence number",
            "time": [day, period],
            "teacher": "Teacher",
            "classroom": "Classroom",
            "week": array of 0/1 whose length equals 16
        }
    ]
}
 */

var wrapper = require('../../wrapper');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var utf8 = require('utf8');
var router = express.Router();
var Student = require('../../Models/Student');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

function getTotalDay(year, month, day){
    var totalDays = 0;
    for(var i = 1; i < month; i++){
        if(i === 1 || i === 3 || i === 5 || i === 7 || i === 8 || i=== 10 || i === 12){
            totalDays += 31;
        }
        else if(i == 4 || i === 6 || i === 9 || i === 11){
            totalDays += 30;
        }
        else if(i === 2){
            if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0){
                totalDays += 29;
            }
            else{}
            totalDays += 28;
        }
    }
    totalDays += day;
    return totalDays;
}

router.get('/', urlencodedParser, function (req, res, next) {
    var startTime = getTotalDay(2016, 9, 12);
    var sd = require('silly-datetime');
    var time = sd.format(new Date(), 'YYYY-MM-DD');

    time = time.split(/-/);
    time = getTotalDay(parseInt(time[0]), parseInt(time[1]), parseInt(time[2]));
    var week = (parseInt((time - startTime) / 7 + 1));
    var day = ((time - startTime) % 7 + 1);


    var requestData = {
        apikey: "",
        apisecret: ""
    };

    Student.findOne({openid: req.session.openid}, function(err,doc){
        if(err) next(err);
        //console.log(docs);
        var username = doc.studentnumber;
        console.log(username);
        request({
            method: 'POST',
            url: 'http://se.zhuangty.com:8000/curriculum/' + username,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        }, function (error, response, body) {
            if(response.statusCode === 200) {
                //console.log(body);
                var schedule = JSON.parse(body);
                //console.log(schedule);

                res.render('student/schedule', {
                    title: '今日课表',
                    classes:schedule.classes,
                    week:week,
                    day:day
                });
            }
            else{
                console.log(error);
            }

        });
    });

});

module.exports = router;