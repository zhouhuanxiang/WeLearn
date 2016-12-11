/**
 接口说明
 by 周焕祥
 2016/12/7

 学生查看老师发布发公告，目前只能看收到的这条公告，不支持历史公告
 路由到 'student/notice.ejs'

 get 'student/notice'
 返回数据
  {
    course: '软工三（第 xx 学期）',
    msgHead: '这是公告开头'，
    msgBody: '这是公告内容',
    photo: '这是图片，引用图片的方法可以看本项目中的 /views/student/notice.ejs'
  }
 */

var express = require('express');
var setting = require('../../setting');
var router = express.Router();
var Student = require('../../Models/Student');
var Course = require('../../Models/Course');
var Notice = require('../../Models/Notice');

router.get('/:noticeid', function (req, res, next) {
  console.log(req.params.noticeid);
  Notice.findOne({_id: req.params.noticeid}, function (err, notice) {
    if(err){
      next(err);
      return;
    }
    res.render('student/notice', {
      course: notice.course,
      msgHead: notice.msgHead,
      msgBody: notice.msgBody,
      photo: '/photos/' + notice.photo
    });
  })
});

module.exports = router;