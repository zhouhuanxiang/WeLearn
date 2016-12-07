var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var utf8 = require('utf8');
var router = express.Router();
var Student = require('../../Models/Student');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', urlencodedParser, function (req, res, next) {
  Student.findOne({openid: req.session.openid}, function (err, doc) {
    if (err) next(err);
    //doc 的数据就是这个用户
    //console.log(doc);
  })
});

module.exports = router;

