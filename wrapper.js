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

var urlStudentNotice = function () {
  return getUrl('student/notice');
};

var urlTeacherNotice = function () {
  return getUrl('teacher/notice');
};

var urlRemindSettings = function(){
  return getUrl('student/remindSettings');
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