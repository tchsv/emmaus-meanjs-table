'use strict';

// Conf room tables controller
angular.module('conf-room-tables').controller('ConfRoomTablesController', ['$scope', '$stateParams', '$location', 'Authentication'
    , 'ConfRoomTables', 'TableSettings', 'ConfRoomTablesForm', '$q', 'ConfRoomTablesMembers', '$resource',
    function ($scope, $stateParams, $location, Authentication, ConfRoomTables, TableSettings, ConfRoomTablesForm, $q, ConfRoomTablesMembers, $resource) {
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

]);
