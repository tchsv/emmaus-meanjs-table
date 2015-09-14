'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('conf-room-tables')
    .service('ConfRoomTablesMembers', function () {
    })
    .factory('ConfRoomTablesMembers', ['WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource','$q',
        function (WholeTeamLists, TableSettings, Pilgrims, $resource, $q) {

            var getTableLeaders = function () {
                var returnList = [];
                var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if (answer.results[i].Committee == 'Table Leaders') {
                            value['name'] = answer.results[i].Name;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                    console.log(returnList);
                });
                return returnList;
            };
            var getAssistantTableLeaders = function () {
                var returnList = [];
                var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if (answer.results[i].Committee == 'Asst. Table Ldrs.') {
                            value['name'] = answer.results[i].Name;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                    console.log(returnList);
                });
                return returnList;
            };

            var getPilgrims = function () {
                var returnList = [];
                var nowWholeList = $resource('/pilgrims?count=999&page=1');
                var noneValue = [];
                noneValue['name'] = 'Empty';
                noneValue['value'] = null;
                returnList.push(noneValue);
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        value['name'] = answer.results[i].FirstName + ' ' + answer.results[i].LastName;
                        value['value'] = answer.results[i]._id;
                        returnList.push(value);
                    }
                    console.log(returnList);
                });
                return returnList;
            };


            var getTableLeadersWp = function () {
                var deferred = $q.defer();
                var returnList = [];
                var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function () {
                    console.log('getTableLeadersWp'+answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if (answer.results[i].Committee == 'Table Leaders') {
                            value['name'] = answer.results[i].Name;
                            value['AreaCode'] = answer.results[i].AreaCode;
                            value['Street_Address'] = answer.results[i].Street_Address;
                            value['City'] = answer.results[i].City;
                            value['State'] = answer.results[i].State;
                            value['Zip'] = answer.results[i].Zip;
                            value['Phone'] = answer.results[i].Phone;
                            value['Table'] = answer.results[i].Table;
                            value['value'] = answer.results[i]._id;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                    console.log('getTableLeadersWp'+returnList);
                    deferred.resolve(returnList);

                });
                return deferred.promise;

            };
            var getAssistantTableLeadersWp = function () {
                var deferred = $q.defer();
                var returnList = [];
                var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function () {
                    console.log('getAssistantTableLeadersWp'+answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if (answer.results[i].Committee == 'Asst. Table Ldrs.') {
                            value['name'] = answer.results[i].Name;
                            value['AreaCode'] = answer.results[i].AreaCode;
                            value['Street_Address'] = answer.results[i].Street_Address;
                            value['City'] = answer.results[i].City;
                            value['State'] = answer.results[i].State;
                            value['Zip'] = answer.results[i].Zip;
                            value['Phone'] = answer.results[i].Phone;
                            value['Table'] = answer.results[i].Table;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                    console.log('getAssistantTableLeadersWp'+returnList);
                    deferred.resolve(returnList);

                });
                return deferred.promise;

            };

            var getPilgrimsWp = function () {
                var deferred = $q.defer();
                var returnList = [];
                var nowWholeList = $resource('/pilgrims?count=999&page=1');
                var noneValue = [];
                noneValue['name'] = 'Empty';
                noneValue['value'] = 'Empty';
                returnList.push(noneValue);
                var answer = nowWholeList.get(function () {
                    console.log('getPilgrimsWp'+answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        value['name'] = answer.results[i].FirstName + ' ' + answer.results[i].LastName;
                        value['AreaCode'] = answer.results[i].AreaCode;
                        value['Street_Address'] = answer.results[i].Street_Address;
                        value['City'] = answer.results[i].City;
                        value['State'] = answer.results[i].State;
                        value['Zip'] = answer.results[i].Zip;
                        value['Phone'] = answer.results[i].Phone;
                        value['Table'] = answer.results[i].Table;

                        value['value'] = answer.results[i]._id;
                        returnList.push(value);
                    }
                    console.log('getPilgrimsWp'+returnList);
                    deferred.resolve(returnList);

                });
                return deferred.promise;

            };


            return {
                getTableLeaders: getTableLeaders,
                getAssistantTableLeaders: getAssistantTableLeaders,
                getPilgrims: getPilgrims,
                getTableLeadersWp: getTableLeadersWp,
                getAssistantTableLeadersWp: getAssistantTableLeadersWp,
                getPilgrimsWp: getPilgrimsWp
            }


        }


    ]);
