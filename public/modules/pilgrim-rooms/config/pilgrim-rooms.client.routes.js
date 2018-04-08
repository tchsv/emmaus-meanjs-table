'use strict';

//Setting up route
angular.module('pilgrim-rooms').config(['$stateProvider',
	function($stateProvider) {
		// Pilgrim rooms state routing
		$stateProvider.
		state('listPilgrimRooms', {
			url: '/pilgrim-rooms',
			templateUrl: 'modules/pilgrim-rooms/views/list-pilgrim-rooms.client.view.html'
		}).
		state('newListPilgrimRooms', {
			url: '/new-pilgrim-rooms',
			templateUrl: 'modules/pilgrim-rooms/views/new-list-pilgrim-rooms.client.view.html'
		}).
		state('createPilgrimRoom', {
			url: '/pilgrim-rooms/create',
			templateUrl: 'modules/pilgrim-rooms/views/create-pilgrim-room.client.view.html'
		}).
		state('viewPilgrimRoom', {
			url: '/pilgrim-rooms/:pilgrimRoomId',
			templateUrl: 'modules/pilgrim-rooms/views/view-pilgrim-room.client.view.html'
		}).
		state('editPilgrimRoom', {
			url: '/pilgrim-rooms/:pilgrimRoomId/edit',
			templateUrl: 'modules/pilgrim-rooms/views/edit-pilgrim-room.client.view.html'
		});
	}
]);
