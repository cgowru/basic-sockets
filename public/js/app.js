angular
.module('myApp',['ngRoute'])
.factory('chatService',[
  	function() {

		var chat = {
			users:[],
			items:[],
			user:{}
		};

		chat.setUserRoom = function(user) {
			chat.user = user;
		}

		chat.setItem = function(item) {
			chat.items.push(item);
			chat.items = chat.items.splice(0);
		}

		chat.getItems = function(items) {
			return chat[items];
		}

		chat.setUser = function(user) {
			chat.users.push(user);
		}

		var socket = io();

		socket.on('connect',function(data){
			console.log('Client Connected to Server');
		});

		socket.on('userJoined',function(user){
			chat.setUser(user);
		});

		socket.on('message',function(data){
			console.log('message listen : ',data);
			var timestamp = moment.utc(data.timestamp);
			chat.setItem({
				text :data.text,
				timestamp : timestamp.local().format('h:mm a')
			});	
		});

		chat.emitUser = function(user){
			chat.setUserRoom(user);

			socket.emit('user',{
				timestamp : moment().valueOf(),
				name: user.name,
				room: user.room
			});
		}

		chat.emitMessage = function(msg) {
			var item = {
				text: msg.text,
				timestamp : moment().valueOf()				
			}
			//chat.setItem(item);
			socket.emit('message',item);
		}


		return chat;
	}
])
.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'views/login.html',
		controller: 'loginCtrl'
	})
	.when('/chat',{
		templateUrl: 'views/chat.html',
		controller: 'chatCtrl'
	});
})
.controller('loginCtrl',[
	'$scope','$window','chatService',
	function($scope,$window,onChat) {
		$scope.user={};

		$scope.signinsubmit = function ($event){
			$event.preventDefault();

			onChat.emitUser({
				name : $scope.user.name,
				room : $scope.user.room
			})

			$window.location.href='/#chat';			
		}
	}
])
.controller('chatCtrl',[
	'$scope','chatService',
	function($scope,onChat){				
		$scope.$watch(
			function(){
				return onChat.getItems('items');
			},
			function(newval,oldval){
				if (newval !== oldval) {
					console.log(newval);
				   $scope.items = newval;
				}
			}
		);

		$scope.username=onChat.users[0].name;

		$scope.formsubmit = function ($event){
			$event.preventDefault();

			onChat.emitMessage({
				text: $scope.usermsg
			});

			$scope.usermsg='';
		}
	}
])



