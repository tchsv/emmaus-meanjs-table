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
	TeamRoommate: {
		type: Schema.Types.ObjectId,
		ref: 'WholeTeamList'
	},
	PilgrimRoommate1: {
		type:Schema.Types.ObjectId,
		ref: 'Pilgrim'
	},
	PilgrimRoommate2: {
		type:Schema.Types.ObjectId,
		ref: 'Pilgrim'
	},
	PilgrimRoommate3: {
		type:Schema.Types.ObjectId,
		ref: 'Pilgrim'
	},
	RoomNumber: {
		type: String,
		default: '',
		trim: true
	},
	UpDown: {
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

mongoose.model('PilgrimRoom', PilgrimRoomSchema);
