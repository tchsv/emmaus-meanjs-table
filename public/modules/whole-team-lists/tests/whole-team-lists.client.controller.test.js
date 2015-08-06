'use strict';

(function() {
	// Whole team lists Controller Spec
	describe('Whole team lists Controller Tests', function() {
		// Initialize global variables
		var WholeTeamListsController,
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

			// Initialize the Whole team lists controller.
			WholeTeamListsController = $controller('WholeTeamListsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Whole team list object fetched from XHR', inject(function(WholeTeamLists) {
			// Create sample Whole team list using the Whole team lists service
			var sampleWholeTeamList = new WholeTeamLists({
				name: 'New Whole team list'
			});

			// Create a sample Whole team lists array that includes the new Whole team list
			var sampleWholeTeamLists = [sampleWholeTeamList];

			// Set GET response
			$httpBackend.expectGET('whole-team-lists').respond(sampleWholeTeamLists);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.wholeTeamLists).toEqualData(sampleWholeTeamLists);
		}));

		it('$scope.findOne() should create an array with one Whole team list object fetched from XHR using a wholeTeamListId URL parameter', inject(function(WholeTeamLists) {
			// Define a sample Whole team list object
			var sampleWholeTeamList = new WholeTeamLists({
				name: 'New Whole team list'
			});

			// Set the URL parameter
			$stateParams.wholeTeamListId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/whole-team-lists\/([0-9a-fA-F]{24})$/).respond(sampleWholeTeamList);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.wholeTeamList).toEqualData(sampleWholeTeamList);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(WholeTeamLists) {
			// Create a sample Whole team list object
			var sampleWholeTeamListPostData = new WholeTeamLists({
				name: 'New Whole team list'
			});

			// Create a sample Whole team list response
			var sampleWholeTeamListResponse = new WholeTeamLists({
				_id: '525cf20451979dea2c000001',
				name: 'New Whole team list'
			});

			// Fixture mock form input values
			scope.name = 'New Whole team list';

			// Set POST response
			$httpBackend.expectPOST('whole-team-lists', sampleWholeTeamListPostData).respond(sampleWholeTeamListResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Whole team list was created
			expect($location.path()).toBe('/whole-team-lists/' + sampleWholeTeamListResponse._id);
		}));

		it('$scope.update() should update a valid Whole team list', inject(function(WholeTeamLists) {
			// Define a sample Whole team list put data
			var sampleWholeTeamListPutData = new WholeTeamLists({
				_id: '525cf20451979dea2c000001',
				name: 'New Whole team list'
			});

			// Mock Whole team list in scope
			scope.wholeTeamList = sampleWholeTeamListPutData;

			// Set PUT response
			$httpBackend.expectPUT(/whole-team-lists\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/whole-team-lists/' + sampleWholeTeamListPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid wholeTeamListId and remove the Whole team list from the scope', inject(function(WholeTeamLists) {
			// Create new Whole team list object
			var sampleWholeTeamList = new WholeTeamLists({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Whole team lists array and include the Whole team list
			scope.wholeTeamLists = [sampleWholeTeamList];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/whole-team-lists\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleWholeTeamList);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.wholeTeamLists.length).toBe(0);
		}));
	});
}());