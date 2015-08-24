'use strict';

(function() {
	// Team rooms Controller Spec
	describe('Team rooms Controller Tests', function() {
		// Initialize global variables
		var TeamRoomsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Team rooms controller.
			TeamRoomsController = $controller('TeamRoomsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Team room object fetched from XHR', inject(function(TeamRooms) {
			// Create sample Team room using the Team rooms service
			var sampleTeamRoom = new TeamRooms({
				name: 'New Team room'
			});

			// Create a sample Team rooms array that includes the new Team room
			var sampleTeamRooms = [sampleTeamRoom];

			// Set GET response
			$httpBackend.expectGET('team-rooms').respond(sampleTeamRooms);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.teamRooms).toEqualData(sampleTeamRooms);
		}));

		it('$scope.findOne() should create an array with one Team room object fetched from XHR using a teamRoomId URL parameter', inject(function(TeamRooms) {
			// Define a sample Team room object
			var sampleTeamRoom = new TeamRooms({
				name: 'New Team room'
			});

			// Set the URL parameter
			$stateParams.teamRoomId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/team-rooms\/([0-9a-fA-F]{24})$/).respond(sampleTeamRoom);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.teamRoom).toEqualData(sampleTeamRoom);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(TeamRooms) {
			// Create a sample Team room object
			var sampleTeamRoomPostData = new TeamRooms({
				name: 'New Team room'
			});

			// Create a sample Team room response
			var sampleTeamRoomResponse = new TeamRooms({
				_id: '525cf20451979dea2c000001',
				name: 'New Team room'
			});

			// Fixture mock form input values
			scope.name = 'New Team room';

			// Set POST response
			$httpBackend.expectPOST('team-rooms', sampleTeamRoomPostData).respond(sampleTeamRoomResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Team room was created
			expect($location.path()).toBe('/team-rooms/' + sampleTeamRoomResponse._id);
		}));

		it('$scope.update() should update a valid Team room', inject(function(TeamRooms) {
			// Define a sample Team room put data
			var sampleTeamRoomPutData = new TeamRooms({
				_id: '525cf20451979dea2c000001',
				name: 'New Team room'
			});

			// Mock Team room in scope
			scope.teamRoom = sampleTeamRoomPutData;

			// Set PUT response
			$httpBackend.expectPUT(/team-rooms\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/team-rooms/' + sampleTeamRoomPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid teamRoomId and remove the Team room from the scope', inject(function(TeamRooms) {
			// Create new Team room object
			var sampleTeamRoom = new TeamRooms({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Team rooms array and include the Team room
			scope.teamRooms = [sampleTeamRoom];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/team-rooms\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTeamRoom);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.teamRooms.length).toBe(0);
		}));
	});
}());