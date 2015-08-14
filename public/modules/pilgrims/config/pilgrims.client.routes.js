'use strict';

//Setting up route
angular.module('pilgrims').config(['$stateProvider',
	function($stateProvider) {
		// Pilgrims state routing
		$stateProvider.
		state('listPilgrims', {
			url: '/pilgrims',
			templateUrl: 'modules/pilgrims/views/list-pilgrims.client.view.html'
		}).
		state('createPilgrim', {
			url: '/pilgrims/create',
			templateUrl: 'modules/pilgrims/views/create-pilgrim.client.view.html'
		}).
		state('viewPilgrim', {
			url: '/pilgrims/:pilgrimId',
			templateUrl: 'modules/pilgrims/views/view-pilgrim.client.view.html'
		}).
		state('editPilgrim', {
			url: '/pilgrims/:pilgrimId/edit',
			templateUrl: 'modules/pilgrims/views/edit-pilgrim.client.view.html'
		});
	}
]);