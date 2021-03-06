'use strict';

/* @ngInject */
angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$window', '$resource',
    function ($scope, Authentication, $window, $resource) {
        // This provides Authentication context.
        $scope.authentication = Authentication;


        $scope.refreshPilgrimDataFromExcel = function () {
            var reader = new FileReader();
            var file = document.querySelector('input[type=file]').files[0];
            if (file.name) {
                var name = file.name;
            } else {
                return;
            }
//            var xlsFile = $window.XLSX.readFile(name);

            var data;
            reader.onloadend = function () {
                data = reader.result;
                var workbook = $window.XLSX.read(data, {type: 'binary'});

                /* DO SOMETHING WITH workbook HERE */
                var first_sheet_name = workbook.SheetNames[0];
                /* Get worksheet */
                var worksheet = workbook.Sheets[first_sheet_name];

                var headerIs = [];
                //var address_of_cell = 'A';
                var oddStuff = $window.XLSX.utils.sheet_to_json(worksheet);

                var nowWholeList = $resource('/pilgrims?count=999&page=1');
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    if (answer.total === 0) {
                        for (var j = 0; j < oddStuff.length; j++) {
                            currentRow = {};
                            var newRow = oddStuff[j];
                            var update = false;
                            var keys = Object.keys(newRow);
                            for (var k = 0; k < keys.length; k++) {
                                var nR = newRow[keys[k]];
                                nR = nR.trim();
                                currentRow[keys[k]] = nR;
                                update = true;
                            }
                            if (update) {
                                console.log("updated row:" + JSON.stringify(currentRow));
                                currentRow.Building = 'Main-Lodge-East-Wing'
                                if (!currentRow.City_State_Zip) {
                                    currentRow.City_State_Zip = currentRow.City + ' ' + currentRow.State + ' ' + currentRow.Zip;
                                }
                                if (!currentRow.Room_Mate1) {
                                    currentRow.Room_Mate1 = null;
                                }
                                if (!currentRow.Room_Mate2) {
                                    currentRow.Room_Mate2 = null;
                                }
                                if (!currentRow.Room_Mate3) {
                                    currentRow.Room_Mate3 = null;
                                }
                                var holeList = $resource('/pilgrims/' , null,
                                    {
                                        'set': {method: 'POST'}
                                    });
                                holeList.set(currentRow);

                            }
                        }

                    }
                    else {



                        for (var i = 0; i < answer.total; i++) {

                            /**
                             * Now check for each row....  search the worksheet the the First and Last name....
                             * @type {Array}
                             */
                            var currentRow = answer.results[i];
                        for (var j = 0; j < oddStuff.length; j++) {
                            if (currentRow.LastName.trim() == oddStuff[j].LastName.trim()) {
                                if (currentRow.FirstName.trim() == oddStuff[j].FirstName.trim()) {
                                    var newRow = oddStuff[j];
                                    var update = false;
                                    var keys = Object.keys(newRow);
                                        for ( var k = 0 ; k < keys.length; k++) {
                                        var nR = newRow[keys[k]];
                                        nR = nR.trim();
                                        var cR = currentRow[keys[k]];
                                        if (cR) {
                                            cR = cR.trim();
                                        }
                                            if ( nR != cR ) {
                                            currentRow[keys[k]] = nR;
                                            update = true;
                                        }
                                    }
                                        if ( update ) {
                                        console.log("updated row:" + JSON.stringify(currentRow));
                                            if(!currentRow.Room_Mate1) {
                                            currentRow.Room_Mate1 = null;
                                        }
                                            if(!currentRow.Room_Mate2) {
                                            currentRow.Room_Mate2 = null;
                                        }
                                            if(!currentRow.Room_Mate3) {
                                            currentRow.Room_Mate3 = null;
                                        }
                                        var holeList = $resource('/pilgrims/' + currentRow._id, null,
                                            {
                                                    'update': { method:'PUT' }
                                            });
                                        holeList.update(currentRow);

                                    }
                                }
                            }
                        }
                        }
                    }
                });


            };

            //reader.re
            reader.readAsBinaryString(file);

        }
        $scope.refreshTeamDataFromExcel = function () {
            var reader = new FileReader();
            var file = document.querySelector('input[type=file]').files[0];
            if (file.name) {
                var name = file.name;
            } else {
                return;
            }
//            var xlsFile = $window.XLSX.readFile(name);

            var data;
            reader.onloadend = function () {
                data = reader.result;
                var workbook = $window.XLSX.read(data, {type: 'binary'});

                /* DO SOMETHING WITH workbook HERE */
                var first_sheet_name = workbook.SheetNames[0];
                /* Get worksheet */
                var worksheet = workbook.Sheets[first_sheet_name];

                var headerIs = [];
                //var address_of_cell = 'A';
                var oddStuff = $window.XLSX.utils.sheet_to_json(worksheet);

                var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    if (answer.total === 0) {  // the response from the database is zero no records.
                        // This is a new team totally clean...
                        for (var j = 0; j < oddStuff.length; j++) {
                            var newRow = oddStuff[j];
                            console.log("updated row:" + JSON.stringify(newRow,null, 1));
                            if (!newRow.Room_Mate1) {
                                newRow.Room_Mate1 = null;
                            }
                            if (!newRow.Room_Mate2) {
                                newRow.Room_Mate2 = null;
                            }
                            if (!newRow.Room_Mate3) {
                                newRow.Room_Mate3 = null;
                            }
                            newRow.Name = newRow.FirstName + " " + newRow.LastName;
                            var holeList = $resource('/whole-team-lists/', null,
                                {
                                    'update': {method: 'POST'}
                                });
                            holeList.update(newRow);
                        }
                    }
                    else {
                        for (var i = 0; i < answer.total; i++) {

                            /**
                             * Now check for each row....  search the worksheet the the First and Last name....
                             * @type {Array}
                             */
                            var currentRow = answer.results[i];
                            var foundTeamMember = false;  // passed in data and database have the member if this is true;
                            for (var j = 0; j < oddStuff.length; j++) {
                                var needName = false;
                                if (!oddStuff[j].Name) {
                                    oddStuff[j].Name = oddStuff[j].FirstName + " " + oddStuff[j].LastName;
                                    needName = true;
                                }
                                if (currentRow.Name.trim() == oddStuff[j].Name.trim()) {
                                    var newRow = oddStuff[j];
                                    var update = false;
                                    var keys = Object.keys(newRow);
                                    for (var k = 0; k < keys.length; k++) {
                                        var nR = newRow[keys[k]];
                                        nR = nR.trim();
                                        var cR = currentRow[keys[k]];
                                        if (cR) {
                                            if (typeof cR === 'string' ) {
                                                cR = cR.trim();
                                            }
                                        }
                                        if (nR != cR) {
                                            currentRow[keys[k]] = nR;
                                            update = true;
                                        }
                                    }
                                    if (update || needName) {
                                        console.log("updated row:" + JSON.stringify(currentRow));
                                        if (!currentRow.Room_Mate1) {
                                            currentRow.Room_Mate1 = null;
                                        }
                                        if (!currentRow.Room_Mate2) {
                                            currentRow.Room_Mate2 = null;
                                        }
                                        if (!currentRow.Room_Mate3) {
                                            currentRow.Room_Mate3 = null;
                                        }
                                        var holeList = $resource('/whole-team-lists/' + currentRow._id, null,
                                            {
                                                'update': {method: 'PUT'}
                                            });
                                        holeList.update(currentRow);

                                    }
                                }
                            }
                        }
                    }
                });

            };

            //reader.re
            reader.readAsBinaryString(file);

        }


    }]
);
