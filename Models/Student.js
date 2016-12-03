var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  student_id: String,
  password: String
});

module.exports = mongoose.model('Student', schema);