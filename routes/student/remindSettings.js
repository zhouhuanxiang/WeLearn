/*
 接口说明
 by 秦堤
 2016-12-27

 get '/student/remindSettings'
 返回实例(选择提醒列表)
 返回：
 {
 status: 'choose',
 courses: ['软工3（第xx 学期）','计网1（第xx 学期）']    //课程数组
 }

 post '/student/remindSettings'
 得到数据
 {
 ddl: ['软工3（第xx 学期）','计网1（第xx 学期）'], //不需要ddl提醒的课程名数组
 document: ['软工3（第xx 学期）','计网1（第xx 学期）'], //不需要文件提醒的课程名数组
 notice: ['软工3（第xx 学期）','计网1（第xx 学期）'] //不需要公告提醒的课程名数组
 hwk: ['软工3（第xx 学期）','计网1（第xx 学期）'] //不需要作业提醒的课程名数组
 }
 返回数据
 {
 status:'seted'
 }
 */

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var utf8 = require('utf8');
var router = express.Router();
var Student = require('../../Models/Student');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function (req, res, next){
    Student.findOne({openid: req.session.openid}, function (err, doc){
        if (err){
            next(err);
            return;
        }
        else{
            var courses = doc ? (doc.course) : [];
            var ddls = doc ? (doc.no_ddl) : [];
            var documents = doc ? (doc.no_document) : [];
            var notices = doc ? (doc.no_notice) : [];
            var hwks = doc ? (doc.no_hwk) : [];
            res.render('student/remindSettings', {
                openid: req.session.openid,
                courses: courses,
                ddls: ddls,
                documents: documents,
                notices: notices,
                hwks: hwks,
                status: 'choose'
            });
        }
    });
});

router.post('/', urlencodedParser, function(req, res, next) {
    //console.log(req.body);
    var ddls = req.body['ddls[]'];
    var documents = req.body['documents[]'];
    var notices = req.body['notices[]'];
    var hwks = req.body['hwks[]'];
    console.log(hwks);
    console.log(documents);

    var ddlObj = [];

    if (typeof ddls === "object"){
        //console.log("ob");
        Student.update({openid: req.session.openid},{$set:{ 'no_ddl': ddls}},  function(error, bars){});
    }
    else if (typeof ddls === "string"){
        //console.log("str");
        ddlObj = [];
        ddlObj.push(ddls);
        //console.log(ddlObj);
        Student.update({openid: req.session.openid},{$set:{ 'no_ddl': ddlObj}},  function(error, bars){});
    }

    if (typeof documents === "object"){
        //console.log("ob");
        Student.update({openid: req.session.openid},{$set:{ 'no_document': documents}},  function(error, bars){});
    }
    else if (typeof documents === "string"){
        //console.log("str");
        ddlObj = [];
        ddlObj.push(documents);
        //console.log(ddlObj);
        Student.update({openid: req.session.openid},{$set:{ 'no_document': ddlObj}},  function(error, bars){});
    }

    if (typeof notices === "object"){
        //console.log("ob");
        Student.update({openid: req.session.openid},{$set:{ 'no_notice': notices}},  function(error, bars){});
    }
    else if (typeof notices === "string"){
        //console.log("str");
        ddlObj = [];
        ddlObj.push(notices);
        //console.log(ddlObj);
        Student.update({openid: req.session.openid},{$set:{ 'no_notice': ddlObj}},  function(error, bars){});
    }

    if (typeof hwks === "object"){
        //console.log("ob");
        Student.update({openid: req.session.openid},{$set:{ 'no_hwk': hwks}},  function(error, bars){});
    }
    else if (typeof hwks === "string"){
        //console.log("str");
        ddlObj = [];
        ddlObj.push(hwks);
        //console.log(ddlObj);
        Student.update({openid: req.session.openid},{$set:{ 'no_hwk': ddlObj}},  function(error, bars){});
    }
    //Student.update({openid: req.session.openid},{$set:{ 'no_ddl': ddls,'no_document': documents,'no_notice': notices, 'no_hwk': hwks}});
    res.json({
        status: 'seted'
    });

});

module.exports = router;