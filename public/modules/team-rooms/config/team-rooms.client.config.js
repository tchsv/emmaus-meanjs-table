'use strict';

// Configuring the new module
angular.module('team-rooms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Team rooms', 'team-rooms', 'dropdown', '/team-rooms(/create)?');
		Menus.addSubMenuItem('topbar', 'team-rooms', 'List Team rooms', 'team-rooms');
		Menus.addSubMenuItem('topbar', 'team-rooms', 'New Team room', 'team-rooms/create');
	}
]);
