'use strict';

// Communities controller
angular.module('communities').controller('CommunitiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Communities', 'TableSettings', 'CommunitiesForm',
	function($scope, $stateParams, $location, Authentication, Communities, TableSettings, CommunitiesForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Communities);
		$scope.community = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = CommunitiesForm.getFormFields(disabled);
		};


		// Create new Community
		$scope.create = function() {
			var community = new Communities($scope.community);

			// Redirect after save
			community.$save(function(response) {
				$location.path('communities/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Community
		$scope.remove = function(community) {

			if ( community ) {
				community = Communities.get({communityId:community._id}, function() {
					community.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.community.$remove(function() {
					$location.path('communities');
				});
			}

		};

		// Update existing Community
		$scope.update = function() {
			var community = $scope.community;

			community.$update(function() {
				$location.path('communities/' + community._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewCommunity = function() {
			$scope.community = Communities.get( {communityId: $stateParams.communityId} );
			$scope.setFormFields(true);
		};

		$scope.toEditCommunity = function() {
			$scope.community = Communities.get( {communityId: $stateParams.communityId} );
			$scope.setFormFields(false);
		};

	}

]);
