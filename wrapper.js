var settings = require('./setting');
var oauth = require('./handler/oauth_handler');

var getUrl = function (path) {
  return settings.siteDomain + '/' + path;
};

var urlStudentLogin = function () {
  //return oauth.getAuthorizeURL(getUrl('student/login'));
  return getUrl('student/login?openid=oBu1dv0TCi_9UEIHwqY4F0IbfX6E');
};

var urlLessonInfo = function () {
  return oauth.getAuthorizeURL(getUrl('student/course'));
};

var urlStudentMessage = function () {
  return oauth.getAuthorizeURL(getUrl('student/message'));
};

var urlTeacherMessage = function () {
  return oauth.getAuthorizeURL(getUrl('teacher/message'));
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

var urlRemindSettings = function(){
  return getUrl('student/remindSettings?openid=oBu1dv0TCi_9UEIHwqY4F0IbfX6E');
};

var urlCourseNewNotices = function () {
  return getUrl('/student/course/:lesson_id/notices');
};

var urlCourseNewDocuments = function () {
  return getUrl('/student/course/:lesson_id/documents');
};

var urlCourseNewAssignments = function () {
  return getUrl('/student/course/:lesson_id/assignments');
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
  urlRemindSettings: urlRemindSettings,
  urlCourseNewNotices: urlCourseNewNotices,
  urlCourseNewDocuments: urlCourseNewDocuments,
  urlCourseNewAssignments: urlCourseNewAssignments
};

module.exports = wrapper;