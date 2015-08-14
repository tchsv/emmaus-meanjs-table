'use strict';

//Pilgrims service used to communicate Pilgrims REST endpoints
angular.module('pilgrims').factory('Pilgrims', ['$resource',
	function($resource) {
		return $resource('pilgrims/:pilgrimId', { pilgrimId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);