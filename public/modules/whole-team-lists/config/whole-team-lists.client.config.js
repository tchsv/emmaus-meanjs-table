'use strict';

// Configuring the new module
angular.module('whole-team-lists').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Whole', 'whole-team-lists', 'button', '/whole-team-lists');
		Menus.addSubMenuItem('topbar', 'whole-team-lists', 'List Whole team lists', 'whole-team-lists');
		Menus.addSubMenuItem('topbar', 'whole-team-lists', 'List Paid team lists', 'paid-team-lists');
		//Menus.addSubMenuItem('topbar', 'whole-team-lists', 'New Whole team list', 'whole-team-lists/create');
		Menus.addMenuItem('topbar', 'Pd.', 'paid-team-lists', 'button', '/paid-team-lists');
		Menus.addMenuItem('topbar', 'Summary RC', 'paid-team-summary-lists', 'button', '/paid-team-summary-lists');
		Menus.addMenuItem('topbar', 'Team2009', 'team-rev2009-lists', 'button', '/team-rev2009-lists');
	}
]);
