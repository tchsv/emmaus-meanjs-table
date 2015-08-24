'use strict';

//Pilgrim rooms service used to communicate Pilgrim rooms REST endpoints
angular.module('pilgrim-rooms').factory('PilgrimRooms', ['$resource',
	function($resource) {
		return $resource('pilgrim-rooms/:pilgrimRoomId', { pilgrimRoomId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);