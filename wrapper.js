var settings = require('./setting');

var getUrl = function (path) {
  return settings.siteDomain + '/' + path;
};

var urlStudentLogin = function () {
  return getUrl('student/login');
};

var urlLessonInfo = function () {
  return getUrl('student/lesson');
};

var urlChat = function () {
	return getUrl('chatSearch');
}

var wrapper = {
  urlChat: urlChat,
  urlStudentLogin: urlStudentLogin,
  urlLessonInfo: urlLessonInfo
};

module.exports = wrapper;