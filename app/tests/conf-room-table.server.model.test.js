'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ConfRoomTable = mongoose.model('ConfRoomTable');

/**
 * Globals
 */
var user, confRoomTable;

/**
 * Unit tests
 */
describe('Conf room table Model Unit Tests:', function() {
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
			confRoomTable = new ConfRoomTable({
				name: 'Conf room table Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return confRoomTable.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			confRoomTable.name = '';

			return confRoomTable.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		ConfRoomTable.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});
