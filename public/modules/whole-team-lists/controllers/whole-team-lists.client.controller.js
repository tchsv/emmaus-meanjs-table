'use strict';

// Whole team lists controller
angular.module('whole-team-lists').controller('WholeTeamListsController', ['$scope', '$stateParams', '$location', 'Authentication', 'WholeTeamLists', 'TableSettings', 'WholeTeamListsForm',
    function ($scope, $stateParams, $location, Authentication, WholeTeamLists, TableSettings, WholeTeamListsForm) {
        $scope.authentication = Authentication;
        $scope.tableParams = TableSettings.getParams(WholeTeamLists);
        $scope.wholeTeamList = {};
        $scope.retreatCenterAll = function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                if ( stuff[i].Building == 'Retreat Center') {
                    sumValue++;
                }
            }
            return sumValue;
        };
        /**
         * Checking for each team member in the Retreat Center that has paid
         * @param stuff
         * @returns {number}
         */
        $scope.retreatCenterPaid= function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                if ( stuff[i].Building == 'Retreat Center') {
                    if (stuff[i].Paid == 'Yes' ){
                    sumValue++;
                }}
            }
            return sumValue;
        };
        $scope.retreatCenterPaidWithRoomMate= function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                var value = stuff[i];
                if ( stuff[i].Building == 'Retreat Center') {
                    if (stuff[i].Paid == 'Yes' ){
                        if (value.Roommate.length != 0) {
                            sumValue++;
                }}}
            }
            return sumValue;
        };
        $scope.retreatCenterPaidWithOutRoomMate= function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                var value = stuff[i];
                if ( stuff[i].Building == 'Retreat Center') {
                    if (stuff[i].Paid == 'Yes' ){
                        if (value.Roommate.length == 0) {
                            sumValue++;
                        }}}

            }
            return sumValue;
        };
        $scope.retreatCenterNeedRoomMate= function(stuff) {
            var sumValue = ' ';
            if (stuff.length == 0 ){
                return ' ';
            }
            for (var i = 0; i < stuff.length; i++) {
                var value = stuff[i];
                if ( stuff[i].Building == 'Retreat Center') {
                    if (stuff[i].Paid == 'Yes' ){
                        if (value.Roommate.length == 0) {
                            sumValue += value.Name + ',';
                        }}}

            }
            return sumValue;
        };
        $scope.totalUnPaid= function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                if ( stuff[i].Paid == 'No') {
                    sumValue++;
                }
            }
            return sumValue;
        };


        $scope.setFormFields = function (disabled) {
            $scope.formFields = WholeTeamListsForm.getFormFields(disabled);
        };


        // Create new Whole team list
        $scope.create = function () {
            var wholeTeamList = new WholeTeamLists($scope.wholeTeamList);

            // Redirect after save
            wholeTeamList.$save(function (response) {
                $location.path('whole-team-lists/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Whole team list
        $scope.remove = function (wholeTeamList) {

            if (wholeTeamList) {
                wholeTeamList = WholeTeamLists.get({wholeTeamListId: wholeTeamList._id}, function () {
                    wholeTeamList.$remove();
                    $scope.tableParams.reload();
                });

            } else {
                $scope.wholeTeamList.$remove(function () {
                    $location.path('wholeTeamLists');
                });
            }

        };

        // Update existing Whole team list
        $scope.update = function () {
            var wholeTeamList = $scope.wholeTeamList;

            wholeTeamList.$update(function () {
                $location.path('whole-team-lists/' + wholeTeamList._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


        $scope.toViewWholeTeamList = function () {
            $scope.wholeTeamList = WholeTeamLists.get({wholeTeamListId: $stateParams.wholeTeamListId});
            $scope.setFormFields(true);
        };

        $scope.toEditWholeTeamList = function () {
            $scope.wholeTeamList = WholeTeamLists.get({wholeTeamListId: $stateParams.wholeTeamListId});
            $scope.setFormFields(false);
        };

    }

]);
