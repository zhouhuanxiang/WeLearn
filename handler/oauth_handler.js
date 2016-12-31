var setting = require('../setting');
var OAuth = require('wechat-oauth');

var client = new OAuth(setting.appid, setting.appsecret);
var state = '1';
var scope = 'snsapi_base';

exports.getAuthorizeURL = function (redirectUrl) {
  // console.log(encodeURIComponent(client.getAuthorizeURL(redirectUrl, state, scope)));
  //return client.getAuthorizeURLForWebsite(redirectUrl, state, scope);
  return client.getAuthorizeURL(redirectUrl, state, scope);
};

exports.client = client;