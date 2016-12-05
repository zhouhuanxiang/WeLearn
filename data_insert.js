var Student = require('./Models/Student');
var Course = require('./Models/Course');

module.exports = function () {
  Student.remove({}, function (err, doc) {});
  Course.remove({}, function (err, doc) {});
  var student1 = {
    openid: 'o3HdVwQhhR9vV2MhK0zS6WruOLmE',
    studentnumber: '2014011909',
    realname: '周焕祥',
    position: 'undergraduate',
    department: '软件学院',
    email: 'zhx14@mails.tsinghua.edu.cn',
    course: ['三年级男生网球(5)(2016-2017秋季学期)']
  };
  var studentObj1 = new Student(student1);
  studentObj1.save();

  var student2 = {
    openid: 'o3HdVwWHa0uJNuNLQ7u_1Tf0VEng',
    studentnumber: '2014011909',
    realname: '牟老师',
    position: 'teacher',
    department: '软件学院',
    email: 'zhx14@mails.tsinghua.edu.cn',
    course: ['三年级男生网球(5)(2016-2017秋季学期)']
  };
  var studentObj2 = new Student(student2);
  studentObj2.save();

  var course1 = {
    courseid: '136947',
    coursename: '三年级男生网球(5)(2016-2017秋季学期)',
    student: [ '周焕祥'],
    teacher: [ '牟老师']
  };
  var courseObj1 = new Course(course1);
  courseObj1.save(function (err) {
    if (err){
      console.log(err);
    }
  });
};