var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Student = new Schema({
  openid: {type:String, require:true, trim:true},
  studentnumber: {type:String, require:true, trim:true}, //应该是unique
  realname: {type:String, require:true, trim:true},
  position: {type:String, require:true, trim:true},
  department: {type:String, require:true, trim:true},
  email: {type:String, require:true, trim:true},
  course: [String]  //coursename
});

module.exports = mongoose.model('Student', Student);