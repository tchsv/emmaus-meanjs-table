'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ConfRoomTable = mongoose.model('ConfRoomTable'),
	_ = require('lodash');

/**
 * Create a Conf room table
 */
exports.create = function(req, res) {
	var confRoomTable = new ConfRoomTable(req.body);
	confRoomTable.user = req.user;

	confRoomTable.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(confRoomTable);
		}
	});
};

/**
 * Show the current Conf room table
 */
exports.read = function(req, res) {
	res.jsonp(req.confRoomTable);
};

/**
 * Update a Conf room table
 */
exports.update = function(req, res) {
	var confRoomTable = req.confRoomTable ;

	confRoomTable = _.extend(confRoomTable , req.body);

	confRoomTable.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(confRoomTable);
		}
	});
};

/**
 * Delete an Conf room table
 */
exports.delete = function(req, res) {
	var confRoomTable = req.confRoomTable ;

	confRoomTable.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(confRoomTable);
		}
	});
};

/**
 * List of Conf room tables
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


	ConfRoomTable
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, confRoomTables){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(confRoomTables);
			}
		});

};

/**
 * Conf room table middleware
 */
exports.confRoomTableByID = function(req, res, next, id) {
	ConfRoomTable.findById(id).populate('user', 'displayName').exec(function(err, confRoomTable) {
		if (err) return next(err);
		if (! confRoomTable) return next(new Error('Failed to load Conf room table ' + id));
		req.confRoomTable = confRoomTable ;
		next();
	});
};

/**
 * Conf room table authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.confRoomTable.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
