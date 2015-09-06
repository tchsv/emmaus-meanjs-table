'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('pilgrim-rooms')
    .service('PilgrimRoomTablesMembers', function(){})
    .factory('PilgrimRoomTablesMembers', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource','$q',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource, $q) {

		var getTeam =  function() {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function() {
                    console.log(answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if ( (answer.results[i].Committee == 'Table Leaders' ) || (answer.results[i].Committee == 'Asst. Table Ldrs.') ) {
                            value['name'] = answer.results[i].Name;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                console.log(returnList);
            });
			return returnList;
		};

        var getTeamWp =  function() {
            var deferred = $q.defer();
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
            var answer = nowWholeList.get(function() {
                console.log(answer);
                for (var i = 0; i < answer.total; i++) {
                    var value = [];
                    if ( (answer.results[i].Committee == 'Table Leaders' ) || (answer.results[i].Committee == 'Asst. Table Ldrs.') ) {
                        value['name'] = answer.results[i].Name;
                        value['value'] = answer.results[i]._id;
                        returnList.push(value);
                    }
                }
                deferred.resolve(returnList);
            });
            return deferred.promise;
        };
		var getPilgrim =    function() {
            var returnList = [];
            var nowWholeList = $resource('/pilgrims?count=999&page=1');
            var noneValue = [];
            noneValue['name'] = 'Empty';
            noneValue['value'] = 'Empty';
            returnList.push(noneValue);
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

        var getPilgrimWp =    function() {
            var deferred = $q.defer();
            var returnList = [];
            var nowWholeList = $resource('/pilgrims?count=999&page=1');
            var noneValue = [];
            noneValue['name'] = 'Empty';
            noneValue['value'] = 'Empty';
            returnList.push(noneValue);
            var answer = nowWholeList.get(function() {
                console.log(answer);
                for (var i = 0; i < answer.total; i++) {
                    var value = [];
                    value['name'] = answer.results[i].FirstName + ' ' + answer.results[i].LastName;
                    value['value'] = answer.results[i]._id;
                    returnList.push(value);
                }
                deferred.resolve(returnList);
            });
            return deferred.promise;
        };

        return {
            getTeam: getTeam,
            getPilgrim: getPilgrim,
            getTeamWp: getTeamWp,
            getPilgrimWp: getPilgrimWp
        }



	}


]);
