'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('conf-room-tables')
    .directive('confRoomPilgrimMemberName', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

        //var localTeamMember = 'xyz';

		var link =  function(scope, element, attrs) {
            var returnList = [];
            if (attrs.memberid == 'None') {
                scope.localPilgrim = 'None';
            }
            else {
                var nowWholeList = $resource('/pilgrims/' + attrs.memberid);
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    scope.localPilgrim = answer.FirstName + ' ' + answer.LastName;
                });
            }
		};


        return {
            link: link,
            scope: {

            },
            template: '{{localPilgrim}}',
            restrict: 'E',
        }



	}


]);
