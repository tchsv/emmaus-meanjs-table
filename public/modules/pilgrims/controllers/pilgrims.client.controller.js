'use strict';

// Pilgrims controller
angular.module('pilgrims').controller('PilgrimsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pilgrims', 'TableSettings', 'PilgrimsForm',
	function($scope, $stateParams, $location, Authentication, Pilgrims, TableSettings, PilgrimsForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Pilgrims);
		$scope.pilgrim = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = PilgrimsForm.getFormFields(disabled);
		};

		var getPilgrims = function() {
			var nowWholeList = TableSettings.getParams(Pilgrims);
			var returnList = [
				{ 'name':'Snow', 'value':'White'},
				{ 'name':'Prince', 'value':'Charm'},
				{ 'name':'Cinder', 'value':'Fella'},
				{ 'name':'Bubba', 'value':'Gump'},
				{ 'name':'Jenny', 'value':'Gump'},
				{ 'name':'Sgt', 'value':'Dan'},
				{ 'name':'Bubba6', 'value':'Gump6'},
			];
			return returnList;
		};

		// Create new Pilgrim
		$scope.create = function() {
			var pilgrim = new Pilgrims($scope.pilgrim);

			// Redirect after save
			pilgrim.$save(function(response) {
				$location.path('pilgrims/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Pilgrim
		$scope.remove = function(pilgrim) {

			if ( pilgrim ) {
				pilgrim = Pilgrims.get({pilgrimId:pilgrim._id}, function() {
					pilgrim.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.pilgrim.$remove(function() {
					$location.path('pilgrims');
				});
			}

		};

		// Update existing Pilgrim
		$scope.update = function() {
			var pilgrim = $scope.pilgrim;

			pilgrim.$update(function() {
				$location.path('pilgrims/' + pilgrim._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewPilgrim = function() {
			$scope.pilgrim = Pilgrims.get( {pilgrimId: $stateParams.pilgrimId} );
			$scope.setFormFields(true);
		};

		$scope.toEditPilgrim = function() {
			$scope.pilgrim = Pilgrims.get( {pilgrimId: $stateParams.pilgrimId} );
			$scope.setFormFields(false);
		};

	}

]);
