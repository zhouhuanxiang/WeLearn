var settings = require('./setting');
var oauth = require('./handler/oauth_handler');

var getUrl = function (path) {
  return settings.siteDomain + '/' + path;
};

var urlStudentLogin = function () {
  return oauth.getAuthorizeURL(getUrl('student/login'));
};

var urlLessonInfo = function () {
  return oauth.getAuthorizeURL(getUrl('student/course'));
};

var urlStudentMessage = function () {
  return oauth.getAuthorizeURL(getUrl('student/message'));
};

var urlStudentMessage1 = function() {
  return oauth.getAuthorizeURL(getUrl('student/message'));
};

var urlMessage = function () {
  return getUrl('message');
};

var urlTeacherMessage = function () {
  return getUrl('teacher/message');
};

var urlScheduleInfo = function(){
  return oauth.getAuthorizeURL(getUrl('student/schedule'));
};

var urlLibrarySeatInfo = function () {
  return oauth.getAuthorizeURL(getUrl('library/seat'));
};

var urlStudentNotice = function (noticeid) {
  return oauth.getAuthorizeURL(getUrl('student/notice') + '/' + noticeid);
};

var urlTeacherNotice = function () {
  return oauth.getAuthorizeURL(getUrl('teacher/notice'));
};

var wrapper = {
  urlStudentLogin: urlStudentLogin,
  urlLessonInfo: urlLessonInfo,
  urlScheduleInfo: urlScheduleInfo,
  urlLibrarySeatInfo: urlLibrarySeatInfo,
  urlStudentMessage: urlStudentMessage,
  urlTeacherMessage: urlTeacherMessage,
  urlStudentNotice: urlStudentNotice,
  urlTeacherNotice: urlTeacherNotice,
  urlMessage: urlMessage
};

module.exports = wrapper;