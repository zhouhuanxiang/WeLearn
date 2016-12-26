
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// 创建socket服务
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// 房间用户名单
var roomList = {};


io.on('connection', function(socket){
	//console.log('connection ok');
  	var roomID = 0;
  	var user = '';

	socket.on('connect', function(obj){
		roomID = obj.openid + obj.course;
		if(!roomList[roomID]){
			roomList[roomID] = [];
		}
		roomList[roomID].push(obj.openid);
		//io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
		//console.log(obj.openid+' connected');
  	});

  	socket.on('disconnect', function(){
  		var index = roomList[roomID].indexOf(user);
  		if(index !== -1){
  			roomList[roomID].splice(index, 1);
  		}
  		socket.leave(roomID);
  		//console.log(obj.openid + ' leave ' + roomID);
  	});

  	socket.on('join', function(obj){
  		//console.log('join');
  		roomID = obj.openid + obj.course;
		if(!roomList[roomID]){
			roomList[roomID] = [];
		}
		roomList[roomID].push(obj.openid);
		user = obj.openid;
		socket.join(roomID);
		socket.to(roomID).emit('join', {roomID:roomID, user:user});
		console.log(obj.openid + ' join ' + roomID);
  	});

  	socket.on('leave', function(){
  		socket.emit('disconnect');
  	});

	socket.on('message', function(msg){
		if (roomList[roomID].indexOf(user) === -1) {
			console.log('the '+ roomID +' does not exist');
	      	return false;
	    }
	    //console.log('user: ' + user);
	    //console.log('msg: ' + msg);
	    //console.log('roomID: ' + roomID);
		socket.in(roomID).emit('msg', user, msg);
  	});
});

router.get('/', function (req, res, next){
	var roomID = req.session.openid + req.session.course;
	console.log(req.session.openid);
	console.log(req.session.course);
	res.render('message', {
		roomID: roomID,
	});
});

server.listen(3000, function () {
  console.log('server listening on port 3000');
});

module.exports = router;
