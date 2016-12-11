var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  toTeacher: Boolean,
  student: String, //为 openid
  course: String,  //为 coursename
  msgHead: String,
  msgBody: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', schema);