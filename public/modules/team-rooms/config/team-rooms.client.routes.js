'use strict';

//Setting up route
angular.module('team-rooms').config(['$stateProvider',
	function($stateProvider) {
		// Team rooms state routing
		$stateProvider.
		state('listTeamRooms', {
			url: '/team-rooms',
			templateUrl: 'modules/team-rooms/views/list-team-rooms.client.view.html'
		}).
		state('createTeamRoom', {
			url: '/team-rooms/create',
			templateUrl: 'modules/team-rooms/views/create-team-room.client.view.html'
		}).
		state('viewTeamRoom', {
			url: '/team-rooms/:teamRoomId',
			templateUrl: 'modules/team-rooms/views/view-team-room.client.view.html'
		}).
		state('editTeamRoom', {
			url: '/team-rooms/:teamRoomId/edit',
			templateUrl: 'modules/team-rooms/views/edit-team-room.client.view.html'
		});
	}
]);