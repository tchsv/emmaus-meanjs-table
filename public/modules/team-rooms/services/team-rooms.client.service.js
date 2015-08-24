'use strict';

//Team rooms service used to communicate Team rooms REST endpoints
angular.module('team-rooms').factory('TeamRooms', ['$resource',
	function($resource) {
		return $resource('team-rooms/:teamRoomId', { teamRoomId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);