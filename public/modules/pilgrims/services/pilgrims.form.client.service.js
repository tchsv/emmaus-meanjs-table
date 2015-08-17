(function () {
    'use strict';

    angular
        .module('pilgrims')
        .factory('PilgrimsForm', factory);

    function factory() {

        var getFormFields = function (disabled) {
            /**
             *
             * FirstName    LastName    Street_Address    City_State_Zip    Church    Age    Special
             * Room_Mate1    Room_Mate2    Paid    Amount_Paid    Amount_Due    CheckNumber    RoomNumber    HomeCluster
             *
             */
            var fields = [
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
                        label: 'City State, Zip:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Church',
                    type: 'input',
                    templateOptions: {
                        label: 'Church:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Age',
                    type: 'input',
                    templateOptions: {
                        label: 'Age:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Special',
                    type: 'input',
                    templateOptions: {
                        label: 'Special Info:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Room_Mate1',
                    type: 'input',
                    templateOptions: {
                        label: 'Room Mate 1:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Room_Mate2',
                    type: 'input',
                    templateOptions: {
                        label: 'Room Mate 2:',
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
                    key: 'Amount_Paid',
                    type: 'input',
                    templateOptions: {
                        label: 'Amount Recived:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Amount_Due',
                    type: 'input',
                    templateOptions: {
                        label: 'Amount Due:',
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
                    key: 'RoomNumber',
                    type: 'input',
                    templateOptions: {
                        label: 'Room Number:',
                        disabled: disabled
                    }
                },
                {
                    key: 'HomeCluster',
                    type: 'input',
                    templateOptions: {
                        label: 'Home Cluster:',
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
