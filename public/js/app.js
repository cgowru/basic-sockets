angular
.module('myApp',['ngRoute'])
.factory('$soc',function(){
	var socket = io();

	return socket;
})
.factory('shareable',function(){
	var  shareable={
		users:[]
	};
	return shareable;
})
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
	'$scope','$window','$soc','shareable','$q',
	function($scope,$window,socket,shareable,$q
		) {
		$scope.user={};

		socket.on('connect',function(data){
			console.log('Client Conzanected to Server');
		});

		$scope.signinsubmit = function ($event){
			$event.preventDefault();
				socket.on('user',function(user){
					shareable.users.push(user);
					console.log(user);
				});

				socket.emit('user',{
					timestamp : moment().valueOf(),
					username: $scope.user.name,
					room : $scope.user.room
				});
				$window.location.href='/#chat';			
		}
	}
])
.controller('chatCtrl',[
	'$scope','$soc','shareable',
	function($scope,socket,shareable){				

		$scope.items = [];
		$scope.username=shareable.users[0].username;

		socket.on('message',function(data){
			var timestamp = moment.utc(data.timestamp);
			$scope.$apply(function(){
				$scope.items.push({
					text :data.text,
					timestamp : timestamp.local().format('h:mm a')
				});	
			});
		});

		$scope.formsubmit = function ($event){
			$event.preventDefault();

			socket.emit('message',{
				text: $scope.usermsg,
				timestamp : moment().valueOf()
			});
			$scope.usermsg='';
		}
	}
])



