var scheduleHandler = require('../schedule_handler');
var Student = require('../../Models/Student');
var muk = require('muk');
var async = require('async');

require('should');

describe('schdule_handler.js test', function () {
    describe('checkListSchedule()', function () {
        before(function () {
            msg = {Content: "schedule"};
        });
        it('should return true', function () {
            scheduleHandler.checkListSchedule(msg).should.be.true;
        });
    });

    describe('handleListSchedule()', function () {
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
            scheduleHandler.handleListSchedule(req2, res);
            process.nextTick(function () {
                result.should.be.equal('请先进行绑定');
                done();
            });
        });

        it('should return a schedule text', function (done) {
            this.timeout(5000);
            check(req1, res, result, function () {
                done();
            });
        });

        after(function () {
            muk.restore();
        });
    });
});

function check(req, res, result, callback){
    async.series(
        [
            function(done){
                librarySeatHandler.handleListLibrarySeat(req, res);
                done();
            },
            function(done){
                process.nextTick(function () {
                    result.should.be.startWith("第");
                    done();
                });
            },
            callback()
        ]
    );
}