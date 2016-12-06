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

router.get('/', urlencodedParser, function (req, res, next) {
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
                    title: '我的课表',
                    schedule:schedule
                });
            }
            else{
                console.log(error);
            }

        });
    });

});

module.exports = router;