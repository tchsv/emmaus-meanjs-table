(function() {
    'use strict';

    angular
        .module('whole-team-lists')
        .factory('WholeTeamListsForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

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
              options : [{name:"Yes", value:"Yes"},
                {name:"No", value:"No"},
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
            key: 'Building',
            type: 'select',
            templateOptions: {
              label: 'Building:',
              disabled: disabled,
              options : [{name:"Retreat Center", value:"Retreat Center"},
                {name:"Campers", value:"Campers"},
                {name:"None", value:"None"},
                {name:"Main Lodge - East Wing", value:"Main Lodge - East Wing"}]
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

  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();
