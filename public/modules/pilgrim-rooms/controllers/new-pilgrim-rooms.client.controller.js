'use strict';

// Pilgrim rooms controller
angular.module('pilgrim-rooms').controller('NewPilgrimRoomsController', ['$scope', '$stateParams', '$location',
    'Authentication', 'PilgrimRooms', 'TableSettings', 'PilgrimRoomsForm', 'PilgrimRoomTablesMembers', '$q','$resource',
    function ($scope, $stateParams, $location, Authentication, PilgrimRooms, TableSettings, PilgrimRoomsForm, PilgrimRoomTablesMembers, $q, $resource) {
        $scope.authentication = Authentication;
        $scope.tableParams = TableSettings.getParams(PilgrimRooms);
        $scope.pilgrimRoom = {};

        $scope.setFormFields = function (disabled) {
            $scope.formFields = PilgrimRoomsForm.getFormFields(disabled);
        };

        $scope.cvsMe = function (tableData) {
            var deferred = $q.defer();
            var reJiggered = [];
            var keysS = [];
            angular.forEach(tableData[0], function (value, key) {
                this.push(key);
            }, keysS);
            keysS = {
                'Building': 'Building',
                'RoomNumber': 'RoomNumber',
                'UpDown': 'UpDown',
                'TeamRoommate': 'TeamRoommate'
                ,
                'PilgrimRoommate1': 'PilgrimRoommate1',
                'PilgrimRoommate2': 'PilgrimRoommate2',
                'PilgrimRoommate3': 'PilgrimRoommate3'
            };


            PilgrimRoomTablesMembers.getTeamWp().then(function (teamList) {
                PilgrimRoomTablesMembers.getPilgrimWp().then(function (pilgrimList) {
                    for (var i = 0; i < tableData.length; i++) {
                        var reJig = new Object();
                        reJig.Building = tableData[i]['Building'];
                        reJig.RoomNumber = tableData[i]['RoomNumber'];
                        reJig.UpDown = tableData[i]['UpDown'];
                        reJig.TeamRoommate = getNameFromList(teamList, tableData[i]['TeamRoommate'], false);
                        reJig.PilgrimRoommate1 = getNameFromList(pilgrimList, tableData[i]['PilgrimRoommate1'], true);
                        reJig.PilgrimRoommate2 = getNameFromList(pilgrimList, tableData[i]['PilgrimRoommate2'], true);
                        reJig.PilgrimRoommate3 = getNameFromList(pilgrimList, tableData[i]['PilgrimRoommate3'], true);
                        reJiggered.push(reJig);
                    }
                    reJiggered.unshift(keysS);
                    deferred.resolve(reJiggered);

                });
            });

            return deferred.promise;
        };
        var getNameFromList = function (list, id) {
            var returnName = 'empty';
            for (var j = 0; j < list.length; j++) {
                if (id == list[j].value) {
                    returnName = list[j].name;
                    break;
                }
            }
            return returnName;
        };

        function pushRoomNumberToPilgrimsTable(id, RoomNumber) {
            if (id == 'empty') {
                return;
            }
            var pilgrim1TableGet = $resource('/pilgrims/' + id);
            pilgrim1TableGet.get(function (tableGetValue) {
                tableGetValue.RoomNumber = RoomNumber;
                var tableUpdate = $resource('/pilgrims/' + id, null,
                    {
                        'update': {method: 'PUT'}
                    });
                tableUpdate.update(tableGetValue);
            });
        }
        function pushStringToPilgrimsTable(id, value, input) {
            if (id == 'empty') {
                return;
            }
            var pilgrim1TableGet = $resource('/pilgrims/' + id);
            pilgrim1TableGet.get(function (tableGetValue) {
                tableGetValue[input] = input;
                var tableUpdate = $resource('/pilgrims/' + id, null,
                    {
                        'update': {method: 'PUT'}
                    });
                tableUpdate.update(tableGetValue);
            });
        }
        function pushRoomNumberToTeamsTable(id, RoomNumber) {
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
        function translateUpDown(RoomNumber) {
            if (RoomNumber < 75) {
                return 'Up';
            } else {
                return 'Down';
            }
        }
        $scope.pushRoomNumberToMainTables = function (tableData) {
            for (var i = 0; i < tableData.length; i++) {
                var RoomNumber = tableData[i]['RoomNumber'];
                // get from wholelist this tableleader...  change Table value...  update wholelist with this table leader.
                pushRoomNumberToTeamsTable( tableData[i]['TeamRoommate'],RoomNumber);
                pushRoomNumberToPilgrimsTable(tableData[i]['PilgrimRoommate1'], RoomNumber);
                pushRoomNumberToPilgrimsTable(tableData[i]['PilgrimRoommate2'], RoomNumber);
                pushRoomNumberToPilgrimsTable(tableData[i]['PilgrimRoommate3'], RoomNumber);
            }

        };
        function isInEastWing(teamMember) {
            if (teamMember.Building == 'Main-Lodge-East-Wing') {
                return true;
            } else {
                return false;
            }
        }
    //     <!--//TeamRoommate: {-->
    //     <!--//PilgrimRoommate1: {-->
    //     <!--//PilgrimRoommate2: {-->
    //     <!--//RoomNumber: {-->
    //     <!--//UpDown: {-->
    //     <!--//Building: {-->
        $scope.pullDataFromMains =  function(tableData) {
            PilgrimRoomTablesMembers.getTeamsWp().then(function (teamAllList) {
                PilgrimRoomTablesMembers.getPilgrimsWp().then(function (pilgrimAllList) {
                var usedIDs = [];
                // go over team list and look for room number

                    // if no room number just list person put in usedIDs
                    // if room number present then
                        // go over pilgrim list and see if room number is there
                            // if room number there then check for room mate 1 empty if otherwise put in room mate 2 put in usedIDs
                // go over pilgrim list in same way listings if not having room number and not used.
                    $scope.teamPeople = [];
                    $scope.pilgrimPeople = [];

                    var teamList = teamAllList.results;
                    var pilgrimList = pilgrimAllList.results;
                for (var tri = 0 ; tri < teamList.length; tri++) {
                    if (isInEastWing(teamList[tri])){
                    var valueOfRoom = [];
                    if (!usedIDs.includes(teamList[tri]._id) && teamList[tri].RoomNumber === '') {
                        valueOfRoom['TeamRoommate'] = teamList[tri]._id;
                        valueOfRoom['PilgrimRoommate1'] = null;
                        valueOfRoom['PilgrimRoommate2'] = null;
                        valueOfRoom['PilgrimRoommate3'] = null;
                        valueOfRoom['RoomNumber'] = '';
                        valueOfRoom['UpDown'] = '';
                        valueOfRoom['Building'] = teamList[tri].Building;
                        usedIDs.push(teamList[tri]._id);
                        var person = {};
                        person.value = teamList[tri].Name;
                        person.key = teamList[tri]._id;
                        $scope.teamPeople.push(person);
                    } else {
                        valueOfRoom['TeamRoommate'] = teamList[tri]._id;
                        valueOfRoom['PilgrimRoommate1'] = null;
                        valueOfRoom['PilgrimRoommate2'] = null;
                        valueOfRoom['PilgrimRoommate3'] = null;
                        valueOfRoom['RoomNumber'] = teamList[tri].RoomNumber;
                        valueOfRoom['UpDown'] = translateUpDown(teamList[tri].RoomNumber);
                        valueOfRoom['Building'] = teamList[tri].Building;

                        for (var pri = 0; pri < pilgrimList.length; pri++) {
                            if (!usedIDs.includes(pilgrimList[pri]._id) && pilgrimList[pri].RoomNumber == teamList[tri].RoomNumber) {
                                if (!valueOfRoom['PilgrimRoommate1']) {
                                    valueOfRoom['PilgrimRoommate1'] = pilgrimList[pri]._id;
                                } else if (!valueOfRoom['PilgrimRoommate2']) {
                                    valueOfRoom['PilgrimRoommate2'] = pilgrimList[pri]._id;
                                } else if (!valueOfRoom['PilgrimRoommate3']) {
                                    valueOfRoom['PilgrimRoommate3'] = pilgrimList[pri]._id;
                                }
                                usedIDs.push(pilgrimList[pri]._id);
                            }
                        }
                    }
                    $scope.tableParams.data.push(valueOfRoom);
                }
                }
                for (var tri = 0 ; tri < pilgrimList.length; tri++){
                    var valueOfRoom = [];
                    if (!usedIDs.includes(pilgrimList[tri]._id) && pilgrimList[tri].RoomNumber === '') {
                        valueOfRoom['PilgrimRoommate1'] = pilgrimList[tri]._id;
                        valueOfRoom['TeamRoommate'] = null;
                        valueOfRoom['PilgrimRoommate2'] = null;
                        valueOfRoom['PilgrimRoommate3'] = null;
                        valueOfRoom['RoomNumber'] = '';
                        valueOfRoom['UpDown'] = '';
                        valueOfRoom['Building'] = pilgrimList[tri].Building;
                        var person = {};
                        person.value = pilgrimList[tri].FirstName
                            + ' ' + pilgrimList[tri].LastName
                            + '(' + pilgrimList[tri].Table
                            + ',' + pilgrimList[tri].Age
                            + ',' + pilgrimList[tri].Special
                            + ')';
                        person.key = pilgrimList[tri]._id;
                        $scope.pilgrimPeople.push(person);
                        usedIDs.push(pilgrimList[tri]._id);

                        $scope.tableParams.data.push(valueOfRoom);
                    } else if (!usedIDs.includes(pilgrimList[tri]._id)){
                        valueOfRoom['PilgrimRoommate1'] = pilgrimList[tri]._id;
                        valueOfRoom['TeamRoommate'] = null;
                        valueOfRoom['PilgrimRoommate2'] = null;
                        valueOfRoom['PilgrimRoommate3'] = null;
                        valueOfRoom['RoomNumber'] = pilgrimList[tri].RoomNumber;
                        valueOfRoom['UpDown'] = translateUpDown(pilgrimList[tri].RoomNumber);
                        valueOfRoom['Building'] = pilgrimList[tri].Building;

                        for (var pri = 0; pri < pilgrimList.length; pri++) {
                            if (!usedIDs.includes(pilgrimList[pri]._id) && pilgrimList[pri].RoomNumber == pilgrimList[tri].RoomNumber) {
                                if (!valueOfRoom['PilgrimRoommate1']) {
                                    valueOfRoom['PilgrimRoommate1'] = pilgrimList[pri]._id;
                                } else if (!valueOfRoom['PilgrimRoommate2']) {
                                    valueOfRoom['PilgrimRoommate2'] = pilgrimList[pri]._id ;
                                } else if (!valueOfRoom['PilgrimRoommate3']) {
                                    valueOfRoom['PilgrimRoommate3'] = pilgrimList[pri]._id ;
                                }
                                usedIDs.push(pilgrimList[pri]._id);
                            }
                        }
                        $scope.tableParams.data.push(valueOfRoom);
                    }
                }
            });
            });
        };

        var compareIt = function(arrayD,valueD) {
            for (var z = 0; z < arrayD.length; z++) {
                if (arrayD[z] ===  valueD) {
                    return z;
                }
            }
            return -1;
        };


        $scope.updateAndReload = function(theRow) {
            // $location.path('new-pilgrim-rooms/');
            if ( theRow.TeamRoommate) {
                pushRoomNumberToTeamsTable(theRow.TeamRoommate, theRow.RoomNumber);
            }
            if ( theRow.PilgrimRoommate1) {
                pushRoomNumberToPilgrimsTable(theRow.PilgrimRoommate1, theRow.RoomNumber);
            }
            if ( theRow.PilgrimRoommate2) {
                pushRoomNumberToPilgrimsTable(theRow.PilgrimRoommate2, theRow.RoomNumber);
            }
            if ( theRow.PilgrimRoommate3) {
                pushRoomNumberToPilgrimsTable(theRow.PilgrimRoommate3, theRow.RoomNumber);
            }
            // The logic
            // if team has data
                // check for room mates
                // add the team person to each room mates list as teamroommate unless already don.
            // if r1 has data
                // check for team room mate
                    // has team room mate add to team room mates
            $scope.tableParams.data.length = 0;
            $scope.pullDataFromMains();  // reload whole table...
        };

        // Create new Pilgrim room
        $scope.create = function () {
            var pilgrimRoom = new PilgrimRooms($scope.pilgrimRoom);

            // Redirect after save
            pilgrimRoom.$save(function (response) {
                $location.path('pilgrim-rooms/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Pilgrim room
        $scope.remove = function (pilgrimRoom) {

            if (pilgrimRoom) {
                pilgrimRoom = PilgrimRooms.get({pilgrimRoomId: pilgrimRoom._id}, function () {
                    pilgrimRoom.$remove();
                    $scope.tableParams.reload();
                });

            } else {
                $scope.pilgrimRoom.$remove(function () {
                    $location.path('pilgrimRooms');
                });
            }

        };

        // Update existing Pilgrim room
        $scope.update = function () {
            var pilgrimRoom = $scope.pilgrimRoom;

            pilgrimRoom.$update(function () {
                $location.path('pilgrim-rooms/' + pilgrimRoom._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


        $scope.toViewPilgrimRoom = function () {
            $scope.pilgrimRoom = PilgrimRooms.get({pilgrimRoomId: $stateParams.pilgrimRoomId});
            $scope.setFormFields(true);
        };

        $scope.toEditPilgrimRoom = function () {
            $scope.pilgrimRoom = PilgrimRooms.get({pilgrimRoomId: $stateParams.pilgrimRoomId});
            $scope.setFormFields(false);
        };

    }

]);
