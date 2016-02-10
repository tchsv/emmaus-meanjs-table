'use strict';

// Configuring the new module
angular.module('communities').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//TODO:  fix community menu
		Menus.addMenuItem('topbar', 'Communities', 'communities', 'dropdown', '/communities(/create)?');
		Menus.addSubMenuItem('topbar', 'communities', 'List Communities', 'communities');
		Menus.addSubMenuItem('topbar', 'communities', 'New Community', 'communities/create');
	}
]);
