(function () {
    'use strict';

    angular
        .module('conf-room-tables')
        .factory('ConfRoomTablesForm', ['ConfRoomTablesMembers', function (ConfRoomTablesMembers) {
            var getFormFields = function (disabled) {

                var fields = [
                    {
                        key: 'tableName',
                        type: 'input',
                        templateOptions: {
                            label: 'Table:',
                            disabled: disabled
                        },
                    },
                    {
                        key: 'tableLeader',
                        type: 'select',
                        templateOptions: {
                            label: 'Table Leader:',
                            options: ConfRoomTablesMembers.getTableLeaders()
                        },
                    },
                    {
                        key: 'assistantTableLeader',
                        type: 'select',
                        templateOptions: {
                            label: 'Asst. Table Leader:',
                            options: ConfRoomTablesMembers.getAssistantTableLeaders()
                        },
                    },
                    {
                        key: 'pilgrim1',
                        type: 'select',
                        templateOptions: {
                            label: 'Pilgrim:',
                            options: ConfRoomTablesMembers.getPilgrims()
                        },
                    },
                    {
                        key: 'pilgrim2',
                        type: 'select',
                        templateOptions: {
                            label: 'Pilgrim:',
                            options: ConfRoomTablesMembers.getPilgrims()
                        },
                    },
                    {
                        key: 'pilgrim3',
                        type: 'select',
                        templateOptions: {
                            label: 'Pilgrim:',
                            options: ConfRoomTablesMembers.getPilgrims()
                        },
                    },
                    {
                        key: 'pilgrim4',
                        type: 'select',
                        templateOptions: {
                            label: 'Pilgrim:',
                            options: ConfRoomTablesMembers.getPilgrims()
                        },
                    },
                    {
                        key: 'pilgrim5',
                        type: 'select',
                        templateOptions: {
                            label: 'Pilgrim:',
                            options: ConfRoomTablesMembers.getPilgrims()
                        },
                    },
                    {
                        key: 'pilgrim6',
                        type: 'select',
                        templateOptions: {
                            label: 'Pilgrim:',
                            options: ConfRoomTablesMembers.getPilgrims()
                        },
                    },
                    {
                        key: 'pilgrim7',
                        type: 'select',
                        templateOptions: {
                            label: 'Pilgrim:',
                            options: ConfRoomTablesMembers.getPilgrims()
                        },
                    },
                    {
                        key: 'pilgrim8',
                        type: 'select',
                        templateOptions: {
                            label: 'Pilgrim:',
                            options: ConfRoomTablesMembers.getPilgrims()
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
