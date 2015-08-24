'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ConfRoomTable = mongoose.model('ConfRoomTable'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, confRoomTable;

/**
 * Conf room table routes tests
 */
describe('Conf room table CRUD tests', function() {
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

		// Save a user to the test db and create new Conf room table
		user.save(function() {
			confRoomTable = {
				name: 'Conf room table Name'
			};

			done();
		});
	});

	it('should be able to save Conf room table instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Conf room table
				agent.post('/conf-room-tables')
					.send(confRoomTable)
					.expect(200)
					.end(function(confRoomTableSaveErr, confRoomTableSaveRes) {
						// Handle Conf room table save error
						if (confRoomTableSaveErr) done(confRoomTableSaveErr);

						// Get a list of Conf room tables
						agent.get('/conf-room-tables')
							.end(function(confRoomTablesGetErr, confRoomTablesGetRes) {
								// Handle Conf room table save error
								if (confRoomTablesGetErr) done(confRoomTablesGetErr);

								// Get Conf room tables list
								var confRoomTables = confRoomTablesGetRes.body;

								// Set assertions
								(confRoomTables[0].user._id).should.equal(userId);
								(confRoomTables[0].name).should.match('Conf room table Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Conf room table instance if not logged in', function(done) {
		agent.post('/conf-room-tables')
			.send(confRoomTable)
			.expect(401)
			.end(function(confRoomTableSaveErr, confRoomTableSaveRes) {
				// Call the assertion callback
				done(confRoomTableSaveErr);
			});
	});

	it('should not be able to save Conf room table instance if no name is provided', function(done) {
		// Invalidate name field
		confRoomTable.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Conf room table
				agent.post('/conf-room-tables')
					.send(confRoomTable)
					.expect(400)
					.end(function(confRoomTableSaveErr, confRoomTableSaveRes) {
						// Set message assertion
						(confRoomTableSaveRes.body.message).should.match('Please fill Conf room table name');
						
						// Handle Conf room table save error
						done(confRoomTableSaveErr);
					});
			});
	});

	it('should be able to update Conf room table instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Conf room table
				agent.post('/conf-room-tables')
					.send(confRoomTable)
					.expect(200)
					.end(function(confRoomTableSaveErr, confRoomTableSaveRes) {
						// Handle Conf room table save error
						if (confRoomTableSaveErr) done(confRoomTableSaveErr);

						// Update Conf room table name
						confRoomTable.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Conf room table
						agent.put('/conf-room-tables/' + confRoomTableSaveRes.body._id)
							.send(confRoomTable)
							.expect(200)
							.end(function(confRoomTableUpdateErr, confRoomTableUpdateRes) {
								// Handle Conf room table update error
								if (confRoomTableUpdateErr) done(confRoomTableUpdateErr);

								// Set assertions
								(confRoomTableUpdateRes.body._id).should.equal(confRoomTableSaveRes.body._id);
								(confRoomTableUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Conf room tables if not signed in', function(done) {
		// Create new Conf room table model instance
		var confRoomTableObj = new ConfRoomTable(confRoomTable);

		// Save the Conf room table
		confRoomTableObj.save(function() {
			// Request Conf room tables
			request(app).get('/conf-room-tables')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Conf room table if not signed in', function(done) {
		// Create new Conf room table model instance
		var confRoomTableObj = new ConfRoomTable(confRoomTable);

		// Save the Conf room table
		confRoomTableObj.save(function() {
			request(app).get('/conf-room-tables/' + confRoomTableObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', confRoomTable.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Conf room table instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Conf room table
				agent.post('/conf-room-tables')
					.send(confRoomTable)
					.expect(200)
					.end(function(confRoomTableSaveErr, confRoomTableSaveRes) {
						// Handle Conf room table save error
						if (confRoomTableSaveErr) done(confRoomTableSaveErr);

						// Delete existing Conf room table
						agent.delete('/conf-room-tables/' + confRoomTableSaveRes.body._id)
							.send(confRoomTable)
							.expect(200)
							.end(function(confRoomTableDeleteErr, confRoomTableDeleteRes) {
								// Handle Conf room table error error
								if (confRoomTableDeleteErr) done(confRoomTableDeleteErr);

								// Set assertions
								(confRoomTableDeleteRes.body._id).should.equal(confRoomTableSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Conf room table instance if not signed in', function(done) {
		// Set Conf room table user 
		confRoomTable.user = user;

		// Create new Conf room table model instance
		var confRoomTableObj = new ConfRoomTable(confRoomTable);

		// Save the Conf room table
		confRoomTableObj.save(function() {
			// Try deleting Conf room table
			request(app).delete('/conf-room-tables/' + confRoomTableObj._id)
			.expect(401)
			.end(function(confRoomTableDeleteErr, confRoomTableDeleteRes) {
				// Set message assertion
				(confRoomTableDeleteRes.body.message).should.match('User is not logged in');

				// Handle Conf room table error error
				done(confRoomTableDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			ConfRoomTable.remove().exec(function(){
				done();
			});	
		});
	});
});
