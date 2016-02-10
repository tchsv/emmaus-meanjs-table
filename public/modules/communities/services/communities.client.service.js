'use strict';

//Communities service used to communicate Communities REST endpoints
angular.module('communities').factory('Communities', ['$resource',
	function($resource) {
		return $resource('communities/:communityId', { communityId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);