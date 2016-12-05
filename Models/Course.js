var mongoose = require('mongoose');
var Student = require('./Student');

var schema = new mongoose.Schema({
  courseid: {type:String, require:true, trim:true, unique: true},
  coursename: {type:String, require:true, trim:true},
  teacher: [String],
  student: [String],
  message: [{
    toTeacher: Boolean,
    student: String,
    msgHead: String,
    msgBody: String
  }]
});

module.exports = mongoose.model('Course', schema);