'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Team room Schema
 */
var TeamRoomSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Team room name',
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

mongoose.model('TeamRoom', TeamRoomSchema);