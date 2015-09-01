'use strict';

// Pilgrim rooms controller
angular.module('pilgrim-rooms').controller('PilgrimRoomsController', ['$scope', '$stateParams', '$location', 'Authentication', 'PilgrimRooms', 'TableSettings', 'PilgrimRoomsForm',
	function($scope, $stateParams, $location, Authentication, PilgrimRooms, TableSettings, PilgrimRoomsForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(PilgrimRooms);
		$scope.pilgrimRoom = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = PilgrimRoomsForm.getFormFields(disabled);
		};

		$scope.cvsMe = function(tableData) {
			var keysS =[];
			angular.forEach(tableData[0], function(value, key) {
				this.push(key);
			}, keysS);
			console.log(keysS);
			tableData.unshift(keysS);
			return(tableData);
		};

		// Create new Pilgrim room
		$scope.create = function() {
			var pilgrimRoom = new PilgrimRooms($scope.pilgrimRoom);

			// Redirect after save
			pilgrimRoom.$save(function(response) {
				$location.path('pilgrim-rooms/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Pilgrim room
		$scope.remove = function(pilgrimRoom) {

			if ( pilgrimRoom ) {
				pilgrimRoom = PilgrimRooms.get({pilgrimRoomId:pilgrimRoom._id}, function() {
					pilgrimRoom.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.pilgrimRoom.$remove(function() {
					$location.path('pilgrimRooms');
				});
			}

		};

		// Update existing Pilgrim room
		$scope.update = function() {
			var pilgrimRoom = $scope.pilgrimRoom;

			pilgrimRoom.$update(function() {
				$location.path('pilgrim-rooms/' + pilgrimRoom._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewPilgrimRoom = function() {
			$scope.pilgrimRoom = PilgrimRooms.get( {pilgrimRoomId: $stateParams.pilgrimRoomId} );
			$scope.setFormFields(true);
		};

		$scope.toEditPilgrimRoom = function() {
			$scope.pilgrimRoom = PilgrimRooms.get( {pilgrimRoomId: $stateParams.pilgrimRoomId} );
			$scope.setFormFields(false);
		};

	}

]);
