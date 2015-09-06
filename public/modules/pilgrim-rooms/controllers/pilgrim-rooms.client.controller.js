'use strict';

// Pilgrim rooms controller
angular.module('pilgrim-rooms').controller('PilgrimRoomsController', ['$scope', '$stateParams', '$location', 'Authentication', 'PilgrimRooms', 'TableSettings', 'PilgrimRoomsForm', 'PilgrimRoomTablesMembers', '$q',
    function ($scope, $stateParams, $location, Authentication, PilgrimRooms, TableSettings, PilgrimRoomsForm, PilgrimRoomTablesMembers, $q) {
        $scope.authentication = Authentication;
        $scope.tableParams = TableSettings.getParams(PilgrimRooms);
        $scope.pilgrimRoom = {};

        $scope.setFormFields = function (disabled) {
            $scope.formFields = PilgrimRoomsForm.getFormFields(disabled);
        };

        $scope.cvsMe7 = function (tableData) {
            var keysS = [];
            angular.forEach(tableData[0], function (value, key) {
                this.push(key);
            }, keysS);
            console.log(keysS);
            tableData.unshift(keysS);
            return (tableData);
        };
        $scope.cvsMe = function (tableData) {
            var deferred = $q.defer();
            var reJiggered = [];
            var keysS = [];
            angular.forEach(tableData[0], function (value, key) {
                this.push(key);
            }, keysS);

            //key: 'TeamRoommate',
            //key: 'PilgrimRoommate1',
            //key: 'PilgrimRoommate2',
            //key: 'PilgrimRoommate3',
            //key: 'RoomNumber',
            //key: 'UpDown',
            //key: 'Building',


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
            });

            //var returnList = [];
            //var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
            //var answer = nowWholeList.get(function() {
            //	for (var i = 0; i < answer.total; i++) {
            //		var value = [];
            //		if (answer.results[i].Building == 'Retreat Center') {
            //			value['name'] = answer.results[i].Name;
            //			value['value'] = answer.results[i]._id;
            //			returnList.push(value);
            //		}
            //	}
            //});
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
