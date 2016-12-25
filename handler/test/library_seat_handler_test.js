var librarySeatHandler = require('../library_seat_handler');
var muk = require('muk');
var async = require('async');

require('should');

describe('library_seat_handler.js test', function () {
    describe('checkListLibrarySeat()', function () {
        before(function () {
            msg = {Content: "library seat"};
        });
        it('should return true', function () {
            librarySeatHandler.checkListLibrarySeat(msg).should.be.true;
        });
    });

    describe('handleListLibrarySeat()', function () {
        var req = { weixin: {FromUserName: 'S'} };
        var res = { reply: undefined};
        var result;

        before(function () {
            muk(res, 'reply', function (tmp) {
                result = tmp;
            });
        });

        it('should return a reply a text', function (done) {
            this.timeout(5000);
            check(req, res, result, function(){
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
                    result.should.be.startWith("区域");
                    done();
                });
            },
            callback()
        ]
    );
}