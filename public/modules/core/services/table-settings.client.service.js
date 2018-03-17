(function() {
    'use strict';

    angular
        .module('core')
        .factory('TableSettings', factory);

    factory.$inject = ['ngTableParams', '$q'];

    function factory(ngTableParams, $q) {

      var getData = function(Entity) {
        return function($defer, params) {
  				Entity.get(params.url(), function(response) {
  					params.total(response.total);
  					$defer.resolve(response.results);
  				});
  			};

      };
      var getDataWithPromise = function(Entity) {
          var deferred = $q.defer();
  				Entity.get(params.url(), function(response) {
  					params.total(response.total);
                    deferred.resolve(response.results);
  				});
        return deferred.promise();
      };

      var params = {
        page: 1,
        count: 999
      };

      var settings = {
        total: 0,
        counts: [5, 10, 15, 999],
        filterDelay: 0
      };

      /* jshint ignore:start */
      var tableParams = new ngTableParams(params, settings);
      /* jshint ignore:end */

        var getParams = function(Entity) {
            tableParams.settings({getData: getData(Entity)});
            return tableParams;
        };
        var getParamsWithPromise = function(Entity) {
            tableParams.settings({getDataWithPromise: getData(Entity)});
            return tableParams;
        };


      var service = {
        getParams: getParams,
          getParamsWithPromise: getParamsWithPromise
      };

      return service;

  }

})();
