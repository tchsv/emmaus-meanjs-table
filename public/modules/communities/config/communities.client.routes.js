'use strict';

//Setting up route
angular.module('communities').config(['$stateProvider',
	function($stateProvider) {
		// Communities state routing
		$stateProvider.
		state('listCommunities', {
			url: '/communities',
			templateUrl: 'modules/communities/views/list-communities.client.view.html'
		}).
		state('createCommunity', {
			url: '/communities/create',
			templateUrl: 'modules/communities/views/create-community.client.view.html'
		}).
		state('viewCommunity', {
			url: '/communities/:communityId',
			templateUrl: 'modules/communities/views/view-community.client.view.html'
		}).
		state('editCommunity', {
			url: '/communities/:communityId/edit',
			templateUrl: 'modules/communities/views/edit-community.client.view.html'
		});
	}
]);