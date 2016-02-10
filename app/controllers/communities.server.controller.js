'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Community = mongoose.model('Community'),
	_ = require('lodash');

/**
 * Create a Community
 */
exports.create = function(req, res) {
	var community = new Community(req.body);
	community.user = req.user;

	community.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(community);
		}
	});
};

/**
 * Show the current Community
 */
exports.read = function(req, res) {
	res.jsonp(req.community);
};

/**
 * Update a Community
 */
exports.update = function(req, res) {
	var community = req.community ;

	community = _.extend(community , req.body);

	community.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(community);
		}
	});
};

/**
 * Delete an Community
 */
exports.delete = function(req, res) {
	var community = req.community ;

	community.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(community);
		}
	});
};

/**
 * List of Communities
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


	Community
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, communities){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(communities);
			}
		});

};

/**
 * Community middleware
 */
exports.communityByID = function(req, res, next, id) {
	Community.findById(id).populate('user', 'displayName').exec(function(err, community) {
		if (err) return next(err);
		if (! community) return next(new Error('Failed to load Community ' + id));
		req.community = community ;
		next();
	});
};

/**
 * Community authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.community.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
