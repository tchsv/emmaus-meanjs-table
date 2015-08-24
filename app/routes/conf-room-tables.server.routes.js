'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var confRoomTables = require('../../app/controllers/conf-room-tables.server.controller');

	// Conf room tables Routes
	app.route('/conf-room-tables')
		.get(confRoomTables.list)
		.post(users.requiresLogin, confRoomTables.create);

	app.route('/conf-room-tables/:confRoomTableId')
		.get(confRoomTables.read)
		.put(users.requiresLogin, confRoomTables.hasAuthorization, confRoomTables.update)
		.delete(users.requiresLogin, confRoomTables.hasAuthorization, confRoomTables.delete);

	// Finish by binding the Conf room table middleware
	app.param('confRoomTableId', confRoomTables.confRoomTableByID);
};
