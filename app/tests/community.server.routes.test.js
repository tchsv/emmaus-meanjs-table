'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Community = mongoose.model('Community'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, community;

/**
 * Community routes tests
 */
describe('Community CRUD tests', function() {
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

		// Save a user to the test db and create new Community
		user.save(function() {
			community = {
				name: 'Community Name'
			};

			done();
		});
	});

	it('should be able to save Community instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community
				agent.post('/communities')
					.send(community)
					.expect(200)
					.end(function(communitySaveErr, communitySaveRes) {
						// Handle Community save error
						if (communitySaveErr) done(communitySaveErr);

						// Get a list of Communities
						agent.get('/communities')
							.end(function(communitiesGetErr, communitiesGetRes) {
								// Handle Community save error
								if (communitiesGetErr) done(communitiesGetErr);

								// Get Communities list
								var communities = communitiesGetRes.body;

								// Set assertions
								(communities[0].user._id).should.equal(userId);
								(communities[0].name).should.match('Community Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Community instance if not logged in', function(done) {
		agent.post('/communities')
			.send(community)
			.expect(401)
			.end(function(communitySaveErr, communitySaveRes) {
				// Call the assertion callback
				done(communitySaveErr);
			});
	});

	it('should not be able to save Community instance if no name is provided', function(done) {
		// Invalidate name field
		community.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community
				agent.post('/communities')
					.send(community)
					.expect(400)
					.end(function(communitySaveErr, communitySaveRes) {
						// Set message assertion
						(communitySaveRes.body.message).should.match('Please fill Community name');
						
						// Handle Community save error
						done(communitySaveErr);
					});
			});
	});

	it('should be able to update Community instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community
				agent.post('/communities')
					.send(community)
					.expect(200)
					.end(function(communitySaveErr, communitySaveRes) {
						// Handle Community save error
						if (communitySaveErr) done(communitySaveErr);

						// Update Community name
						community.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Community
						agent.put('/communities/' + communitySaveRes.body._id)
							.send(community)
							.expect(200)
							.end(function(communityUpdateErr, communityUpdateRes) {
								// Handle Community update error
								if (communityUpdateErr) done(communityUpdateErr);

								// Set assertions
								(communityUpdateRes.body._id).should.equal(communitySaveRes.body._id);
								(communityUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Communities if not signed in', function(done) {
		// Create new Community model instance
		var communityObj = new Community(community);

		// Save the Community
		communityObj.save(function() {
			// Request Communities
			request(app).get('/communities')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Community if not signed in', function(done) {
		// Create new Community model instance
		var communityObj = new Community(community);

		// Save the Community
		communityObj.save(function() {
			request(app).get('/communities/' + communityObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', community.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Community instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Community
				agent.post('/communities')
					.send(community)
					.expect(200)
					.end(function(communitySaveErr, communitySaveRes) {
						// Handle Community save error
						if (communitySaveErr) done(communitySaveErr);

						// Delete existing Community
						agent.delete('/communities/' + communitySaveRes.body._id)
							.send(community)
							.expect(200)
							.end(function(communityDeleteErr, communityDeleteRes) {
								// Handle Community error error
								if (communityDeleteErr) done(communityDeleteErr);

								// Set assertions
								(communityDeleteRes.body._id).should.equal(communitySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Community instance if not signed in', function(done) {
		// Set Community user 
		community.user = user;

		// Create new Community model instance
		var communityObj = new Community(community);

		// Save the Community
		communityObj.save(function() {
			// Try deleting Community
			request(app).delete('/communities/' + communityObj._id)
			.expect(401)
			.end(function(communityDeleteErr, communityDeleteRes) {
				// Set message assertion
				(communityDeleteRes.body.message).should.match('User is not logged in');

				// Handle Community error error
				done(communityDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Community.remove().exec(function(){
				done();
			});	
		});
	});
});
