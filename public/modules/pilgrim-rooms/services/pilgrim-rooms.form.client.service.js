(function() {
    'use strict';

    angular
        .module('pilgrim-rooms')
        .factory('PilgrimRoomsForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  				{
  					key: 'name',
  					type: 'input',
  					templateOptions: {
  			      label: 'Name:',
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
