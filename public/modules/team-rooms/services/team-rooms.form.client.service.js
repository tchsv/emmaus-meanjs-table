(function () {
    'use strict';

    angular
        .module('team-rooms')
        .factory('TeamRoomsForm', [ 'ConfRoomTablesMembers',function  (ConfRoomTablesMembers) {

        var getFormFields = function (disabled) {


            //Roommate1: {
            //  type: Schema.Types.ObjectId,
            //      ref: 'WholeTeamList'
            //},
            //Roommate2: {
            //  type: Schema.Types.ObjectId,
            //      ref: 'WholeTeamList'
            //},
            //RoomNumber: {
            //  type: String,
            //default: '',
            //      trim: true
            //},
            //Building: {
            //  type: String,
            //default: '',
            //      trim: true
            //},

            var fields = [
                {
                    key: 'Roommate1',
                    type: 'select',
                    templateOptions: {
                        label: 'Roommate 1:',
                        options: ConfRoomTablesMembers.getTeamRetreat()
                    }
                },
                {
                    key: 'Roommate2',
                    type: 'select',
                    templateOptions: {
                        label: 'Roommate 2:',
                        options: ConfRoomTablesMembers.getTeamRetreat()
                    }
                },
                {
                    key: 'RoomNumber',
                    type: 'input',
                    templateOptions: {
                        label: 'Room Number:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Building',
                    type: 'input',
                    templateOptions: {
                        label: 'Building:',
                        disabled: disabled
                    }
                },

            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;


        }])

})();
