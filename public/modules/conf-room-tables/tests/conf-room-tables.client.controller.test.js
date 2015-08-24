'use strict';

(function() {
	// Conf room tables Controller Spec
	describe('Conf room tables Controller Tests', function() {
		// Initialize global variables
		var ConfRoomTablesController,
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

			// Initialize the Conf room tables controller.
			ConfRoomTablesController = $controller('ConfRoomTablesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Conf room table object fetched from XHR', inject(function(ConfRoomTables) {
			// Create sample Conf room table using the Conf room tables service
			var sampleConfRoomTable = new ConfRoomTables({
				name: 'New Conf room table'
			});

			// Create a sample Conf room tables array that includes the new Conf room table
			var sampleConfRoomTables = [sampleConfRoomTable];

			// Set GET response
			$httpBackend.expectGET('conf-room-tables').respond(sampleConfRoomTables);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.confRoomTables).toEqualData(sampleConfRoomTables);
		}));

		it('$scope.findOne() should create an array with one Conf room table object fetched from XHR using a confRoomTableId URL parameter', inject(function(ConfRoomTables) {
			// Define a sample Conf room table object
			var sampleConfRoomTable = new ConfRoomTables({
				name: 'New Conf room table'
			});

			// Set the URL parameter
			$stateParams.confRoomTableId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/conf-room-tables\/([0-9a-fA-F]{24})$/).respond(sampleConfRoomTable);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.confRoomTable).toEqualData(sampleConfRoomTable);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ConfRoomTables) {
			// Create a sample Conf room table object
			var sampleConfRoomTablePostData = new ConfRoomTables({
				name: 'New Conf room table'
			});

			// Create a sample Conf room table response
			var sampleConfRoomTableResponse = new ConfRoomTables({
				_id: '525cf20451979dea2c000001',
				name: 'New Conf room table'
			});

			// Fixture mock form input values
			scope.name = 'New Conf room table';

			// Set POST response
			$httpBackend.expectPOST('conf-room-tables', sampleConfRoomTablePostData).respond(sampleConfRoomTableResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Conf room table was created
			expect($location.path()).toBe('/conf-room-tables/' + sampleConfRoomTableResponse._id);
		}));

		it('$scope.update() should update a valid Conf room table', inject(function(ConfRoomTables) {
			// Define a sample Conf room table put data
			var sampleConfRoomTablePutData = new ConfRoomTables({
				_id: '525cf20451979dea2c000001',
				name: 'New Conf room table'
			});

			// Mock Conf room table in scope
			scope.confRoomTable = sampleConfRoomTablePutData;

			// Set PUT response
			$httpBackend.expectPUT(/conf-room-tables\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/conf-room-tables/' + sampleConfRoomTablePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid confRoomTableId and remove the Conf room table from the scope', inject(function(ConfRoomTables) {
			// Create new Conf room table object
			var sampleConfRoomTable = new ConfRoomTables({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Conf room tables array and include the Conf room table
			scope.confRoomTables = [sampleConfRoomTable];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/conf-room-tables\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleConfRoomTable);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.confRoomTables.length).toBe(0);
		}));
	});
}());