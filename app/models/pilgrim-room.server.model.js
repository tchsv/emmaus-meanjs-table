'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pilgrim room Schema
 */
var PilgrimRoomSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Pilgrim room name',
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

mongoose.model('PilgrimRoom', PilgrimRoomSchema);