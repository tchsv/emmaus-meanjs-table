'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PilgrimRoom = mongoose.model('PilgrimRoom');

/**
 * Globals
 */
var user, pilgrimRoom;

/**
 * Unit tests
 */
describe('Pilgrim room Model Unit Tests:', function() {
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
			pilgrimRoom = new PilgrimRoom({
				name: 'Pilgrim room Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return pilgrimRoom.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			pilgrimRoom.name = '';

			return pilgrimRoom.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		PilgrimRoom.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});
