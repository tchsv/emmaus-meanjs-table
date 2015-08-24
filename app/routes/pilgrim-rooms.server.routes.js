'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pilgrimRooms = require('../../app/controllers/pilgrim-rooms.server.controller');

	// Pilgrim rooms Routes
	app.route('/pilgrim-rooms')
		.get(pilgrimRooms.list)
		.post(users.requiresLogin, pilgrimRooms.create);

	app.route('/pilgrim-rooms/:pilgrimRoomId')
		.get(pilgrimRooms.read)
		.put(users.requiresLogin, pilgrimRooms.hasAuthorization, pilgrimRooms.update)
		.delete(users.requiresLogin, pilgrimRooms.hasAuthorization, pilgrimRooms.delete);

	// Finish by binding the Pilgrim room middleware
	app.param('pilgrimRoomId', pilgrimRooms.pilgrimRoomByID);
};
