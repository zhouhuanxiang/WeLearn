var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Student = new Schema({
  openid: {type:String, require:true, trim:true},
  studentnumber: {type:String, require:true, trim:true}, //应该是unique
  realname: {type:String, require:true, trim:true},
  position: {type:String, require:true, trim:true},
  department: {type:String, require:true, trim:true},
  email: {type:String, require:true, trim:true},
  course: [String],  //coursename
  no_ddl: [String],    //不需要ddl提醒的课程名数组
  no_document: [String],    //不需要文件提醒的课程名数组
  no_notice: [String],    //不需要公告提醒的课程名数组
  no_hwk: [String]    //不需要作业提醒的课程名数组
});

module.exports = mongoose.model('Student', Student);