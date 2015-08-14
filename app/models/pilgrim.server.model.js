'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pilgrim Schema
 */
var PilgrimSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Pilgrim name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Pilgrim', PilgrimSchema);