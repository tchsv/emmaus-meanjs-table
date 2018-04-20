'use strict';

// Conf room tables controller
/* @ngInject */
angular.module('conf-room-tables').controller('ConfRoomTablesController',
    function ($scope, $stateParams, $location,
              Authentication, ConfRoomTables, TableSettings,
              ConfRoomTablesForm, $q, ConfRoomTablesMembers, $resource) {
        $scope.authentication = Authentication;
        $scope.tableParams = TableSettings.getParams(ConfRoomTables);
        $scope.confRoomTable = {};


        $scope.setFormFields = function (disabled) {
            $scope.formFields = ConfRoomTablesForm.getFormFields(disabled);
        };

        $scope.cvsMe = function (tableData) {
            var deferred = $q.defer();
            var reJiggered = [];
            var keysS = [];
            keysS = {
                'Table': 'Table',
                'TableLeader': 'TableLeader',
                'AssistantTableLeader': 'AssistantTableLeader',
                'Pilgrim1': 'Pilgrim1',
                'Pilgrim2': 'Pilgrim2',
                'Pilgrim3': 'Pilgrim3',
                'Pilgrim4': 'Pilgrim4',
                'Pilgrim5': 'Pilgrim5',
                'Pilgrim6': 'Pilgrim6',
                'Pilgrim7': 'Pilgrim7',
                'Pilgrim8': 'Pilgrim8'
            };


            ConfRoomTablesMembers.getTableLeadersWp().then(function (tableLeaderList) {
                ConfRoomTablesMembers.getAssistantTableLeadersWp().then(function (assistantTableLeaderList) {
                    ConfRoomTablesMembers.getPilgrimsWp().then(function (pilgrimList) {
                        for (var i = 0; i < tableData.length; i++) {
                            var reJig = new Object();
                            reJig.Table = tableData[i]['tableName'];
                            reJig.TableLeader = getNameFromList(tableLeaderList, tableData[i]['tableLeader']);
                            reJig.AssistantTableLeader = getNameFromList(assistantTableLeaderList, tableData[i]['assistantTableLeader']);
                            reJig.Pilgrim1 = getNameFromList(pilgrimList, tableData[i]['pilgrim1']);
                            reJig.Pilgrim2 = getNameFromList(pilgrimList, tableData[i]['pilgrim2']);
                            reJig.Pilgrim3 = getNameFromList(pilgrimList, tableData[i]['pilgrim3']);
                            reJig.Pilgrim4 = getNameFromList(pilgrimList, tableData[i]['pilgrim4']);
                            reJig.Pilgrim5 = getNameFromList(pilgrimList, tableData[i]['pilgrim5']);
                            reJig.Pilgrim6 = getNameFromList(pilgrimList, tableData[i]['pilgrim6']);
                            reJig.Pilgrim7 = getNameFromList(pilgrimList, tableData[i]['pilgrim7']);
                            reJig.Pilgrim8 = getNameFromList(pilgrimList, tableData[i]['pilgrim8']);
                            reJiggered.push(reJig);
                        }
                        reJiggered.unshift(keysS);
                        deferred.resolve(reJiggered);

                    });
                });
            });

            return deferred.promise;

        };
        $scope.pullDataFromMains =  function(tableData) {
            ConfRoomTablesMembers.getTableLeadersWp().then(function (tableLeaderList) {
                ConfRoomTablesMembers.getAssistantTableLeadersWp().then(function (assistantTableLeaderList) {
                    ConfRoomTablesMembers.getPilgrimsWp().then(function (pilgrimAllList) {
            // PilgrimRoomTablesMembers.getTeamsWp().then(function (teamAllList) {
            //     PilgrimRoomTablesMembers.getPilgrimsWp().then(function (pilgrimAllList) {
                    var usedIDs = [];
                    // go over team list and look for room number

                    // if no room number just list person put in usedIDs
                    // if room number present then
                    // go over pilgrim list and see if room number is there
                    // if room number there then check for room mate 1 empty if otherwise put in room mate 2 put in usedIDs
                    // go over pilgrim list in same way listings if not having room number and not used.
                    $scope.teamPeople = [];
                    $scope.pilgrimPeople = [];

                    var teamTLList = tableLeaderList;
                    var teamATLList = assistantTableLeaderList;
                    var pilgrimList = pilgrimAllList;
                    for (var tri = 0 ; tri < teamTLList.length; tri++) {
                        // if (isInEastWing(teamList[tri])){
                            var valueOfRoom = [];
                            if (!usedIDs.includes(teamTLList[tri]._id) && teamTLList[tri].Table === '') {
                                valueOfRoom['TableLeader'] = teamTLList[tri]._id;
                                valueOfRoom['AssistantTableLeader'] = null;
                                valueOfRoom['Pilgrim1'] = null;
                                valueOfRoom['Pilgrim2'] = null;
                                valueOfRoom['Pilgrim3'] = null;
                                valueOfRoom['Pilgrim4'] = null;
                                valueOfRoom['Pilgrim5'] = null;
                                valueOfRoom['Pilgrim6'] = null;
                                valueOfRoom['Pilgrim7'] = null;
                                valueOfRoom['Pilgrim8'] = null;
                                valueOfRoom['Table'] = '';
                                usedIDs.push(teamTLList[tri]._id);
                                var person = {};
                                person.value = teamTLList[tri].Name;
                                person.key = teamTLList[tri]._id;
                                $scope.teamPeople.push(person);
                            } else {
                                valueOfRoom['TableLeader'] = teamTLList[tri]._id;
                                valueOfRoom['AssistantTableLeader'] = null;
                                valueOfRoom['Pilgrim1'] = null;
                                valueOfRoom['Pilgrim2'] = null;
                                valueOfRoom['Pilgrim3'] = null;
                                valueOfRoom['Pilgrim4'] = null;
                                valueOfRoom['Pilgrim5'] = null;
                                valueOfRoom['Pilgrim6'] = null;
                                valueOfRoom['Pilgrim7'] = null;
                                valueOfRoom['Pilgrim8'] = null;
                                valueOfRoom['Table'] = teamTLList[tri].Table;

                                for (var pri = 0; pri < pilgrimList.length; pri++) {
                                    if (!usedIDs.includes(pilgrimList[pri]._id) && pilgrimList[pri].Table == teamTLList[tri].Table) {
                                        if (!valueOfRoom['Pilgrim1']) {
                                            valueOfRoom['Pilgrim1'] = pilgrimList[pri]._id;
                                        } else if (!valueOfRoom['Pilgrim2']) {
                                            valueOfRoom['Pilgrim2'] = pilgrimList[pri]._id;
                                        } else if (!valueOfRoom['Pilgrim3']) {
                                            valueOfRoom['Pilgrim3'] = pilgrimList[pri]._id;
                                        } else if (!valueOfRoom['Pilgrim4']) {
                                            valueOfRoom['Pilgrim4'] = pilgrimList[pri]._id;
                                        } else if (!valueOfRoom['Pilgrim5']) {
                                            valueOfRoom['Pilgrim5'] = pilgrimList[pri]._id;
                                        } else if (!valueOfRoom['Pilgrim6']) {
                                            valueOfRoom['Pilgrim6'] = pilgrimList[pri]._id;
                                        } else if (!valueOfRoom['Pilgrim7']) {
                                            valueOfRoom['Pilgrim7'] = pilgrimList[pri]._id;
                                        } else if (!valueOfRoom['Pilgrim8']) {
                                            valueOfRoom['Pilgrim8'] = pilgrimList[pri]._id;
                                        }
                                        usedIDs.push(pilgrimList[pri]._id);
                                    }
                                }
                            }
                            $scope.tableParams.data.push(valueOfRoom);
                        // }
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
            });
        };

        $scope.cvsLastDayList = function (tableData) {
            var deferred = $q.defer();
            var reJiggered = [];
            var keysS = [];
            keysS = {
                'Table': 'Table',
                'Name': 'Name',
                'Street_Address': 'Street',
                'City': 'City',
                'State': 'State',
                'Zip': 'Zip',
                'AreaCode': 'AC',
                'Phone': 'Phone',
            };


            ConfRoomTablesMembers.getTableLeadersWp().then(function (tableLeaderList) {
                ConfRoomTablesMembers.getAssistantTableLeadersWp().then(function (assistantTableLeaderList) {
                    ConfRoomTablesMembers.getPilgrimsWp().then(function (pilgrimList) {
                        for (var i = 0; i < tableData.length; i++) {
                            var reJig = new Object();
                            reJig = getNameFromListPlus(tableLeaderList, tableData[i]['tableLeader']);
                            reJiggered.push(reJig);
                            var reJig = new Object();
                            reJig = getNameFromListPlus(assistantTableLeaderList, tableData[i]['assistantTableLeader']);
                            reJiggered.push(reJig);
                            var reJig = new Object();
                            reJig = getNameFromListPlus(pilgrimList, tableData[i]['pilgrim1']);
                            reJiggered.push(reJig);
                            var reJig = new Object();
                            reJig = getNameFromListPlus(pilgrimList, tableData[i]['pilgrim2']);
                            reJiggered.push(reJig);
                            var reJig = new Object();
                            reJig = getNameFromListPlus(pilgrimList, tableData[i]['pilgrim3']);
                            reJiggered.push(reJig);
                            var reJig = new Object();
                            reJig = getNameFromListPlus(pilgrimList, tableData[i]['pilgrim4']);
                            reJiggered.push(reJig);
                            var reJig = new Object();
                            reJig = getNameFromListPlus(pilgrimList, tableData[i]['pilgrim5']);
                            reJiggered.push(reJig);
                            var reJig = new Object();
                            reJig = getNameFromListPlus(pilgrimList, tableData[i]['pilgrim6']);
                            reJiggered.push(reJig);
                            var reJig = new Object();
                            reJiggered.push(reJig);
                            reJig = getNameFromListPlus(pilgrimList, tableData[i]['pilgrim7']);
                            reJiggered.push(reJig);
                            var reJig = new Object();
                            reJig = getNameFromListPlus(pilgrimList, tableData[i]['pilgrim8']);
                            reJiggered.push(reJig);
                        }
                        reJiggered.unshift(keysS);
                        deferred.resolve(reJiggered);

                    });
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
        }

        var getNameFromListPlus = function (list, id) {
            var returnName = Object();
            for (var j = 0; j < list.length; j++) {
                if (id == list[j].value) {
                    //returnName = list[j].name;
                    returnName.Table = list[j]['Table'];
                    returnName.Name = list[j]['name'];
                    returnName.Street_Address = list[j]['Street_Address'];
                    returnName.City = list[j]['City'];
                    returnName.State = list[j]['State'];
                    returnName.Zip = list[j]['Zip'];
                    returnName.AreaCode = list[j]['AreaCode'];
                    returnName.Phone = list[j]['Phone'];

                    break;
                }
            }
            return returnName;
        }

        function pushTableToPilgrimsTable(id, Table) {
            if (id == 'Empty') {
                return;
            }
            var pilgrim1TableGet = $resource('/pilgrims/' + id);
            pilgrim1TableGet.get(function (tableGetValue) {
                tableGetValue.Table = Table;
                var tableUpdate = $resource('/pilgrims/' + id, null,
                    {
                        'update': {method: 'PUT'}
                    });
                tableUpdate.update(tableGetValue);
            });
        }
        function pushTableToTeamsTable(id, Table) {
            if (id == 'Empty') {
                return;
            }
            var teamTableGet = $resource('/whole-team-lists/' + id);
            teamTableGet.get(function (tableGetValue) {
                tableGetValue.Table = Table;
                var tableUpdate = $resource('/whole-team-lists/' + id, null,
                    {
                        'update': {method: 'PUT'}
                    });
                tableUpdate.update(tableGetValue);
            });
        }

        $scope.pushDataToMainTables = function (tableData) {
            for (var i = 0; i < tableData.length; i++) {
                var Table = tableData[i]['tableName'];
                // get from wholelist this tableleader...  change Table value...  update wholelist with this table leader.
                pushTableToTeamsTable( tableData[i]['tableLeader'],Table);
                pushTableToTeamsTable( tableData[i]['assistantTableLeader'],Table);
                pushTableToPilgrimsTable(tableData[i]['pilgrim1'], Table);
                pushTableToPilgrimsTable(tableData[i]['pilgrim2'], Table);
                pushTableToPilgrimsTable(tableData[i]['pilgrim3'], Table);
                pushTableToPilgrimsTable(tableData[i]['pilgrim4'], Table);
                pushTableToPilgrimsTable(tableData[i]['pilgrim5'], Table);
                pushTableToPilgrimsTable(tableData[i]['pilgrim6'], Table);
                pushTableToPilgrimsTable(tableData[i]['pilgrim7'], Table);
                pushTableToPilgrimsTable(tableData[i]['pilgrim8'], Table);
            }

        };
        // Create new Conf room table
        $scope.create = function () {
            var confRoomTable = new ConfRoomTables($scope.confRoomTable);

            // Redirect after save
            confRoomTable.$save(function (response) {
                $location.path('conf-room-tables/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Conf room table
        $scope.remove = function (confRoomTable) {

            if (confRoomTable) {
                confRoomTable = ConfRoomTables.get({confRoomTableId: confRoomTable._id}, function () {
                    confRoomTable.$remove();
                    $scope.tableParams.reload();
                });

            } else {
                $scope.confRoomTable.$remove(function () {
                    $location.path('confRoomTables');
                });
            }

        };

        // Update existing Conf room table
        $scope.update = function () {
            var confRoomTable = $scope.confRoomTable;

            confRoomTable.$update(function () {
                $location.path('conf-room-tables/' + confRoomTable._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


        $scope.toViewConfRoomTable = function () {
            $scope.confRoomTable = ConfRoomTables.get({confRoomTableId: $stateParams.confRoomTableId});
            $scope.setFormFields(true);
        };

        $scope.toEditConfRoomTable = function () {
            $scope.confRoomTable = ConfRoomTables.get({confRoomTableId: $stateParams.confRoomTableId});
            $scope.setFormFields(false);
        };

    }

);
