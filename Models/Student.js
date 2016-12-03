var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  studentnumber: {type:String, require:true, trim:true, unique: true},
  realname: {type:String, require:true, trim:true},
  position: {type:String, require:true, trim:true},
  department: {type:String, require:true, trim:true},
  email: {type:String, require:true, trim:true}
});

module.exports = mongoose.model('Student', schema);