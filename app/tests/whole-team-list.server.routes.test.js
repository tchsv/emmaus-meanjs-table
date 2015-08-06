'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	WholeTeamList = mongoose.model('WholeTeamList'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, wholeTeamList;

/**
 * Whole team list routes tests
 */
describe('Whole team list CRUD tests', function() {
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

		// Save a user to the test db and create new Whole team list
		user.save(function() {
			wholeTeamList = {
				name: 'Whole team list Name'
			};

			done();
		});
	});

	it('should be able to save Whole team list instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Whole team list
				agent.post('/whole-team-lists')
					.send(wholeTeamList)
					.expect(200)
					.end(function(wholeTeamListSaveErr, wholeTeamListSaveRes) {
						// Handle Whole team list save error
						if (wholeTeamListSaveErr) done(wholeTeamListSaveErr);

						// Get a list of Whole team lists
						agent.get('/whole-team-lists')
							.end(function(wholeTeamListsGetErr, wholeTeamListsGetRes) {
								// Handle Whole team list save error
								if (wholeTeamListsGetErr) done(wholeTeamListsGetErr);

								// Get Whole team lists list
								var wholeTeamLists = wholeTeamListsGetRes.body;

								// Set assertions
								(wholeTeamLists[0].user._id).should.equal(userId);
								(wholeTeamLists[0].name).should.match('Whole team list Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Whole team list instance if not logged in', function(done) {
		agent.post('/whole-team-lists')
			.send(wholeTeamList)
			.expect(401)
			.end(function(wholeTeamListSaveErr, wholeTeamListSaveRes) {
				// Call the assertion callback
				done(wholeTeamListSaveErr);
			});
	});

	it('should not be able to save Whole team list instance if no name is provided', function(done) {
		// Invalidate name field
		wholeTeamList.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Whole team list
				agent.post('/whole-team-lists')
					.send(wholeTeamList)
					.expect(400)
					.end(function(wholeTeamListSaveErr, wholeTeamListSaveRes) {
						// Set message assertion
						(wholeTeamListSaveRes.body.message).should.match('Please fill Whole team list name');
						
						// Handle Whole team list save error
						done(wholeTeamListSaveErr);
					});
			});
	});

	it('should be able to update Whole team list instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Whole team list
				agent.post('/whole-team-lists')
					.send(wholeTeamList)
					.expect(200)
					.end(function(wholeTeamListSaveErr, wholeTeamListSaveRes) {
						// Handle Whole team list save error
						if (wholeTeamListSaveErr) done(wholeTeamListSaveErr);

						// Update Whole team list name
						wholeTeamList.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Whole team list
						agent.put('/whole-team-lists/' + wholeTeamListSaveRes.body._id)
							.send(wholeTeamList)
							.expect(200)
							.end(function(wholeTeamListUpdateErr, wholeTeamListUpdateRes) {
								// Handle Whole team list update error
								if (wholeTeamListUpdateErr) done(wholeTeamListUpdateErr);

								// Set assertions
								(wholeTeamListUpdateRes.body._id).should.equal(wholeTeamListSaveRes.body._id);
								(wholeTeamListUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Whole team lists if not signed in', function(done) {
		// Create new Whole team list model instance
		var wholeTeamListObj = new WholeTeamList(wholeTeamList);

		// Save the Whole team list
		wholeTeamListObj.save(function() {
			// Request Whole team lists
			request(app).get('/whole-team-lists')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Whole team list if not signed in', function(done) {
		// Create new Whole team list model instance
		var wholeTeamListObj = new WholeTeamList(wholeTeamList);

		// Save the Whole team list
		wholeTeamListObj.save(function() {
			request(app).get('/whole-team-lists/' + wholeTeamListObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', wholeTeamList.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Whole team list instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Whole team list
				agent.post('/whole-team-lists')
					.send(wholeTeamList)
					.expect(200)
					.end(function(wholeTeamListSaveErr, wholeTeamListSaveRes) {
						// Handle Whole team list save error
						if (wholeTeamListSaveErr) done(wholeTeamListSaveErr);

						// Delete existing Whole team list
						agent.delete('/whole-team-lists/' + wholeTeamListSaveRes.body._id)
							.send(wholeTeamList)
							.expect(200)
							.end(function(wholeTeamListDeleteErr, wholeTeamListDeleteRes) {
								// Handle Whole team list error error
								if (wholeTeamListDeleteErr) done(wholeTeamListDeleteErr);

								// Set assertions
								(wholeTeamListDeleteRes.body._id).should.equal(wholeTeamListSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Whole team list instance if not signed in', function(done) {
		// Set Whole team list user 
		wholeTeamList.user = user;

		// Create new Whole team list model instance
		var wholeTeamListObj = new WholeTeamList(wholeTeamList);

		// Save the Whole team list
		wholeTeamListObj.save(function() {
			// Try deleting Whole team list
			request(app).delete('/whole-team-lists/' + wholeTeamListObj._id)
			.expect(401)
			.end(function(wholeTeamListDeleteErr, wholeTeamListDeleteRes) {
				// Set message assertion
				(wholeTeamListDeleteRes.body.message).should.match('User is not logged in');

				// Handle Whole team list error error
				done(wholeTeamListDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			WholeTeamList.remove().exec(function(){
				done();
			});	
		});
	});
});
