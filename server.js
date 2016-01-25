var PORT = process.env.PORT || 3000;
var moment = require('moment');

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection',function(socket) {

	socket.emit('message',{
		text:'Welcome',
		timestamp : moment().valueOf(),
		username:socket.username
	})

	socket.emit('user',{
		text:'Welcome',
		timestamp : moment().valueOf(),
		username:socket.username
	})

	socket.on('user',function(data){
		console.log(data.text,data.username);
		io.emit('user',data);
	})
	
	socket.on('message',function(data){
		console.log(data.text);
		io.emit('message',data);
	})

	console.log('Client Connected');
});

http.listen(PORT,function(){
	console.log('Server started');
});