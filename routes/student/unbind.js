var wrapper = require('../../wrapper');
var express = require('express');
var request = require('request');
var utf8 = require('utf8');
var Student = require('../../Models/Student');

exports.unbind = function(openid, callback){
    Student.findOne({openid: openid}, function (err, doc) {
        if (err){
            next(err);
            return;
        }
        if (doc && doc.studentnumber){
            var requestData = {
                apiKey: "",
                apisecret: ""
            };
            var username = doc.studentnumber;
            console.log(username);
            request({
                method: 'POST',
                url: 'http://se.zhuangty.com:8000/users/' + username + '/cancel',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            }, function (error, response, body) {
                console.log(response.statusCode);
                if (response.statusCode === 200) {
                    Student.remove({openid: openid}, function (err, docs) {
                        callback('解绑成功');
                    });
                }
                else{
                    callback('解绑失败');
                }
            });
        }
        else{
            callback('请先进行绑定');
        }

    });
}