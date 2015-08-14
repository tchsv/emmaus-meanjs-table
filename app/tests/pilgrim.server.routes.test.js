'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Pilgrim = mongoose.model('Pilgrim'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, pilgrim;

/**
 * Pilgrim routes tests
 */
describe('Pilgrim CRUD tests', function() {
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

		// Save a user to the test db and create new Pilgrim
		user.save(function() {
			pilgrim = {
				name: 'Pilgrim Name'
			};

			done();
		});
	});

	it('should be able to save Pilgrim instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pilgrim
				agent.post('/pilgrims')
					.send(pilgrim)
					.expect(200)
					.end(function(pilgrimSaveErr, pilgrimSaveRes) {
						// Handle Pilgrim save error
						if (pilgrimSaveErr) done(pilgrimSaveErr);

						// Get a list of Pilgrims
						agent.get('/pilgrims')
							.end(function(pilgrimsGetErr, pilgrimsGetRes) {
								// Handle Pilgrim save error
								if (pilgrimsGetErr) done(pilgrimsGetErr);

								// Get Pilgrims list
								var pilgrims = pilgrimsGetRes.body;

								// Set assertions
								(pilgrims[0].user._id).should.equal(userId);
								(pilgrims[0].name).should.match('Pilgrim Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pilgrim instance if not logged in', function(done) {
		agent.post('/pilgrims')
			.send(pilgrim)
			.expect(401)
			.end(function(pilgrimSaveErr, pilgrimSaveRes) {
				// Call the assertion callback
				done(pilgrimSaveErr);
			});
	});

	it('should not be able to save Pilgrim instance if no name is provided', function(done) {
		// Invalidate name field
		pilgrim.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pilgrim
				agent.post('/pilgrims')
					.send(pilgrim)
					.expect(400)
					.end(function(pilgrimSaveErr, pilgrimSaveRes) {
						// Set message assertion
						(pilgrimSaveRes.body.message).should.match('Please fill Pilgrim name');
						
						// Handle Pilgrim save error
						done(pilgrimSaveErr);
					});
			});
	});

	it('should be able to update Pilgrim instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pilgrim
				agent.post('/pilgrims')
					.send(pilgrim)
					.expect(200)
					.end(function(pilgrimSaveErr, pilgrimSaveRes) {
						// Handle Pilgrim save error
						if (pilgrimSaveErr) done(pilgrimSaveErr);

						// Update Pilgrim name
						pilgrim.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pilgrim
						agent.put('/pilgrims/' + pilgrimSaveRes.body._id)
							.send(pilgrim)
							.expect(200)
							.end(function(pilgrimUpdateErr, pilgrimUpdateRes) {
								// Handle Pilgrim update error
								if (pilgrimUpdateErr) done(pilgrimUpdateErr);

								// Set assertions
								(pilgrimUpdateRes.body._id).should.equal(pilgrimSaveRes.body._id);
								(pilgrimUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pilgrims if not signed in', function(done) {
		// Create new Pilgrim model instance
		var pilgrimObj = new Pilgrim(pilgrim);

		// Save the Pilgrim
		pilgrimObj.save(function() {
			// Request Pilgrims
			request(app).get('/pilgrims')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pilgrim if not signed in', function(done) {
		// Create new Pilgrim model instance
		var pilgrimObj = new Pilgrim(pilgrim);

		// Save the Pilgrim
		pilgrimObj.save(function() {
			request(app).get('/pilgrims/' + pilgrimObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pilgrim.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pilgrim instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pilgrim
				agent.post('/pilgrims')
					.send(pilgrim)
					.expect(200)
					.end(function(pilgrimSaveErr, pilgrimSaveRes) {
						// Handle Pilgrim save error
						if (pilgrimSaveErr) done(pilgrimSaveErr);

						// Delete existing Pilgrim
						agent.delete('/pilgrims/' + pilgrimSaveRes.body._id)
							.send(pilgrim)
							.expect(200)
							.end(function(pilgrimDeleteErr, pilgrimDeleteRes) {
								// Handle Pilgrim error error
								if (pilgrimDeleteErr) done(pilgrimDeleteErr);

								// Set assertions
								(pilgrimDeleteRes.body._id).should.equal(pilgrimSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pilgrim instance if not signed in', function(done) {
		// Set Pilgrim user 
		pilgrim.user = user;

		// Create new Pilgrim model instance
		var pilgrimObj = new Pilgrim(pilgrim);

		// Save the Pilgrim
		pilgrimObj.save(function() {
			// Try deleting Pilgrim
			request(app).delete('/pilgrims/' + pilgrimObj._id)
			.expect(401)
			.end(function(pilgrimDeleteErr, pilgrimDeleteRes) {
				// Set message assertion
				(pilgrimDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pilgrim error error
				done(pilgrimDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Pilgrim.remove().exec(function(){
				done();
			});	
		});
	});
});
