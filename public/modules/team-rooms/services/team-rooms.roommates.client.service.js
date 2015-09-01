'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('team-rooms')
    .service('ConfRoomTablesMembers', function(){})
    .factory('ConfRoomTablesMembers', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

		var getTeamRetreat =  function() {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function() {
                    console.log(answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if (answer.results[i].Building == 'Retreat Center') {
                            value['name'] = answer.results[i].Name;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                console.log(returnList);
            });
			return returnList;
		};


        return {
            getTeamRetreat: getTeamRetreat
        }



	}


]);
