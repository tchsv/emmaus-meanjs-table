'use strict';

(function() {
	// Communities Controller Spec
	describe('Communities Controller Tests', function() {
		// Initialize global variables
		var CommunitiesController,
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

			// Initialize the Communities controller.
			CommunitiesController = $controller('CommunitiesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Community object fetched from XHR', inject(function(Communities) {
			// Create sample Community using the Communities service
			var sampleCommunity = new Communities({
				name: 'New Community'
			});

			// Create a sample Communities array that includes the new Community
			var sampleCommunities = [sampleCommunity];

			// Set GET response
			$httpBackend.expectGET('communities').respond(sampleCommunities);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.communities).toEqualData(sampleCommunities);
		}));

		it('$scope.findOne() should create an array with one Community object fetched from XHR using a communityId URL parameter', inject(function(Communities) {
			// Define a sample Community object
			var sampleCommunity = new Communities({
				name: 'New Community'
			});

			// Set the URL parameter
			$stateParams.communityId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/communities\/([0-9a-fA-F]{24})$/).respond(sampleCommunity);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.community).toEqualData(sampleCommunity);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Communities) {
			// Create a sample Community object
			var sampleCommunityPostData = new Communities({
				name: 'New Community'
			});

			// Create a sample Community response
			var sampleCommunityResponse = new Communities({
				_id: '525cf20451979dea2c000001',
				name: 'New Community'
			});

			// Fixture mock form input values
			scope.name = 'New Community';

			// Set POST response
			$httpBackend.expectPOST('communities', sampleCommunityPostData).respond(sampleCommunityResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Community was created
			expect($location.path()).toBe('/communities/' + sampleCommunityResponse._id);
		}));

		it('$scope.update() should update a valid Community', inject(function(Communities) {
			// Define a sample Community put data
			var sampleCommunityPutData = new Communities({
				_id: '525cf20451979dea2c000001',
				name: 'New Community'
			});

			// Mock Community in scope
			scope.community = sampleCommunityPutData;

			// Set PUT response
			$httpBackend.expectPUT(/communities\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/communities/' + sampleCommunityPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid communityId and remove the Community from the scope', inject(function(Communities) {
			// Create new Community object
			var sampleCommunity = new Communities({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Communities array and include the Community
			scope.communities = [sampleCommunity];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/communities\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCommunity);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.communities.length).toBe(0);
		}));
	});
}());