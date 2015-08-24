'use strict';

//require('models/pilgrims.server.controller.js');
//require('models/whole-team-lists.server.controller.js');

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Conf room table Schema
 */
var ConfRoomTableSchema = new Schema({
	tableName: {
		type: String,
		default: '',
		required: 'Please fill Conf room table name',
		trim: true
	},
	tableLeader : {
 		type: Schema.Types.ObjectId,
		ref: 'WholeTeamList'
	},
	assistantTableLeader : {
		type: Schema.Types.ObjectId,
		ref: 'WholeTeamList'
	},
	pilgrim1 : {
			type:Schema.Types.ObjectId,
			ref: 'Pilgrim'
	},
	pilgrim2 : {
		type:Schema.Types.ObjectId,
		ref: 'Pilgrim'
	},
	pilgrim3 : {
		type:Schema.Types.ObjectId,
		ref: 'Pilgrim'
	},
	pilgrim4 : {
		type:Schema.Types.ObjectId,
		ref: 'Pilgrim'
	},
	pilgrim5 : {
		type:Schema.Types.ObjectId,
		ref: 'Pilgrim'
	},
	pilgrim6 : {
		type:Schema.Types.ObjectId,
		ref: 'Pilgrim'
	},
	pilgrim7 : {
		type:Schema.Types.ObjectId,
		ref: 'Pilgrim'
	},
	pilgrim8 : {
		type:Schema.Types.ObjectId,
		ref: 'Pilgrim'
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

mongoose.model('ConfRoomTable', ConfRoomTableSchema);
