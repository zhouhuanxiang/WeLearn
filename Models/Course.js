var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  courseid: {type:String, require:true, trim:true, unique: true},
  coursename: {type:String, require:true, trim:true},
  teacher: [{
    name: String,
    openid: String
  }],
  student: [{
    name: String, //现暂为 openid，不过 studentnumber 更好
    openid: String
  }]
});

module.exports = mongoose.model('Course', schema);