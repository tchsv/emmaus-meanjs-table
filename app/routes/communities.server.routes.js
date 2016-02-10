'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var communities = require('../../app/controllers/communities.server.controller');

	// Communities Routes
	app.route('/communities')
		.get(communities.list)
		.post(users.requiresLogin, communities.create);

	app.route('/communities/:communityId')
		.get(communities.read)
		.put(users.requiresLogin, communities.hasAuthorization, communities.update)
		.delete(users.requiresLogin, communities.hasAuthorization, communities.delete);

	// Finish by binding the Community middleware
	app.param('communityId', communities.communityByID);
};
