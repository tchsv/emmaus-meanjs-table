'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('conf-room-tables').factory('ConfRoomTables', ['$resource',
	function($resource) {
		return $resource('conf-room-tables/:confRoomTableId', { confRoomTableId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);