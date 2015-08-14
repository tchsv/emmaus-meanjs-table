'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pilgrims = require('../../app/controllers/pilgrims.server.controller');

	// Pilgrims Routes
	app.route('/pilgrims')
		.get(pilgrims.list)
		.post(users.requiresLogin, pilgrims.create);

	app.route('/pilgrims/:pilgrimId')
		.get(pilgrims.read)
		.put(users.requiresLogin, pilgrims.hasAuthorization, pilgrims.update)
		.delete(users.requiresLogin, pilgrims.hasAuthorization, pilgrims.delete);

	// Finish by binding the Pilgrim middleware
	app.param('pilgrimId', pilgrims.pilgrimByID);
};
