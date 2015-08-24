'use strict';

//Setting up route
angular.module('conf-room-tables').config(['$stateProvider',
	function($stateProvider) {
		// Conf room tables state routing
		$stateProvider.
		state('listConfRoomTables', {
			url: '/conf-room-tables',
			templateUrl: 'modules/conf-room-tables/views/list-conf-room-tables.client.view.html'
		}).
		state('createConfRoomTable', {
			url: '/conf-room-tables/create',
			templateUrl: 'modules/conf-room-tables/views/create-conf-room-table.client.view.html'
		}).
		state('viewConfRoomTable', {
			url: '/conf-room-tables/:confRoomTableId',
			templateUrl: 'modules/conf-room-tables/views/view-conf-room-table.client.view.html'
		}).
		state('editConfRoomTable', {
			url: '/conf-room-tables/:confRoomTableId/edit',
			templateUrl: 'modules/conf-room-tables/views/edit-conf-room-table.client.view.html'
		});
	}
]);