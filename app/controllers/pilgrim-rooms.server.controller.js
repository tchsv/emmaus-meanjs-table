'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PilgrimRoom = mongoose.model('PilgrimRoom'),
	_ = require('lodash');

/**
 * Create a Pilgrim room
 */
exports.create = function(req, res) {
	var pilgrimRoom = new PilgrimRoom(req.body);
	pilgrimRoom.user = req.user;

	pilgrimRoom.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pilgrimRoom);
		}
	});
};

/**
 * Show the current Pilgrim room
 */
exports.read = function(req, res) {
	res.jsonp(req.pilgrimRoom);
};

/**
 * Update a Pilgrim room
 */
exports.update = function(req, res) {
	var pilgrimRoom = req.pilgrimRoom ;

	pilgrimRoom = _.extend(pilgrimRoom , req.body);

	pilgrimRoom.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pilgrimRoom);
		}
	});
};

/**
 * Delete an Pilgrim room
 */
exports.delete = function(req, res) {
	var pilgrimRoom = req.pilgrimRoom ;

	pilgrimRoom.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pilgrimRoom);
		}
	});
};

/**
 * List of Pilgrim rooms
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


	PilgrimRoom
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, pilgrimRooms){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(pilgrimRooms);
			}
		});

};

/**
 * Pilgrim room middleware
 */
exports.pilgrimRoomByID = function(req, res, next, id) {
	PilgrimRoom.findById(id).populate('user', 'displayName').exec(function(err, pilgrimRoom) {
		if (err) return next(err);
		if (! pilgrimRoom) return next(new Error('Failed to load Pilgrim room ' + id));
		req.pilgrimRoom = pilgrimRoom ;
		next();
	});
};

/**
 * Pilgrim room authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pilgrimRoom.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
