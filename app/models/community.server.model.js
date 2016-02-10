'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Community Schema
 */
var CommunitySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Community name',
		trim: true
	},
	last_name: {type: String},
	first_name: {type: String},
	area_code: {type: String},
	phone: {type: String},
	street_address: {type: String},
	city: {type: String},
	state: {type: String},
	zip: {type: String},
	original_walk: {type: String}
	,
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Community', CommunitySchema);


