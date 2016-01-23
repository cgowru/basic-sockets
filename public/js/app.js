

angular
.module('myApp',[])
.controller('myCtrl',[
	'$scope',
	function($scope){				
		var socket = io();
		
		$scope.items = [];

		socket.on('connect',function(data){
			console.log('Client Connected to Server');
		});
		

		socket.on('message',function(data){
			$scope.$apply(function(){
				$scope.items.push(data.text);	
			});
		});

		$scope.formsubmit = function ($event){
			$event.preventDefault();

			socket.emit('message',{
				text: $scope.usermsg
			});
			$scope.usermsg='';
		}
	}
])



