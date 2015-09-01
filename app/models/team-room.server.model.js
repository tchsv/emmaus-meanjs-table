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
	Roommate1: {
		type: Schema.Types.ObjectId,
		ref: 'WholeTeamList'
	},
	Roommate2: {
		type: Schema.Types.ObjectId,
		ref: 'WholeTeamList'
	},
	RoomNumber: {
		type: String,
		default: '',
		trim: true
	},
	Building: {
		type: String,
		default: '',
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
