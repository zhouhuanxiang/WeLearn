var lessonHandler = require('../lesson_handler');
var Student = require('../../Models/Student');
var muk = require('muk');
var async = require('async');

require('should');

describe('lesson_handler.js test', function () {
    describe('checkListLesson()', function () {
        before(function () {
            msg = {Content: "lesson"};
        });
        it('should return true', function () {
            lessonHandler.checkListLesson(msg).should.be.true;
        });
    });

    describe('handleListLesson()', function () {
        var req1 = { weixin: {FromUserName: 'S'} };
        var req2 = { weixin: {FromUserName: 'invalid'} };
        var res = { reply: undefined};
        var result;

        before(function () {
            muk(Student, 'findOne', function (query, callback) {
                process.nextTick(function () {
                    if(query.openid === 'S'){
                        callback(undefined, {studentnumber: '2014013412'});
                    }else{
                        callback(undefined, null);
                    }
                });
            });
            muk(res, 'reply', function (tmp) {
                result = tmp;
            });
        });

        it('should return a text ask for bind', function (done) {
            lessonHandler.handleListLesson(req2, res);
            process.nextTick(function () {
                result.should.be.equal('请先进行绑定');
                done();
            });
        });

        it('should return a reply message', function (done) {
            lessonHandler.handleListLesson(req1, res);
            process.nextTick(function () {
                result[0].title.should.be.equal('课程信息');
                done();
            });
        });

        after(function () {
            muk.restore();
        });
    });
});