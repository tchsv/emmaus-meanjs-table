'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pilgrim = mongoose.model('Pilgrim'),
	_ = require('lodash');

/**
 * Create a Pilgrim
 */
exports.create = function(req, res) {
	var pilgrim = new Pilgrim(req.body);
	pilgrim.user = req.user;

	pilgrim.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pilgrim);
		}
	});
};

/**
 * Show the current Pilgrim
 */
exports.read = function(req, res) {
	res.jsonp(req.pilgrim);
};

/**
 * Update a Pilgrim
 */
exports.update = function(req, res) {
	var pilgrim = req.pilgrim ;

	pilgrim = _.extend(pilgrim , req.body);

	pilgrim.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pilgrim);
		}
	});
};

/**
 * Delete an Pilgrim
 */
exports.delete = function(req, res) {
	var pilgrim = req.pilgrim ;

	pilgrim.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pilgrim);
		}
	});
};

/**
 * List of Pilgrims
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


	Pilgrim
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, pilgrims){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(pilgrims);
			}
		});

};

/**
 * Pilgrim middleware
 */
exports.pilgrimByID = function(req, res, next, id) {
	Pilgrim.findById(id).populate('user', 'displayName').exec(function(err, pilgrim) {
		if (err) return next(err);
		if (! pilgrim) return next(new Error('Failed to load Pilgrim ' + id));
		req.pilgrim = pilgrim ;
		next();
	});
};

/**
 * Pilgrim authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.pilgrim.user.id !== req.user.id) {
//		return res.status(403).send('User is not authorized');
//	}
	next();
};
