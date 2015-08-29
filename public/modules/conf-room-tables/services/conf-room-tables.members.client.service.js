'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('conf-room-tables')
    .service('ConfRoomTablesMembers', function(){})
    .factory('ConfRoomTablesMembers', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

		var getTableLeaders =  function() {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function() {
                    console.log(answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if (answer.results[i].Committee == 'Table Leaders') {
                            value['name'] = answer.results[i].Name;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                console.log(returnList);
            });
			return returnList;
		};
		var getAssistantTableLeaders = function() {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
            var answer = nowWholeList.get(function() {
                console.log(answer);
                for (var i = 0; i < answer.total; i++) {
                    var value = [];
                    if (answer.results[i].Committee == 'Asst. Table Ldrs.') {
                        value['name'] = answer.results[i].Name;
                        value['value'] = answer.results[i]._id;
                        returnList.push(value);
                    }
                }
                console.log(returnList);
            });
            return returnList;
		};

		var getPilgrims =    function() {
            var returnList = [];
            var nowWholeList = $resource('/pilgrims?count=999&page=1');
            var noneValue = [];
            noneValue['name'] = 'None';
            noneValue['value'] = 'None';
            var answer = nowWholeList.get(function() {
                console.log(answer);
                for (var i = 0; i < answer.total; i++) {
                    var value = [];
                        value['name'] = answer.results[i].FirstName + ' ' + answer.results[i].LastName;
                        value['value'] = answer.results[i]._id;
                        returnList.push(value);
                }
                console.log(returnList);
            });
            return returnList;
		};


        return {
            getTableLeaders: getTableLeaders,
            getAssistantTableLeaders: getAssistantTableLeaders,
            getPilgrims: getPilgrims
        }



	}


]);
