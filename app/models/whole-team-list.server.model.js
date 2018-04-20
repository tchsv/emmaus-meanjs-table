'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Whole team list Schema
 */
var WholeTeamListSchema = new Schema({
	Name: {
		type: String,
		default: '',
		required: 'Name required',
		trim: true
	},
	FirstName: {
		type: String,
		default: '',
		trim: true
	},
	LastName: {
		type: String,
		default: '',
		trim: true
	},
	Committee: {
		type: String,
		default: '',
		required: 'Committee required',
		trim: true
	},
	Chairperson: {
		type: String,
		default: 'No',
		trim: true
	},
	Talk: {
		type: String,
		default: 'N/A',
		trim: true
	},
	Table: {
		type: String,
		default: 'N/A',
		trim: true
	},
	Phone: {
		type: String,
		default: '',
		trim: true
	},
	AreaCode: {
		type: String,
		default: '',
		trim: true
	},
	Email: {
		type: String,
		default: '',
		trim: true
	},
	Street_Address: {
		type: String,
		default: '',
		trim: true
	},
	City_State_Zip: {
		type: String,
		default: '',
		trim: true
	},
	City: {
		type: String,
		default: '',
		trim: true
	},
	State: {
		type: String,
		default: '',
		trim: true
	},
	Zip: {
		type: String,
		default: '',
		trim: true
	},
	OrignalWalkNumber: {
		type: String,
		default: '',
		trim: true
	},
	Paid: {
		type: String,
		default: 'No',
		trim: true
	},
	PaidAmount: {
		type: Number,
		default: '0',
		trim: true
	},
	PaidCash: {
		type: Number,
		default: '0',
		trim: true
	},
	CheckNumber: {
		type: Number,
		default: '0',
		trim: true
	},
	Notes: {
		type: String,
		default: '',
		trim: true
	},
	Roommate: {
		type: String,
		default: '',
		trim: true
	},
	Roommates: {
		type: Array,
		default: '',
		trim: true
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

mongoose.model('WholeTeamList', WholeTeamListSchema);
