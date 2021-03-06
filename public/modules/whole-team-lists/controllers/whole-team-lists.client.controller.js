'use strict';

// Whole team lists controller
angular.module('whole-team-lists')
    .controller('WholeTeamListsController',
        ['$scope', '$stateParams'
            , '$location', 'Authentication'
            , 'WholeTeamLists', 'TableSettings'
            , 'WholeTeamListsForm', 'formlyConfig',
    function ($scope, $stateParams, $location, Authentication, WholeTeamLists, TableSettings, WholeTeamListsForm, formlyConfig, formlyBootstrap) {
        $scope.authentication = Authentication;
        $scope.tableParams = TableSettings.getParams(WholeTeamLists);
        $scope.wholeTeamList = {};
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


        $scope.perBuildingTotals = function (stuff) {
            var runningTotals = {};
            for (var i = 0; i < stuff.length; i++) {
                if (runningTotals) {
                    if (runningTotals[stuff[i].Building]) {
                        runningTotals[stuff[i].Building]++
                    } else {
                        runningTotals[stuff[i].Building] = 1;
                    }
                } else {
                    runningTotals[stuff[i].Building] = 1;
                }
            }
            // var keys = Object.keys(runningTotals);
            // var stayingInCount = '';
            // for (var key = 0; key < keys.length; key++) {
            //
            // }

            return JSON.stringify(runningTotals);
        };

        $scope.retreatCenterAll = function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                if ( isTeamBuilding(stuff[i].Building)) {
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
                if ( isTeamBuilding(stuff[i].Building)) {
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
                if ( isTeamBuilding(stuff[i].Building)) {
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
                if ( isTeamBuilding(stuff[i].Building)) {
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
                if ( isTeamBuilding(stuff[i].Building)) {
                    if (stuff[i].Paid == 'Yes' ){
                        if (value.Roommate.length == 0) {
                            sumValue += value.Name + ',';
                        }}}

            }
            return sumValue;
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



        $scope.cvsMe2009 = function(tableData) {
            var returnData = [];
            var keysS = Object();
            keysS.LastName='LastName';
            keysS.FirstName='FirstName';
            keysS.AreaCode='AC';
            keysS.Phone='Phone';
            keysS.Street_Address='Street_Address';
            keysS.City='City';
            keysS.State='State';
            keysS.Zip='Zip';
            keysS.OrignalWalkNumber='Orignal Walk Number';
            keysS.ComboArea = 'Talk Given Or Area of Service On Walk';
                //,{'Committee': 'Committee'}
                //,{'Chairperson': 'Chairperson'}
                //,{'Talk': 'Talk'}


            for(var i = 0; i < tableData.length; i++) {
                var jig = Object();
                jig.LastName = tableData[i].LastName;
                jig.FirstName = tableData[i].FirstName;
                jig.AreaCode = tableData[i].AreaCode;
                jig.Phone = tableData[i].Phone;
                jig.Street_Address = tableData[i].Street_Address;
                jig.City = tableData[i].City;
                jig.State = tableData[i].State;
                jig.Zip = tableData[i].Zip;
                jig.OrignalWalkNumber = tableData[i].OrignalWalkNumber;
                jig.ComboArea = '';
                if ( tableData[i].Chairperson == 'Yes'){
                    jig.ComboArea += 'Chair';
                }
                jig.ComboArea += ' ' + tableData[i].Committee;
                jig.ComboArea += '; ' + tableData[i].Talk;
                returnData.push(jig);
            }

            returnData.unshift(keysS);
            return(returnData);
        };

        /**
         * rm1, rm2, bld, paid amount
         * @param tableData
         * @returns {Array}
         */
        $scope.cvsTeamRoomMatesPaidAmount = function(tableData) {
            var returnData = [];


                var keysS = Object();
            keysS.LastName='LastName';
            keysS.FirstName='FirstName';
            keysS.PaidAmount='PaidAmount';
            keysS.Roommate='Roommate';
            keysS.Building='Building';
            keysS.Committee='Committee';
            keysS.Notes='Notes';

            for(var i = 0; i < tableData.length; i++) {
                if (isTeamBuilding(tableData[i].Building)) {
                    var jig = Object();
                    jig.LastName = tableData[i].LastName;
                    jig.FirstName = tableData[i].FirstName;
                    jig.PaidAmount = tableData[i].PaidAmount;
                    jig.Roommate = $scope.needRoomMate(tableData,tableData[i].Roommate);
                    jig.Building = tableData[i].Building;
                    jig.Committee = tableData[i].Committee;
                    jig.Notes = tableData[i].Notes;
                    returnData.push(jig);
                }
            }

            returnData.unshift(keysS);
            return(returnData);
        };


        $scope.cvsTeamPaidMeeting = function(tableData) {
            var returnData = [];
            var keysS = Object();
            keysS.LastName='LastName';
            keysS.FirstName='FirstName';
            keysS.Paid='Paid';
            keysS.PaidAmount='PaidAmount';
            keysS.CheckNumber='CheckNumber';
            keysS.Notes='Notes';

            for(var i = 0; i < tableData.length; i++) {
                var jig = Object();
                jig.LastName = tableData[i].LastName;
                jig.FirstName = tableData[i].FirstName;
                jig.Paid = tableData[i].Paid;
                jig.PaidAmount = tableData[i].PaidAmount;
                jig.CheckNumber = tableData[i].CheckNumber;
                jig.Notes = tableData[i].Notes;
                returnData.push(jig);
            }

            returnData.unshift(keysS);
            return(returnData);
        };
        $scope.cvsTeamMeeting = function(tableData) {
            var returnData = [];
            var keysS = Object();
            keysS.LastName='LastName';
            keysS.FirstName='FirstName';
            keysS.Email='Email';
            keysS.AreaCode='AC';
            keysS.Phone='Phone';
            keysS.Street_Address='Street_Address';
            keysS.City='City';
            keysS.State='State';
            keysS.Zip='Zip';
            keysS.OrignalWalkNumber='Orignal Walk Number';
            keysS.ComboArea = 'Talk Given Or Area of Service On Walk';
                //,{'Committee': 'Committee'}
                //,{'Chairperson': 'Chairperson'}
                //,{'Talk': 'Talk'}


            for(var i = 0; i < tableData.length; i++) {
                var jig = Object();
                jig.LastName = tableData[i].LastName;
                jig.FirstName = tableData[i].FirstName;
                jig.Email = tableData[i].Email;
                jig.AreaCode = tableData[i].AreaCode;
                jig.Phone = tableData[i].Phone;
                jig.Street_Address = tableData[i].Street_Address;
                jig.City = tableData[i].City;
                jig.State = tableData[i].State;
                jig.Zip = tableData[i].Zip;
                jig.OrignalWalkNumber = tableData[i].OrignalWalkNumber;
                jig.ComboArea = '';
                if ( tableData[i].Chairperson == 'Yes'){
                    jig.ComboArea += 'Chair';
                }
                jig.ComboArea += ' ' + tableData[i].Committee;
                if (tableData[i].Talk !== 'N/A') {
                    jig.ComboArea += '; ' + tableData[i].Talk;
                }
                returnData.push(jig);
            }

            returnData.unshift(keysS);
            return(returnData);
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
        $scope.totalCash= function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                if ( stuff[i].PaidCash) {
                    sumValue += stuff[i].PaidCash
                }
                else if ( stuff[i].CheckNumber == 0) {
                    sumValue += stuff[i].PaidAmount;
                }
            }
            return sumValue;
        };
        $scope.totalCheck= function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                if ( stuff[i].CheckNumber != 0) {
                    sumValue += stuff[i].PaidAmount;
                }
            }
            return sumValue;
        };
        $scope.totalGrand= function(stuff) {
            var sumValue =0;

            if (stuff.length == 0 ){
                return 0;
            }

            for (var i = 0; i < stuff.length; i++) {
                var current = stuff[i];
                if (!current.CheckNumber) {

                 if ( current.CheckNumber === '0') {
                    console.log('was cash')
                } else {

                 }

                } else {
                    console.log('was also cash');
                }
            }

            for (var i = 0; i < stuff.length; i++) {
                if (stuff[i].PaidAmount)
                    sumValue += stuff[i].PaidAmount;
                if (stuff[i].PaidCash)
                    sumValue += stuff[i].PaidCash;
                // console.log('i:' + i + ' total:' + sumValue + ' thisone:' + stuff[i].PaidAmount);
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
            // $scope.bubbaGump = TableSettings.getParams(WholeTeamLists);
            $scope.bubbaGump = 'this is a test';
            $scope.setFormFields(false);
        };

        $scope.needRoomMate = function(wholeTeamList, roomMateID) {
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

    }

]);
