(function () {
    'use strict';

    angular
        .module('whole-team-lists')
        // @ngInject
        .factory('WholeTeamListsForm',factory);

    function factory(TeamRoomMembers) {

        var getFormFields = function (disabled) {

            var fields = [
                {
                    key: 'Name',
                    type: 'input',
                    templateOptions: {
                        label: 'Name:',
                        disabled: disabled
                    }
                },
                {
                    key: 'FirstName',
                    type: 'input',
                    templateOptions: {
                        label: 'First Name:',
                        disabled: disabled
                    }
                },
                {
                    key: 'LastName',
                    type: 'input',
                    templateOptions: {
                        label: 'Last Name:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Committee',
                    type: 'input',
                    templateOptions: {
                        label: 'Committee:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Paid',
                    type: 'radio',
                    templateOptions: {
                        label: 'Paid:',
                        disabled: disabled,
                        options: [{name: "Yes", value: "Yes"},
                            {name: "No", value: "No"}
                        ]
                    }
                },
                {
                    key: 'PaidAmount',
                    type: 'input',
                    templateOptions: {
                        label: 'Paid Amount:',
                        disabled: disabled
                    }
                },
                {
                    key: 'CheckNumber',
                    type: 'input',
                    templateOptions: {
                        label: 'Check Number:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Notes',
                    type: 'input',
                    templateOptions: {
                        label: 'Notes:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Roommate',
                    type: 'select',
                    templateOptions: {
                        label: 'Roommate',
                        disabled: disabled,
                        options: TeamRoomMembers.getTeamRetreat()
                    }
                },
                {
                    key: 'Roommates',
                    type: 'select',
                    templateOptions: {
                        label: 'Roommate',
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
                            {'name':'HillCrest1','value':'HillCrest1'}
                        ]
                    }
                },
                {
                    key: 'Building',
                    type: 'select',
                    templateOptions: {
                        label: 'Building:',
                        disabled: disabled,
                        options: [{name: "Retreat Center", value: "Retreat Center"},
                            {name: "Campers", value: "Campers"},
                            {name: "None", value: "None"},
                            {name: "Main Lodge - East Wing", value: "Main-Lodge-East-Wing"},
                            {name: "Main Lodge - South Hall", value: "Main-Lodge-South-Hall"}]
                    }
                },
                {
                    key: 'Chairperson',
                    type: 'input',
                    templateOptions: {
                        label: 'Chairperson:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Talk',
                    type: 'input',
                    templateOptions: {
                        label: 'Talk:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Table',
                    type: 'select',
                    templateOptions: {
                        label: 'Table:',
                        disabled: disabled,
                        options: [{name: "Esther", value: "Esther"},
                            {name: "Anna", value: "Anna"},
                            {name: "Mary", value: "Mary"},
                            {name: "Tabitha", value: "Tabitha"},
                            {name: "Martha", value: "Martha"},
                            {name: "Naomi", value: "Naomi"},
                            {name: "Ruth", value: "Ruth"}]
                    }
                },
                {
                    key: 'AreaCode',
                    type: 'input',
                    templateOptions: {
                        label: 'AC:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Phone',
                    type: 'input',
                    templateOptions: {
                        label: 'Phone:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Email',
                    type: 'input',
                    templateOptions: {
                        label: 'Email:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Street_Address',
                    type: 'input',
                    templateOptions: {
                        label: 'Street Address:',
                        disabled: disabled
                    }
                },
                {
                    key: 'City_State_Zip',
                    type: 'input',
                    templateOptions: {
                        label: 'City, State, Zip:',
                        disabled: disabled
                    }
                },
                {
                    key: 'City',
                    type: 'input',
                    templateOptions: {
                        label: 'City:',
                        disabled: disabled
                    }
                },
                {
                    key: 'State',
                    type: 'input',
                    templateOptions: {
                        label: 'State:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Zip',
                    type: 'input',
                    templateOptions: {
                        label: 'Zip:',
                        disabled: disabled
                    }
                },
                {
                    key: 'OrignalWalkNumber',
                    type: 'input',
                    templateOptions: {
                        label: 'OrignalWalkNumber:',
                        disabled: disabled
                    }
                }

            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }

})();
