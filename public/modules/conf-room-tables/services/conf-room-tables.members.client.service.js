'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('conf-room-tables').factory('ConfRoomTablesMembers', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims',
	function( WholeTeamLists, TableSettings, Pilgrims ) {

		var getTableLeaders =  function() {
			var nowWholeList = TableSettings.getParams(WholeTeamLists);
			var returnList = [
				{ 'name':'Bubba', 'value':'Gump'},
				{ 'name':'Bubba1', 'value':'Gump1'},
				{ 'name':'Bubba2', 'value':'Gump2'},
				{ 'name':'Bubba3', 'value':'Gump3'},
				{ 'name':'Bubba4', 'value':'Gump4'},
				{ 'name':'Bubba5', 'value':'Gump5'},
				{ 'name':'Bubba6', 'value':'Gump6'},
			];
			return returnList;
		};
		var getAssistantTableLeaders = function() {
			var nowWholeList = TableSettings.getParams(WholeTeamLists);
			var returnList = [
				{ 'name':'1Bubba', 'value':'1Gump'},
				{ 'name':'2Bubba', 'value':'2Gump'},
				{ 'name':'3Bubba', 'value':'3Gump'},
				{ 'name':'4Bubba', 'value':'4Gump'},
				{ 'name':'5Bubba', 'value':'5Gump'},
				{ 'name':'6Bubba', 'value':'6Gump'},
				{ 'name':'7Bubba', 'value':'7Gump'},
			];
			return returnList;
		};

		var getPilgrims =    function() {
			var nowWholeList = TableSettings.getParams(WholeTeamLists);
			var returnList = [
				{ 'name':'1Bubba', 'value':'1Gump'},
				{ 'name':'2Bubba', 'value':'2Gump'},
				{ 'name':'3Bubba', 'value':'3Gump'},
				{ 'name':'4Bubba', 'value':'4Gump'},
				{ 'name':'5Bubba', 'value':'5Gump'},
				{ 'name':'6Bubba', 'value':'6Gump'},
				{ 'name':'7Bubba', 'value':'7Gump'},
			];
			return returnList;
		};






	}


]);
