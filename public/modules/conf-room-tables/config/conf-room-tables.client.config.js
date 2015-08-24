'use strict';

// Configuring the new module
angular.module('conf-room-tables').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Conf room tables', 'conf-room-tables', 'dropdown', '/conf-room-tables(/create)?');
		Menus.addSubMenuItem('topbar', 'conf-room-tables', 'List Conf room tables', 'conf-room-tables');
		Menus.addSubMenuItem('topbar', 'conf-room-tables', 'New Conf room table', 'conf-room-tables/create');
	}
]);
