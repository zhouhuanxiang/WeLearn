var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  course: String,  //为 coursename
  msgHead: String,
  msgBody: String,
  photo: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', schema);