'use strict';

// Team rooms controller
angular.module('team-rooms').controller('TeamRoomsController', ['$scope', '$stateParams', '$location', 'Authentication', 'TeamRooms', 'TableSettings', 'TeamRoomsForm','$resource','$q',
	function($scope, $stateParams, $location, Authentication, TeamRooms, TableSettings, TeamRoomsForm, $resource, $q ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(TeamRooms);
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
					if (answer.results[i].Building == 'Retreat Center') {
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
					//var reJig = [];
					//reJig["Building"]= tableData[i]['Building'] ;
					//reJig["RoomNumber"]= tableData[i]['RoomNumber'];
					//reJig["RoomMate1"]=tableData[i]['RoomMate1'];
					//reJig["RoomMate2"]=tableData[i]['RoomMate2'];
					//var reJig = " { ";
					//reJig += ' "Building":"' + tableData[i]['Building'] + '", ';
					//reJig += ' "RoomNumber":"' + tableData[i]['RoomNumber'] + '", ';
					//reJig += ' "RoomMate1":"' + tableData[i]['RoomMate1'] + '", ';
					//reJig += ' "RoomMate2":"' + tableData[i]['RoomMate2'] + '" } ';
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

		$scope.pullDataFromMains =  function(tableData) {
			var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
			var answer = nowWholeList.get(function() {
				var usedIDs = [];
				console.log(answer);
				for (var i = 0; i < answer.total; i++) {
					var value = [];
					if (answer.results[i].Building == 'Retreat Center') {
						console.log(usedIDs + ' ' + answer.results[i]._id + ' ' + compareIt(usedIDs,answer.results[i]._id));
						if ( compareIt(usedIDs,answer.results[i]._id) == -1) {
							value['Building'] = 'Retreat Center';
							value['RoomNumber'] = '0';
							value['Roommate1'] = answer.results[i]._id;
							usedIDs.push(answer.results[i]._id);
							var roomMate2 = 'empty';
							for (var j = 0; j < answer.total; j++) {
								if (answer.results[j].Name == answer.results[i].Roommate) {
									roomMate2 = answer.results[j]._id;
									usedIDs.push(answer.results[j]._id);
									break;
								}
							}
							value['Roommate2'] = roomMate2;
							var putting = $resource('/team-rooms');
							var jval = '{ "Building":"Retreat Center", "RoomNumber":"0", "Roommate1":"' + value['Roommate1'] + '","Roommate2":"' + value['Roommate2'] + '"}';
							putting.save(jval);
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
