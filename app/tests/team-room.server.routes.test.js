'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TeamRoom = mongoose.model('TeamRoom'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, teamRoom;

/**
 * Team room routes tests
 */
describe('Team room CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Team room
		user.save(function() {
			teamRoom = {
				name: 'Team room Name'
			};

			done();
		});
	});

	it('should be able to save Team room instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Team room
				agent.post('/team-rooms')
					.send(teamRoom)
					.expect(200)
					.end(function(teamRoomSaveErr, teamRoomSaveRes) {
						// Handle Team room save error
						if (teamRoomSaveErr) done(teamRoomSaveErr);

						// Get a list of Team rooms
						agent.get('/team-rooms')
							.end(function(teamRoomsGetErr, teamRoomsGetRes) {
								// Handle Team room save error
								if (teamRoomsGetErr) done(teamRoomsGetErr);

								// Get Team rooms list
								var teamRooms = teamRoomsGetRes.body;

								// Set assertions
								(teamRooms[0].user._id).should.equal(userId);
								(teamRooms[0].name).should.match('Team room Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Team room instance if not logged in', function(done) {
		agent.post('/team-rooms')
			.send(teamRoom)
			.expect(401)
			.end(function(teamRoomSaveErr, teamRoomSaveRes) {
				// Call the assertion callback
				done(teamRoomSaveErr);
			});
	});

	it('should not be able to save Team room instance if no name is provided', function(done) {
		// Invalidate name field
		teamRoom.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Team room
				agent.post('/team-rooms')
					.send(teamRoom)
					.expect(400)
					.end(function(teamRoomSaveErr, teamRoomSaveRes) {
						// Set message assertion
						(teamRoomSaveRes.body.message).should.match('Please fill Team room name');
						
						// Handle Team room save error
						done(teamRoomSaveErr);
					});
			});
	});

	it('should be able to update Team room instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Team room
				agent.post('/team-rooms')
					.send(teamRoom)
					.expect(200)
					.end(function(teamRoomSaveErr, teamRoomSaveRes) {
						// Handle Team room save error
						if (teamRoomSaveErr) done(teamRoomSaveErr);

						// Update Team room name
						teamRoom.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Team room
						agent.put('/team-rooms/' + teamRoomSaveRes.body._id)
							.send(teamRoom)
							.expect(200)
							.end(function(teamRoomUpdateErr, teamRoomUpdateRes) {
								// Handle Team room update error
								if (teamRoomUpdateErr) done(teamRoomUpdateErr);

								// Set assertions
								(teamRoomUpdateRes.body._id).should.equal(teamRoomSaveRes.body._id);
								(teamRoomUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Team rooms if not signed in', function(done) {
		// Create new Team room model instance
		var teamRoomObj = new TeamRoom(teamRoom);

		// Save the Team room
		teamRoomObj.save(function() {
			// Request Team rooms
			request(app).get('/team-rooms')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Team room if not signed in', function(done) {
		// Create new Team room model instance
		var teamRoomObj = new TeamRoom(teamRoom);

		// Save the Team room
		teamRoomObj.save(function() {
			request(app).get('/team-rooms/' + teamRoomObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', teamRoom.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Team room instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Team room
				agent.post('/team-rooms')
					.send(teamRoom)
					.expect(200)
					.end(function(teamRoomSaveErr, teamRoomSaveRes) {
						// Handle Team room save error
						if (teamRoomSaveErr) done(teamRoomSaveErr);

						// Delete existing Team room
						agent.delete('/team-rooms/' + teamRoomSaveRes.body._id)
							.send(teamRoom)
							.expect(200)
							.end(function(teamRoomDeleteErr, teamRoomDeleteRes) {
								// Handle Team room error error
								if (teamRoomDeleteErr) done(teamRoomDeleteErr);

								// Set assertions
								(teamRoomDeleteRes.body._id).should.equal(teamRoomSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Team room instance if not signed in', function(done) {
		// Set Team room user 
		teamRoom.user = user;

		// Create new Team room model instance
		var teamRoomObj = new TeamRoom(teamRoom);

		// Save the Team room
		teamRoomObj.save(function() {
			// Try deleting Team room
			request(app).delete('/team-rooms/' + teamRoomObj._id)
			.expect(401)
			.end(function(teamRoomDeleteErr, teamRoomDeleteRes) {
				// Set message assertion
				(teamRoomDeleteRes.body.message).should.match('User is not logged in');

				// Handle Team room error error
				done(teamRoomDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			TeamRoom.remove().exec(function(){
				done();
			});	
		});
	});
});
