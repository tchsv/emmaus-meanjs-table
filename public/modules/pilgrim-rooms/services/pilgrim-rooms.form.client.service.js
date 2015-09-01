(function () {
    'use strict';

    angular
        .module('pilgrim-rooms')
        .factory('PilgrimRoomsForm', ['ConfRoomTablesMembers', function (ConfRoomTablesMembers) {

            var getFormFields = function (disabled) {

                //TeamRoommate: {
                //  type: Schema.Types.ObjectId,
                //      ref: 'WholeTeamList'
                //},
                //PilgrimRoommate1: {
                //  type:Schema.Types.ObjectId,
                //      ref: 'Pilgrim'
                //},
                //PilgrimRoommate2: {
                //  type:Schema.Types.ObjectId,
                //      ref: 'Pilgrim'
                //},
                //RoomNumber: {
                //  type: String,
                //default: '',
                //      trim: true
                //},
                //UpDown: {
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
                        key: 'TeamRoommate',
                        type: 'select',
                        templateOptions: {
                            label: 'Team Roommate:',
                            options: ConfRoomTablesMembers.getTeam()
                        },
                    },
                    {
                        key: 'PilgrimRoommate1',
                        type: 'select',
                        templateOptions: {
                            label: 'Pilgrim Roommate 1:',
                            options: ConfRoomTablesMembers.getPilgrim()
                        },
                    },
                    {
                        key: 'PilgrimRoommate2',
                        type: 'select',
                        templateOptions: {
                            label: 'Pilgrim Roommate 2:',
                            options: ConfRoomTablesMembers.getPilgrim()
                        },
                    },
                    {
                        key: 'RoomNumber',
                        type: 'input',
                        templateOptions: {
                            label: 'Room Number:',
                            disabled: disabled
                        },
                    },
                    {
                        key: 'UpDown',
                        type: 'input',
                        templateOptions: {
                            label: 'Up Down:',
                            disabled: disabled
                        },
                    },
                    {
                        key: 'Building',
                        type: 'input',
                        templateOptions: {
                            label: 'Building:',
                            disabled: disabled
                        },
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
