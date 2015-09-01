'use strict';

// Conf room tables controller
angular.module('conf-room-tables').controller('ConfRoomTablesController', ['$scope', '$stateParams', '$location', 'Authentication', 'ConfRoomTables', 'TableSettings', 'ConfRoomTablesForm',
    function ($scope, $stateParams, $location, Authentication, ConfRoomTables, TableSettings, ConfRoomTablesForm ) {
        $scope.authentication = Authentication;
        $scope.tableParams = TableSettings.getParams(ConfRoomTables);
        $scope.confRoomTable = {};



        $scope.setFormFields = function (disabled) {
            $scope.formFields = ConfRoomTablesForm.getFormFields(disabled);
        };

        $scope.cvsMe = function(tableData) {
            var keysS =[];
            angular.forEach(tableData[0], function(value, key) {
                this.push(key);
            }, keysS);
            console.log(keysS);
            tableData.unshift(keysS);
            return(tableData);
        };
        $scope.pushDataToMainTables = function(tableData) {

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
