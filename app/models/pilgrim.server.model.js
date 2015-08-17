'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Pilgrim Schema
 * FirstName    LastName    Street_Address    City_State_Zip    Church    Age    Special
 * Room_Mate1    Room_Mate2    Paid    Amount_Paid    Amount_Due    CheckNumber    RoomNumber    HomeCluster
 */
var PilgrimSchema = new Schema({
    FirstName: {
        type: String,
        default: '',
        required: 'Please fill Pilgrim first name',
    },

    LastName: {
        type: String,
        default: '',
        required: 'Please fill Pilgrim last name',
    },

    Street_Address: {
        type: String,
        default: '',
        required: 'Please fill Pilgrim street address',
    },

    City_State_Zip: {
        type: String,
        default: '',
        required: 'Please fill Pilgrim city state zip',
    },

    Church: {
        type: String,
        default: '',
        required: 'Please fill Pilgrim church',
    },

    Age: {
        type: String,
        default: '',
        required: 'Please fill Pilgrim age',
    },

    Special: {
        type: String,
        default: '',
    },

    Room_Mate1: {
        type: Schema.ObjectId,
        ref: 'wholeteamlists'
    },

    Room_Mate2: {
        type: Schema.ObjectId,
        ref: 'pilgrim'
    },

    Paid: {
        type: String,
        default: 'No',
    },

    Amount_Paid: {
        type: Number,
        default: '0',
    },

    Amount_Due: {
        type: Number,
        default: '0',
    },

    CheckNumber: {
        type: Number,
        default: '',
    },

    RoomNumber: {
        type: String,
        default: '',
    },

    HomeCluster: {
        type: String,
        default: '',
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
