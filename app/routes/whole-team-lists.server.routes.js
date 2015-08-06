'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var wholeTeamLists = require('../../app/controllers/whole-team-lists.server.controller');

	// Whole team lists Routes
	app.route('/whole-team-lists')
		.get(wholeTeamLists.list)
		.post(users.requiresLogin, wholeTeamLists.create);

	app.route('/whole-team-lists/:wholeTeamListId')
		.get(wholeTeamLists.read)
		.put(users.requiresLogin, wholeTeamLists.hasAuthorization, wholeTeamLists.update)
		.delete(users.requiresLogin, wholeTeamLists.hasAuthorization, wholeTeamLists.delete);

	// Finish by binding the Whole team list middleware
	app.param('wholeTeamListId', wholeTeamLists.wholeTeamListByID);
};
