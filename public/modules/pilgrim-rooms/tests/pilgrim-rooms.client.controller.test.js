'use strict';

(function() {
	// Pilgrim rooms Controller Spec
	describe('Pilgrim rooms Controller Tests', function() {
		// Initialize global variables
		var PilgrimRoomsController,
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

			// Initialize the Pilgrim rooms controller.
			PilgrimRoomsController = $controller('PilgrimRoomsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pilgrim room object fetched from XHR', inject(function(PilgrimRooms) {
			// Create sample Pilgrim room using the Pilgrim rooms service
			var samplePilgrimRoom = new PilgrimRooms({
				name: 'New Pilgrim room'
			});

			// Create a sample Pilgrim rooms array that includes the new Pilgrim room
			var samplePilgrimRooms = [samplePilgrimRoom];

			// Set GET response
			$httpBackend.expectGET('pilgrim-rooms').respond(samplePilgrimRooms);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pilgrimRooms).toEqualData(samplePilgrimRooms);
		}));

		it('$scope.findOne() should create an array with one Pilgrim room object fetched from XHR using a pilgrimRoomId URL parameter', inject(function(PilgrimRooms) {
			// Define a sample Pilgrim room object
			var samplePilgrimRoom = new PilgrimRooms({
				name: 'New Pilgrim room'
			});

			// Set the URL parameter
			$stateParams.pilgrimRoomId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pilgrim-rooms\/([0-9a-fA-F]{24})$/).respond(samplePilgrimRoom);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pilgrimRoom).toEqualData(samplePilgrimRoom);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PilgrimRooms) {
			// Create a sample Pilgrim room object
			var samplePilgrimRoomPostData = new PilgrimRooms({
				name: 'New Pilgrim room'
			});

			// Create a sample Pilgrim room response
			var samplePilgrimRoomResponse = new PilgrimRooms({
				_id: '525cf20451979dea2c000001',
				name: 'New Pilgrim room'
			});

			// Fixture mock form input values
			scope.name = 'New Pilgrim room';

			// Set POST response
			$httpBackend.expectPOST('pilgrim-rooms', samplePilgrimRoomPostData).respond(samplePilgrimRoomResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pilgrim room was created
			expect($location.path()).toBe('/pilgrim-rooms/' + samplePilgrimRoomResponse._id);
		}));

		it('$scope.update() should update a valid Pilgrim room', inject(function(PilgrimRooms) {
			// Define a sample Pilgrim room put data
			var samplePilgrimRoomPutData = new PilgrimRooms({
				_id: '525cf20451979dea2c000001',
				name: 'New Pilgrim room'
			});

			// Mock Pilgrim room in scope
			scope.pilgrimRoom = samplePilgrimRoomPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pilgrim-rooms\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pilgrim-rooms/' + samplePilgrimRoomPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pilgrimRoomId and remove the Pilgrim room from the scope', inject(function(PilgrimRooms) {
			// Create new Pilgrim room object
			var samplePilgrimRoom = new PilgrimRooms({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pilgrim rooms array and include the Pilgrim room
			scope.pilgrimRooms = [samplePilgrimRoom];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pilgrim-rooms\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePilgrimRoom);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pilgrimRooms.length).toBe(0);
		}));
	});
}());