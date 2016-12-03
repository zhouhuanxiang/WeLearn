var settings = require('./setting');

var getUrl = function (path) {
  return settings.siteDomain + '/' + path;
};

var urlStudentLogin = function () {
  return getUrl('student/login');
};

var urlLessonInfo = function () {
  return getUrl('student/lessons');
};

var wrapper = {
  urlStudentLogin: urlStudentLogin,
  urlLessonInfo: urlLessonInfo
};

module.exports = wrapper;