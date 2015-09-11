(function () {
    'use strict';

    angular
        .module('whole-team-lists')
        .factory('WholeTeamListsForm', factory);

    function factory() {

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
                            {name: "No", value: "No"},
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
                    key: 'Roommate',
                    type: 'input',
                    templateOptions: {
                        label: 'Roommate:',
                        disabled: disabled,
                    }
                },
                {
                    key: 'RoomNumber',
                    type: 'input',
                    templateOptions: {
                        label: 'RoomNumber:',
                        disabled: disabled,
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
                            {name: "Main Lodge - East Wing", value: "Main Lodge - East Wing"}]
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
                    type: 'input',
                    templateOptions: {
                        label: 'Table:',
                        disabled: disabled
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
                },

            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }

})();
