'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('pilgrim-rooms')
    .directive('pilgrimRoomPilgrimMemberName', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

        //var localTeamMember = 'xyz';

		var link =  function(scope, element, attrs) {
            var returnList = [];
            if (!attrs.memberid) {
                scope.localPilgrim = 'Empty';
            }
            else if (attrs.memberid == 'Empty') {
                scope.localPilgrim = 'Empty';
            }
            else {
                var nowWholeList = $resource('/pilgrims/' + attrs.memberid);
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    scope.localPilgrim = answer.FirstName + ' ' + answer.LastName + ' (' + answer.Table + ')';
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
