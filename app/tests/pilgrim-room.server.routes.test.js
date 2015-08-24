'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PilgrimRoom = mongoose.model('PilgrimRoom'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, pilgrimRoom;

/**
 * Pilgrim room routes tests
 */
describe('Pilgrim room CRUD tests', function() {
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

		// Save a user to the test db and create new Pilgrim room
		user.save(function() {
			pilgrimRoom = {
				name: 'Pilgrim room Name'
			};

			done();
		});
	});

	it('should be able to save Pilgrim room instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pilgrim room
				agent.post('/pilgrim-rooms')
					.send(pilgrimRoom)
					.expect(200)
					.end(function(pilgrimRoomSaveErr, pilgrimRoomSaveRes) {
						// Handle Pilgrim room save error
						if (pilgrimRoomSaveErr) done(pilgrimRoomSaveErr);

						// Get a list of Pilgrim rooms
						agent.get('/pilgrim-rooms')
							.end(function(pilgrimRoomsGetErr, pilgrimRoomsGetRes) {
								// Handle Pilgrim room save error
								if (pilgrimRoomsGetErr) done(pilgrimRoomsGetErr);

								// Get Pilgrim rooms list
								var pilgrimRooms = pilgrimRoomsGetRes.body;

								// Set assertions
								(pilgrimRooms[0].user._id).should.equal(userId);
								(pilgrimRooms[0].name).should.match('Pilgrim room Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pilgrim room instance if not logged in', function(done) {
		agent.post('/pilgrim-rooms')
			.send(pilgrimRoom)
			.expect(401)
			.end(function(pilgrimRoomSaveErr, pilgrimRoomSaveRes) {
				// Call the assertion callback
				done(pilgrimRoomSaveErr);
			});
	});

	it('should not be able to save Pilgrim room instance if no name is provided', function(done) {
		// Invalidate name field
		pilgrimRoom.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pilgrim room
				agent.post('/pilgrim-rooms')
					.send(pilgrimRoom)
					.expect(400)
					.end(function(pilgrimRoomSaveErr, pilgrimRoomSaveRes) {
						// Set message assertion
						(pilgrimRoomSaveRes.body.message).should.match('Please fill Pilgrim room name');
						
						// Handle Pilgrim room save error
						done(pilgrimRoomSaveErr);
					});
			});
	});

	it('should be able to update Pilgrim room instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pilgrim room
				agent.post('/pilgrim-rooms')
					.send(pilgrimRoom)
					.expect(200)
					.end(function(pilgrimRoomSaveErr, pilgrimRoomSaveRes) {
						// Handle Pilgrim room save error
						if (pilgrimRoomSaveErr) done(pilgrimRoomSaveErr);

						// Update Pilgrim room name
						pilgrimRoom.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pilgrim room
						agent.put('/pilgrim-rooms/' + pilgrimRoomSaveRes.body._id)
							.send(pilgrimRoom)
							.expect(200)
							.end(function(pilgrimRoomUpdateErr, pilgrimRoomUpdateRes) {
								// Handle Pilgrim room update error
								if (pilgrimRoomUpdateErr) done(pilgrimRoomUpdateErr);

								// Set assertions
								(pilgrimRoomUpdateRes.body._id).should.equal(pilgrimRoomSaveRes.body._id);
								(pilgrimRoomUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pilgrim rooms if not signed in', function(done) {
		// Create new Pilgrim room model instance
		var pilgrimRoomObj = new PilgrimRoom(pilgrimRoom);

		// Save the Pilgrim room
		pilgrimRoomObj.save(function() {
			// Request Pilgrim rooms
			request(app).get('/pilgrim-rooms')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pilgrim room if not signed in', function(done) {
		// Create new Pilgrim room model instance
		var pilgrimRoomObj = new PilgrimRoom(pilgrimRoom);

		// Save the Pilgrim room
		pilgrimRoomObj.save(function() {
			request(app).get('/pilgrim-rooms/' + pilgrimRoomObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pilgrimRoom.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pilgrim room instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pilgrim room
				agent.post('/pilgrim-rooms')
					.send(pilgrimRoom)
					.expect(200)
					.end(function(pilgrimRoomSaveErr, pilgrimRoomSaveRes) {
						// Handle Pilgrim room save error
						if (pilgrimRoomSaveErr) done(pilgrimRoomSaveErr);

						// Delete existing Pilgrim room
						agent.delete('/pilgrim-rooms/' + pilgrimRoomSaveRes.body._id)
							.send(pilgrimRoom)
							.expect(200)
							.end(function(pilgrimRoomDeleteErr, pilgrimRoomDeleteRes) {
								// Handle Pilgrim room error error
								if (pilgrimRoomDeleteErr) done(pilgrimRoomDeleteErr);

								// Set assertions
								(pilgrimRoomDeleteRes.body._id).should.equal(pilgrimRoomSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pilgrim room instance if not signed in', function(done) {
		// Set Pilgrim room user 
		pilgrimRoom.user = user;

		// Create new Pilgrim room model instance
		var pilgrimRoomObj = new PilgrimRoom(pilgrimRoom);

		// Save the Pilgrim room
		pilgrimRoomObj.save(function() {
			// Try deleting Pilgrim room
			request(app).delete('/pilgrim-rooms/' + pilgrimRoomObj._id)
			.expect(401)
			.end(function(pilgrimRoomDeleteErr, pilgrimRoomDeleteRes) {
				// Set message assertion
				(pilgrimRoomDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pilgrim room error error
				done(pilgrimRoomDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			PilgrimRoom.remove().exec(function(){
				done();
			});	
		});
	});
});
