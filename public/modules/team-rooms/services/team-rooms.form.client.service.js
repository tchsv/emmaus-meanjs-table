(function () {
    'use strict';

    angular
        .module('team-rooms')
        .factory('TeamRoomsForm', [ 'TeamRoomMembers',function  (TeamRoomMembers) {

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
                        disabled: disabled,
                        options: TeamRoomMembers.getTeamRetreat()
                    }
                },
                {
                    key: 'Roommate2',
                    type: 'select',
                    templateOptions: {
                        label: 'Roommate 2:',
                        disabled: disabled,
                        options: TeamRoomMembers.getTeamRetreat()
                    }
                },
                {
                    key: 'RoomNumber',
                    type: 'select',
                    templateOptions: {
                        label: 'Room Number:',
                        disabled: disabled,
                        options: [
                            {'name':'401','value':'401'},
                            {'name':'402','value':'402'},
                            {'name':'403','value':'403'},
                            {'name':'404','value':'404'},
                            {'name':'405','value':'405'},
                            {'name':'406','value':'406'},
                            {'name':'407','value':'407'},
                            {'name':'408','value':'408'},
                            {'name':'409','value':'409'},
                            {'name':'410','value':'410'},
                            {'name':'411','value':'411'},
                            {'name':'412','value':'412'},
                            {'name':'501','value':'501'},
                            {'name':'502','value':'502'},
                            {'name':'503','value':'503'},
                            {'name':'504','value':'504'},
                            {'name':'505','value':'505'},
                            {'name':'506','value':'506'},
                            {'name':'507','value':'507'},
                            {'name':'508','value':'508'},
                            {'name':'509','value':'509'},
                            {'name':'510','value':'510'},
                            {'name':'511','value':'511'},
                            {'name':'512','value':'512'},
                            {'name':'308','value':'308'},
                            {'name':'309','value':'309'},
                            {'name':'310','value':'310'},
                            {'name':'311','value':'311'},
                            {'name':'312','value':'312'},
                            {'name':'313','value':'313'},
                            {'name':'314','value':'314'},
                            {'name':'NurseRoom','value':'NurseRoom'},
                            {'name':'HillCrest1','value':'HillCrest1'},
                        ]
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
