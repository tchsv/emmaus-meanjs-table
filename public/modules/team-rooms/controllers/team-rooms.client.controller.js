'use strict';

// Team rooms controller
angular.module('team-rooms').controller('TeamRoomsController', ['$scope', '$stateParams', '$location', 'Authentication', 'TeamRooms', 'TableSettings', 'TeamRoomsForm','$resource','$q',
	function($scope, $stateParams, $location, Authentication, TeamRooms, TableSettings, TeamRoomsForm, $resource, $q ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(TeamRooms);
		// $scope.tableParams = pushTableToTeamsTable(TeamRooms);
		$scope.teamRoom = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = TeamRoomsForm.getFormFields(disabled);
		};

		$scope.cvsMe = function(tableData) {
			var deferred = $q.defer();
			var reJiggered = [];
			var keysS =[];
			angular.forEach(tableData[0], function(value, key) {
				this.push(key);
			}, keysS);
			keysS = {'Building':'Building','RoomNumber':'RoomNumber','RoomMate1':'RoomMate1','RoomMate2':'RoomMate2'};
			var returnList = [];
			var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
			var answer = nowWholeList.get(function() {
				for (var i = 0; i < answer.total; i++) {
					var value = [];
					if (isTeamBuilding(answer.results[i].Building)) {
						value['name'] = answer.results[i].Name;
						value['value'] = answer.results[i]._id;
						returnList.push(value);
					}
				}
				for (var i = 0; i < tableData.length; i++){
					var reJig = new Object();
					reJig.Building = tableData[i]['Building'] ;
					reJig.RoomNumber = tableData[i]['RoomNumber'];
					reJig.RoomMate1 = getNameFromList(returnList,tableData[i]['Roommate1']);
					reJig.RoomMate2 = getNameFromList(returnList,tableData[i]['Roommate2']);
					reJiggered.push(reJig);
				}
				reJiggered.unshift(keysS);
				deferred.resolve(reJiggered);
			});
			return deferred.promise;
		};

		var getNameFromList = function(list, id) {
			var returnName = 'empty';
			for (var j = 0; j < list.length; j++) {
				if ( id == list[j].value) {
					returnName = list[j].name;
					break;
				}
			}
			return returnName;
		}

		function pushTableToTeamsTable(id, RoomNumber) {
			if (id == 'Empty') {
				return;
			}
			var teamTableGet = $resource('/whole-team-lists/' + id);
			teamTableGet.get(function (tableGetValue) {
				tableGetValue.RoomNumber = RoomNumber;
				var tableUpdate = $resource('/whole-team-lists/' + id, null,
						{
							'update': {method: 'PUT'}
						});
				tableUpdate.update(tableGetValue);
			});
		}

		$scope.pushRoomNumberToTeamTables = function (tableData) {
			for (var i = 0; i < tableData.length; i++) {
				var RoomNumber = tableData[i]['RoomNumber'];
				// get from wholelist this tableleader...  change Table value...  update wholelist with this table leader.
				pushTableToTeamsTable( tableData[i]['Roommate1'],RoomNumber);
				pushTableToTeamsTable( tableData[i]['Roommate2'],RoomNumber);
			}

		};

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
        function needRoomMateNameFromID (wholeTeamList, roomMateID) {
            if ( roomMateID == 'Empty') {
                return 'Empty';
            }
            for ( var i = 0; i < wholeTeamList.length; i++ ) {
                var theID = wholeTeamList[i]._id;
                if ( theID == roomMateID){
                    return wholeTeamList[i].Name;
                } else if ( theID == 'Empty') {
                    return 'Empty';
                }
            }
            return '';
        }
        $scope.needRoomMates = function(wholeTeamList, roomMateIDArray) {
            var returnString = '';
            if ( roomMateIDArray.isEmpty) {
                return 'Empty';
            }
            for ( var z = 0; z < roomMateIDArray.length; z++) {
                for (var i = 0; i < wholeTeamList.length; i++) {
                    var theID = wholeTeamList[i]._id;
                    if (theID == roomMateIDArray[z]) {
                        returnString += wholeTeamList[i].Name;
                    } else if (theID == 'Empty') {
                        returnString += 'Empty';
                    }
                }
            }
            return returnString;
        }


		$scope.pullDataFromMains =  function(tableData) {
			var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
			var answer = nowWholeList.get(function() {
				var usedIDs = [];
				console.log(answer);
				for (var i = 0; i < answer.total; i++) {
					var value = [];
					if (isTeamBuilding(answer.results[i].Building)) {
						console.log(usedIDs + ' ' + answer.results[i]._id + ' ' + compareIt(usedIDs,answer.results[i]._id));
						if ( compareIt(usedIDs,answer.results[i]._id) == -1) {
							value['Building'] = answer.results[i].Building;
							value['RoomNumber'] = answer.results[i].RoomNumber;
							value['Roommate1'] = answer.results[i]._id;
							usedIDs.push(answer.results[i]._id);
							usedIDs.push(answer.results[i].Roommate);
							value['Roommate2'] = answer.results[i].Roommate;
                            if (answer.results[i].Roommates[0].length > 0) {
                                value['Roommates'] = answer.results[i].Roommates;
                                for (var rmCd = 0; rmCd < answer.results[i].Roommates.length; rmCd++ ) {
                                    usedIDs.push(answer.results[i].Roommates[rmCd]);
                                }
                            }
							// value['Roommate2'] = needRoomMateNameFromID(answer.results,answer.results[i].Roommate)
							// var putting = $resource('/team-rooms');
							// var jval = '{ "Building":"Retreat Center", "RoomNumber":value['RoomNumber'], "Roommate1":"' + value['Roommate1'] + '","Roommate2":"' + value['Roommate2'] + '"}';
							// putting.save(value);
							$scope.tableParams.data.push(value);
						}
						else {
							console.log("found dupe");
						}
					}
				}
			});
		};

		var compareIt = function(arrayD,valueD) {
			for (var z = 0; z < arrayD.length; z++) {
				if (arrayD[z] ===  valueD) {
					return z;
				}
			}
			return -1;
		}

		// Create new Team room
		$scope.create = function() {
			var teamRoom = new TeamRooms($scope.teamRoom);

			// Redirect after save
			teamRoom.$save(function(response) {
				$location.path('team-rooms/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Team room
		$scope.remove = function(teamRoom) {

			if ( teamRoom ) {
				teamRoom = TeamRooms.get({teamRoomId:teamRoom._id}, function() {
					teamRoom.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.teamRoom.$remove(function() {
					$location.path('teamRooms');
				});
			}

		};

		// Update existing Team room
		$scope.update = function() {
			var teamRoom = $scope.teamRoom;

			teamRoom.$update(function() {
				$location.path('team-rooms/' + teamRoom._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewTeamRoom = function() {
			$scope.teamRoom = TeamRooms.get( {teamRoomId: $stateParams.teamRoomId} );
			$scope.setFormFields(true);
		};

		$scope.toEditTeamRoom = function() {
			$scope.teamRoom = TeamRooms.get( {teamRoomId: $stateParams.teamRoomId} );
			$scope.setFormFields(false);
		};

	}

]);
