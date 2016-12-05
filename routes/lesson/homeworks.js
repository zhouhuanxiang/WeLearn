var wrapper = require('../../wrapper');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var utf8 = require('utf8');
var router = express.Router();
var Student = require('../../Models/Student');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function (req, res, next) {
    //console.log(req.baseUrl);
    var lesson_id = req.baseUrl.split("/");
    lesson_id = lesson_id[3];
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
            url: 'http://se.zhuangty.com:8000/learnhelper/' + username + '/courses/' + lesson_id + '/assignments',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        }, function (error, response, body) {
            if(response.statusCode === 200) {
                var assignments = JSON.parse(body);
                //console.log(assignments);

                res.render('lesson/homeworks', {
                    title: '课程作业',
                    assignments: assignments
                });
            }
            else {
                console.log('error response.');
            }

        });
    });
});

module.exports = router;