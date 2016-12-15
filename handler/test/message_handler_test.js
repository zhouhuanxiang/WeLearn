var messageHandler = require('../message_handler');
var setting = require('../../setting');
var Student = require('../../Models/Student');
var muk = require('muk');

require('should');

describe('message_handler.js test', function () {
  describe('checkSendMessage()', function () {
    before(function () {
      msg = {Content: setting.messageContent};
    });
    it('should return true', function () {
      messageHandler.checkSendMessage(msg).should.be.true;
    })
  });

  describe('checkSendNotice()', function () {
    before(function () {
      msg = {
        Content: setting.noticeContents
      }
    });
    it('should return true', function () {
      messageHandler.checkSendNotice(msg).should.be.true;
    });
  });

  describe('handleSendNotice()', function () {
    var req1 = { weixin: {FromUserName: 'S'} };
    var req2 = { weixin: {FromUserName: 'T'} };
    var req3 = { weixin: {FromUserName: 'invalid'} };
    var res = { reply: undefined};
    var result;
    before(function () {
      muk(Student, 'findOne', function (query, callback) {
        process.nextTick(function () {
          if (query.openid === 'T') {
            callback(undefined, {position: 'teacher'});
          }else if(query.openid === 'S'){
            callback(undefined, {position: 'student'});
          }else{
            callback(new Error(), undefined);
          }
        });
      });
      muk(res, 'reply', function (tmp) {
        result = tmp;
      });
    });

    it('should return a reply to student', function (done) {
      messageHandler.handleSendNotice(req1, res);
      process.nextTick(function () {
        result.should.be.equal('没有该权限:(');
        done();
      })
    });
    it('should return a reply to teacher', function (done) {
      messageHandler.handleSendNotice(req2, res);
      process.nextTick(function () {
        result[0].should.have.property('title', '发送图文公告');
        done();
      })
    });
    it('should return wrong info', function (done) {
      messageHandler.handleSendNotice(req3, res);
      process.nextTick(function () {
        result.should.be.equal('抱歉，出了点问题');
        done();
      })
    });

    after(function () {
      muk.restore();
    })
  })
});
