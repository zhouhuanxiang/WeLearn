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
    var lesson_id = req.baseUrl.split("/");
    lesson_id = lesson_id[3];
    console.log(lesson_id);
    var requestData = {
        apikey: "",
        apisecret: ""
    };

    Student.find({}, function(err,docs){
        if(err) next(err);
        //console.log(docs);

        var username = docs[0].studentnumber;
        console.log(username);
        request({
            method: 'POST',
            url: 'http://se.zhuangty.com:8000/learnhelper/2014013412/courses/137928/documents',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        }, function (error, response, body) {
            console.log(body);
            console.log(response.statusCode);
            if(response.statusCode === 200) {
                var documents = JSON.parse(body);
                console.log(documents);

                res.render('lesson/documents', {
                    title: '课程文件',
                    documents: documents
                });
            }
            else {
                console.log(error);
            }

        });
    });
});

module.exports = router;