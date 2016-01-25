var PORT = process.env.PORT || 3000;
var moment = require('moment');

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));


var clientInfo ={

};


io.on('connection',function(socket) {

	socket.on('user',function(req){
		clientInfo[socket.id] = req;
		console.log(req,socket.id);

		//socket.join(req.room);
		socket.
		//broadcast.
		//to(req.room).
		emit('user',{
			username : req.username,
			text : req.username + 'has joined',
			timestamp : moment.valueOf()
		});

	})

	socket.emit('message',{
		text:'Welcome',
		timestamp : moment().valueOf(),
		username:socket.username
	})
	
	socket.on('message',function(data){
		console.log(data.text);
		io.
		//to(clientInfo[socket.id].room).
		emit('message',data);
	})

	console.log('Client Connected');
});

http.listen(PORT,function(){
	console.log('Server started');
});