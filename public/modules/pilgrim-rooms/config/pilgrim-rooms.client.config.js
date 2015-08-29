'use strict';

// Configuring the new module
angular.module('pilgrim-rooms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pilgrim Rms', 'pilgrim-rooms', 'dropdown', '/pilgrim-rooms(/create)?');
		Menus.addSubMenuItem('topbar', 'pilgrim-rooms', 'List Pilgrim rooms', 'pilgrim-rooms');
		Menus.addSubMenuItem('topbar', 'pilgrim-rooms', 'New Pilgrim room', 'pilgrim-rooms/create');
	}
]);
