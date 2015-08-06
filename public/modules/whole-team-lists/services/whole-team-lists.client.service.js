'use strict';

//Whole team lists service used to communicate Whole team lists REST endpoints
angular.module('whole-team-lists').factory('WholeTeamLists', ['$resource',
	function($resource) {
		return $resource('whole-team-lists/:wholeTeamListId', { wholeTeamListId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);