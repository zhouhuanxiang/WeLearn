var mongoose = require('mongoose');
var Student = require('./Student');

var schema = new mongoose.Schema({
  courseid: {type:String, require:true, trim:true, unique: true},
  coursename: {type:String, require:true, trim:true},
  teacher: [{
    name: String,
    openid: String
  }],
  student: [{
    name: String,
    openid: String
  }],
  message: [{
    toTeacher: Boolean,
    student: String,
    msgHead: String,
    msgBody: String,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Course', schema);