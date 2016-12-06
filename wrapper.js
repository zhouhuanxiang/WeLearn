var settings = require('./setting');

var getUrl = function (path) {
  return settings.siteDomain + '/' + path;
};

var urlStudentLogin = function () {
  return getUrl('student/login');
};

var urlLessonInfo = function () {
  return getUrl('student/course');
};

var urlStudentMessage = function () {
  return getUrl('student/message');
};

var urlTeacherMessage = function () {
  return getUrl('teacher/message');
};

var urlScheduleInfo = function(){
  return getUrl('student/schedule');
};

var urlLibrarySeatInfo = function () {
  return getUrl('library/seat');
}

var wrapper = {
  urlStudentLogin: urlStudentLogin,
  urlLessonInfo: urlLessonInfo,
  urlScheduleInfo: urlScheduleInfo,
  urlLibrarySeatInfo: urlLibrarySeatInfo,
  urlStudentMessage: urlStudentMessage,
  urlTeacherMessage: urlTeacherMessage
};

module.exports = wrapper;