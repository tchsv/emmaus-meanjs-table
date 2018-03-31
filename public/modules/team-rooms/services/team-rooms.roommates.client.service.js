'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('team-rooms')
    .service('TeamRoomMembers', function(){})
    .factory('TeamRoomMembers', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {


        function isTeamBuilding  (buildingName) {
            if (buildingName === 'Retreat Center'){
                return true;
            } else if ( buildingName === 'Main Lodge - South Hall'){
                return true;
            } else if ( buildingName === 'Main-Lodge-South-Hall'){
                return true;
            }

            return false;
        }


        var getTeamRetreat =  function() {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function() {
                    var noneValue = [];
                    noneValue['name'] = 'Empty';
                    noneValue['value'] = 'Empty';
                    returnList.push(noneValue);
                    // console.log('answer:' + JSON.stringify(answer, null, 1));
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if (isTeamBuilding(answer.results[i].Building)) {
                            value['name'] = answer.results[i].Name;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                // console.log('returnList:' + JSON.stringify(returnList, null, 1));
            });
			return returnList;
		};

        return {
            getTeamRetreat: getTeamRetreat
        }



	}


]);
