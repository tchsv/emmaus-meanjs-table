'use strict';

// Configuring the new module
angular.module('whole-team-lists').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Whole team lists', 'whole-team-lists', 'dropdown', '/whole-team-lists(/create)?');
		Menus.addSubMenuItem('topbar', 'whole-team-lists', 'List Whole team lists', 'whole-team-lists');
		Menus.addSubMenuItem('topbar', 'whole-team-lists', 'List Paid team lists', 'paid-team-lists');
		//Menus.addSubMenuItem('topbar', 'whole-team-lists', 'New Whole team list', 'whole-team-lists/create');
	}
]);
