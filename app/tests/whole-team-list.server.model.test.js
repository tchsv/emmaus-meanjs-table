'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	WholeTeamList = mongoose.model('WholeTeamList');

/**
 * Globals
 */
var user, wholeTeamList;

/**
 * Unit tests
 */
describe('Whole team list Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			wholeTeamList = new WholeTeamList({
				name: 'Whole team list Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return wholeTeamList.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			wholeTeamList.name = '';

			return wholeTeamList.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		WholeTeamList.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});
