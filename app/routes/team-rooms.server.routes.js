'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var teamRooms = require('../../app/controllers/team-rooms.server.controller');

	// Team rooms Routes
	app.route('/team-rooms')
		.get(teamRooms.list)
		.post(users.requiresLogin, teamRooms.create);

	app.route('/team-rooms/:teamRoomId')
		.get(teamRooms.read)
		.put(users.requiresLogin, teamRooms.hasAuthorization, teamRooms.update)
		.delete(users.requiresLogin, teamRooms.hasAuthorization, teamRooms.delete);

	// Finish by binding the Team room middleware
	app.param('teamRoomId', teamRooms.teamRoomByID);
};
