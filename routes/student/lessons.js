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

    Student.find({}, function(err,docs){
        if(err) next(err);
        //console.log(docs);

        var username = docs[0].studentnumber;
        request({
            method: 'POST',
            url: 'http://se.zhuangty.com:8000/learnhelper/' + username + '/courses',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        }, function (error, response, body) {
            if(response.statusCode === 200) {
                var lessons = JSON.parse(body);
                //console.log(lessons);

                res.render('student/lessons', {
                    title: '我的课程',
                    lessons: lessons
                });
            }

        });
    });

});

module.exports = router;

