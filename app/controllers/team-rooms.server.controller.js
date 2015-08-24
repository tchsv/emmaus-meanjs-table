'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	TeamRoom = mongoose.model('TeamRoom'),
	_ = require('lodash');

/**
 * Create a Team room
 */
exports.create = function(req, res) {
	var teamRoom = new TeamRoom(req.body);
	teamRoom.user = req.user;

	teamRoom.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teamRoom);
		}
	});
};

/**
 * Show the current Team room
 */
exports.read = function(req, res) {
	res.jsonp(req.teamRoom);
};

/**
 * Update a Team room
 */
exports.update = function(req, res) {
	var teamRoom = req.teamRoom ;

	teamRoom = _.extend(teamRoom , req.body);

	teamRoom.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teamRoom);
		}
	});
};

/**
 * Delete an Team room
 */
exports.delete = function(req, res) {
	var teamRoom = req.teamRoom ;

	teamRoom.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teamRoom);
		}
	});
};

/**
 * List of Team rooms
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 5;
	var page = req.query.page || 1;


	var filter = {
		filters : {
			mandatory : {
				contains: req.query.filter
			}
		}
	};

	var pagination = {
		start: (page - 1) * count,
		count: count
	};

	if (req.query.sorting) {
		var sortKey = Object.keys(req.query.sorting)[0];
		var sortValue = req.query.sorting[sortKey];
		sortObject[sortValue] = sortKey;
	}
	else {
		sortObject.desc = '_id';
	}

	sort = {
		sort: sortObject
	};


	TeamRoom
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, teamRooms){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(teamRooms);
			}
		});

};

/**
 * Team room middleware
 */
exports.teamRoomByID = function(req, res, next, id) {
	TeamRoom.findById(id).populate('user', 'displayName').exec(function(err, teamRoom) {
		if (err) return next(err);
		if (! teamRoom) return next(new Error('Failed to load Team room ' + id));
		req.teamRoom = teamRoom ;
		next();
	});
};

/**
 * Team room authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.teamRoom.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
