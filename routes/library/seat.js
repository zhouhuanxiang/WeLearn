var wrapper = require('../../wrapper');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var utf8 = require('utf8');
var router = express.Router();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function (req, res, next) {
    var requestData = {
        apikey: "",
        apisecret: ""
    };
    request({
        method: 'POST',
        url: 'http://se.zhuangty.com:8000/library/hs',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }, function (error, response, body) {
        if(response.statusCode === 200) {
            var seats = JSON.parse(body);
            //console.log(seats);

            res.render('library/seat', {
                title: '文图座位信息一览表',
                seats:seats
            });
        }
        else {
            console.log('error response.');
        }

    });
});

module.exports = router;