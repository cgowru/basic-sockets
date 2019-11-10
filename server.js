var PORT = process.env.PORT || 3200; // Added Port Comment
var moment = require('moment');

var express = require('express');
var app = express();

var http = require('http').Server(app); // Added Server comment
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// Hello
// Hello1
// Feature_1111
var clientInfo =[

];



/* io listens on a connection Event and the corresponding callback function is invoked */
io.on('connection',function(socket) {

	socket.on('user',function(user){
		clientInfo[socket.id] = user;
		console.log(user,socket.id,clientInfo);

		socket.emit('userJoined',{
			name : user.name
		})

		socket
		.join(user.room,function(err){
			if (err) {
				console.log('Failed to join the room');
				return;
			}
			console.log('Successfully joined the room');
		})
		.broadcast
		.to(user.room)
		.emit('message',{
			name : user.name,
			text : user.name + ' has joined',
			timestamp : moment.valueOf()
		});

	})

	socket.on('message',function(data){
		console.log(data.text);
		io.
		to(clientInfo[socket.id].room).
		emit('message',data);
	})

	console.log('Client Connected');
});

http.listen(PORT,function(){
	console.log('Server started');
});
