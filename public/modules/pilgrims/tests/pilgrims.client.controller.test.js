'use strict';

(function() {
	// Pilgrims Controller Spec
	describe('Pilgrims Controller Tests', function() {
		// Initialize global variables
		var PilgrimsController,
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

			// Initialize the Pilgrims controller.
			PilgrimsController = $controller('PilgrimsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pilgrim object fetched from XHR', inject(function(Pilgrims) {
			// Create sample Pilgrim using the Pilgrims service
			var samplePilgrim = new Pilgrims({
				name: 'New Pilgrim'
			});

			// Create a sample Pilgrims array that includes the new Pilgrim
			var samplePilgrims = [samplePilgrim];

			// Set GET response
			$httpBackend.expectGET('pilgrims').respond(samplePilgrims);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pilgrims).toEqualData(samplePilgrims);
		}));

		it('$scope.findOne() should create an array with one Pilgrim object fetched from XHR using a pilgrimId URL parameter', inject(function(Pilgrims) {
			// Define a sample Pilgrim object
			var samplePilgrim = new Pilgrims({
				name: 'New Pilgrim'
			});

			// Set the URL parameter
			$stateParams.pilgrimId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pilgrims\/([0-9a-fA-F]{24})$/).respond(samplePilgrim);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pilgrim).toEqualData(samplePilgrim);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pilgrims) {
			// Create a sample Pilgrim object
			var samplePilgrimPostData = new Pilgrims({
				name: 'New Pilgrim'
			});

			// Create a sample Pilgrim response
			var samplePilgrimResponse = new Pilgrims({
				_id: '525cf20451979dea2c000001',
				name: 'New Pilgrim'
			});

			// Fixture mock form input values
			scope.name = 'New Pilgrim';

			// Set POST response
			$httpBackend.expectPOST('pilgrims', samplePilgrimPostData).respond(samplePilgrimResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pilgrim was created
			expect($location.path()).toBe('/pilgrims/' + samplePilgrimResponse._id);
		}));

		it('$scope.update() should update a valid Pilgrim', inject(function(Pilgrims) {
			// Define a sample Pilgrim put data
			var samplePilgrimPutData = new Pilgrims({
				_id: '525cf20451979dea2c000001',
				name: 'New Pilgrim'
			});

			// Mock Pilgrim in scope
			scope.pilgrim = samplePilgrimPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pilgrims\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pilgrims/' + samplePilgrimPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pilgrimId and remove the Pilgrim from the scope', inject(function(Pilgrims) {
			// Create new Pilgrim object
			var samplePilgrim = new Pilgrims({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pilgrims array and include the Pilgrim
			scope.pilgrims = [samplePilgrim];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pilgrims\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePilgrim);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pilgrims.length).toBe(0);
		}));
	});
}());