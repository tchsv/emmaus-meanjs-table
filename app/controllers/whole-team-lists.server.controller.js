'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	WholeTeamList = mongoose.model('WholeTeamList'),
	_ = require('lodash');

/**
 * Create a Whole team list
 */
exports.create = function(req, res) {
	var wholeTeamList = new WholeTeamList(req.body);
	wholeTeamList.user = req.user;

	wholeTeamList.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wholeTeamList);
		}
	});
};

/**
 * Show the current Whole team list
 */
exports.read = function(req, res) {
	res.jsonp(req.wholeTeamList);
};

/**
 * Update a Whole team list
 */
exports.update = function(req, res) {
	var wholeTeamList = req.wholeTeamList ;

	wholeTeamList = _.extend(wholeTeamList , req.body);

	wholeTeamList.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wholeTeamList);
		}
	});
};

/**
 * Delete an Whole team list
 */
exports.delete = function(req, res) {
	var wholeTeamList = req.wholeTeamList ;

	wholeTeamList.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(wholeTeamList);
		}
	});
};

/**
 * List of Whole team lists
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


	WholeTeamList
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, wholeTeamLists){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(wholeTeamLists);
			}
		});

};

/**
 * Whole team list middleware
 */
exports.wholeTeamListByID = function(req, res, next, id) {
	WholeTeamList.findById(id).populate('user', 'displayName').exec(function(err, wholeTeamList) {
		if (err) return next(err);
		if (! wholeTeamList) return next(new Error('Failed to load Whole team list ' + id));
		req.wholeTeamList = wholeTeamList ;
		next();
	});
};

/**
 * Whole team list authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	//if (req.wholeTeamList.user.id !== req.user.id) {
	//	return res.status(403).send('User is not authorized');
	//}
	next();
};
