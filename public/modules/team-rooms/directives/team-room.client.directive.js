'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('team-rooms')
    .directive('teamRoomTeamMemberName', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

        //var localTeamMember = 'xyz';

		var link =  function(scope, element, attrs) {
            if (!attrs.memberid) {
                scope.localTeamMember = 'empty';
            }
            else if (attrs.memberid == 'empty') {
                scope.localTeamMember = 'empty';
            }
            else {
                var nowWholeList = $resource('/whole-team-lists/' + attrs.memberid);
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    scope.localTeamMember = answer.Name;
                });
            }
		};
        return {
            link: link,
            scope: {

            },
            restrict: 'E',
            template: '{{localTeamMember}}',
        }
	}
]);
