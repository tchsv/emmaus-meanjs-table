'use strict';

// Configuring the new module
angular.module('pilgrims').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pilgrims', 'pilgrims', 'dropdown', '/pilgrims(/create)?');
		Menus.addSubMenuItem('topbar', 'pilgrims', 'List Pilgrims', 'pilgrims');
		Menus.addSubMenuItem('topbar', 'pilgrims', 'New Pilgrim', 'pilgrims/create');
	}
]);
