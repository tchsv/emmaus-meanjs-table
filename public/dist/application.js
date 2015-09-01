'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'emmauswalkhousingandregistration';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ui.router', 'ui.bootstrap', 'ui.utils', 'ngTable', 'formly', 'formlyBootstrap', 'ngSanitize', 'ngCsv'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('conf-room-tables', ['core']);

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('pilgrim-rooms', ['core']);

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('pilgrims', ['core']);

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('team-rooms', ['core']);

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('users');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('whole-team-lists', ['core']);

'use strict';

// Configuring the new module
angular.module('conf-room-tables').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Conf room tables', 'conf-room-tables', 'dropdown', '/conf-room-tables(/create)?');
		Menus.addSubMenuItem('topbar', 'conf-room-tables', 'List Conf room tables', 'conf-room-tables');
		Menus.addSubMenuItem('topbar', 'conf-room-tables', 'New Conf room table', 'conf-room-tables/create');
	}
]);

'use strict';

//Setting up route
angular.module('conf-room-tables').config(['$stateProvider',
	function($stateProvider) {
		// Conf room tables state routing
		$stateProvider.
		state('listConfRoomTables', {
			url: '/conf-room-tables',
			templateUrl: 'modules/conf-room-tables/views/list-conf-room-tables.client.view.html'
		}).
		state('createConfRoomTable', {
			url: '/conf-room-tables/create',
			templateUrl: 'modules/conf-room-tables/views/create-conf-room-table.client.view.html'
		}).
		state('viewConfRoomTable', {
			url: '/conf-room-tables/:confRoomTableId',
			templateUrl: 'modules/conf-room-tables/views/view-conf-room-table.client.view.html'
		}).
		state('editConfRoomTable', {
			url: '/conf-room-tables/:confRoomTableId/edit',
			templateUrl: 'modules/conf-room-tables/views/edit-conf-room-table.client.view.html'
		});
	}
]);
'use strict';

// Conf room tables controller
angular.module('conf-room-tables').controller('ConfRoomTablesController', ['$scope', '$stateParams', '$location', 'Authentication', 'ConfRoomTables', 'TableSettings', 'ConfRoomTablesForm',
    function ($scope, $stateParams, $location, Authentication, ConfRoomTables, TableSettings, ConfRoomTablesForm ) {
        $scope.authentication = Authentication;
        $scope.tableParams = TableSettings.getParams(ConfRoomTables);
        $scope.confRoomTable = {};



        $scope.setFormFields = function (disabled) {
            $scope.formFields = ConfRoomTablesForm.getFormFields(disabled);
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
        $scope.pushDataToMainTables = function(tableData) {

        };
        // Create new Conf room table
        $scope.create = function () {
            var confRoomTable = new ConfRoomTables($scope.confRoomTable);

            // Redirect after save
            confRoomTable.$save(function (response) {
                $location.path('conf-room-tables/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Conf room table
        $scope.remove = function (confRoomTable) {

            if (confRoomTable) {
                confRoomTable = ConfRoomTables.get({confRoomTableId: confRoomTable._id}, function () {
                    confRoomTable.$remove();
                    $scope.tableParams.reload();
                });

            } else {
                $scope.confRoomTable.$remove(function () {
                    $location.path('confRoomTables');
                });
            }

        };

        // Update existing Conf room table
        $scope.update = function () {
            var confRoomTable = $scope.confRoomTable;

            confRoomTable.$update(function () {
                $location.path('conf-room-tables/' + confRoomTable._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


        $scope.toViewConfRoomTable = function () {
            $scope.confRoomTable = ConfRoomTables.get({confRoomTableId: $stateParams.confRoomTableId});
            $scope.setFormFields(true);
        };

        $scope.toEditConfRoomTable = function () {
            $scope.confRoomTable = ConfRoomTables.get({confRoomTableId: $stateParams.confRoomTableId});
            $scope.setFormFields(false);
        };

    }

]);

'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('conf-room-tables')
    .directive('confRoomPilgrimMemberName', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

        //var localTeamMember = 'xyz';

		var link =  function(scope, element, attrs) {
            var returnList = [];
            if (!attrs.memberid) {
                scope.localPilgrim = 'Empty';
            }
            else if (attrs.memberid == 'Empty') {
                scope.localPilgrim = 'Empty';
            }
            else {
                var nowWholeList = $resource('/pilgrims/' + attrs.memberid);
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    scope.localPilgrim = answer.FirstName + ' ' + answer.LastName;
                });
            }
		};


        return {
            link: link,
            scope: {

            },
            template: '{{localPilgrim}}',
            restrict: 'E',
        }



	}


]);

'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('conf-room-tables')
    .directive('confRoomTeamMemberName', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

        //var localTeamMember = 'xyz';

		var link =  function(scope, element, attrs) {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists/' + attrs.memberid);
                var answer = nowWholeList.get(function() {
                    console.log(answer);
                            scope.localTeamMember = answer.Name;
            });
		};


        return {
            link: link,
            scope: {

            },
            restrict: 'E',
            template: '{{localTeamMember}}',
        }



	}


]);

'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('conf-room-tables').factory('ConfRoomTables', ['$resource',
	function($resource) {
		return $resource('conf-room-tables/:confRoomTableId', { confRoomTableId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
(function () {
    'use strict';

    angular
        .module('conf-room-tables')
        .factory('ConfRoomTablesForm', [ 'ConfRoomTablesMembers',function  (ConfRoomTablesMembers) {
        var getFormFields = function (disabled) {

            var fields = [
                {
                    key: 'tableName',
                    type: 'input',
                    templateOptions: {
                        label: 'Table:',
                        disabled: disabled
                    },
                },
                {
                    key: 'tableLeader',
                    type: 'select',
                    templateOptions: {
                        label: 'Table Leader:',
                        options: ConfRoomTablesMembers.getTableLeaders()
                    },
                },
                {
                    key: 'assistantTableLeader',
                    type: 'select',
                    templateOptions: {
                        label: 'Asst. Table Leader:',
                        options: ConfRoomTablesMembers.getAssistantTableLeaders()
                    },
                },
                {
                    key: 'pilgrim1',
                    type: 'select',
                    templateOptions: {
                        label: 'Pilgrim:',
                        options: ConfRoomTablesMembers.getPilgrims()
                    },
                },
                {
                    key: 'pilgrim2',
                    type: 'select',
                    templateOptions: {
                        label: 'Pilgrim:',
                        options: ConfRoomTablesMembers.getPilgrims()
                    },
                },
                {
                    key: 'pilgrim3',
                    type: 'select',
                    templateOptions: {
                        label: 'Pilgrim:',
                        options: ConfRoomTablesMembers.getPilgrims()
                    },
                },
                {
                    key: 'pilgrim4',
                    type: 'select',
                    templateOptions: {
                        label: 'Pilgrim:',
                        options: ConfRoomTablesMembers.getPilgrims()
                    },
                },
                {
                    key: 'pilgrim5',
                    type: 'select',
                    templateOptions: {
                        label: 'Pilgrim:',
                        options: ConfRoomTablesMembers.getPilgrims()
                    },
                },
                {
                    key: 'pilgrim6',
                    type: 'select',
                    templateOptions: {
                        label: 'Pilgrim:',
                        options: ConfRoomTablesMembers.getPilgrims()
                    },
                },
                {
                    key: 'pilgrim7',
                    type: 'select',
                    templateOptions: {
                        label: 'Pilgrim:',
                        options: ConfRoomTablesMembers.getPilgrims()
                    },
                },
                {
                    key: 'pilgrim8',
                    type: 'select',
                    templateOptions: {
                        label: 'Pilgrim:',
                        options: ConfRoomTablesMembers.getPilgrims()
                    },
                },

            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }])

})();

'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('conf-room-tables')
    .service('ConfRoomTablesMembers', function(){})
    .factory('ConfRoomTablesMembers', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

		var getTableLeaders =  function() {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function() {
                    console.log(answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if (answer.results[i].Committee == 'Table Leaders') {
                            value['name'] = answer.results[i].Name;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                console.log(returnList);
            });
			return returnList;
		};
		var getAssistantTableLeaders = function() {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
            var answer = nowWholeList.get(function() {
                console.log(answer);
                for (var i = 0; i < answer.total; i++) {
                    var value = [];
                    if (answer.results[i].Committee == 'Asst. Table Ldrs.') {
                        value['name'] = answer.results[i].Name;
                        value['value'] = answer.results[i]._id;
                        returnList.push(value);
                    }
                }
                console.log(returnList);
            });
            return returnList;
		};

		var getPilgrims =    function() {
            var returnList = [];
            var nowWholeList = $resource('/pilgrims?count=999&page=1');
            var noneValue = [];
            noneValue['name'] = 'Empty';
            noneValue['value'] = 'Empty';
            returnList.push(noneValue);
            var answer = nowWholeList.get(function() {
                console.log(answer);
                for (var i = 0; i < answer.total; i++) {
                    var value = [];
                        value['name'] = answer.results[i].FirstName + ' ' + answer.results[i].LastName;
                        value['value'] = answer.results[i]._id;
                        returnList.push(value);
                }
                console.log(returnList);
            });
            return returnList;
		};


        return {
            getTableLeaders: getTableLeaders,
            getAssistantTableLeaders: getAssistantTableLeaders,
            getPilgrims: getPilgrims
        }



	}


]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

angular.module('core')
  .directive('ngReallyClick', ['$modal',
    function($modal) {

      var ModalInstanceCtrl = ["$scope", "$modalInstance", function($scope, $modalInstance) {
        $scope.ok = function() {
          $modalInstance.close();
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }];

      return {
        restrict: 'A',
        scope: {
          ngReallyClick: '&'
        },
        link: function(scope, element, attrs) {

          element.bind('click', function() {
            var message = attrs.ngReallyMessage || 'Are you sure ?';

            var modalHtml = '<div class="modal-body">' + message + '</div>';
            modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>';

            var modalInstance = $modal.open({
              template: modalHtml,
              controller: ModalInstanceCtrl
            });

            modalInstance.result.then(function() {
              scope.ngReallyClick();
            }, function() {
              //Modal dismissed
            });

          });

        }

      };

    }

  ]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
(function() {
    'use strict';

    angular
        .module('core')
        .factory('TableSettings', factory);

    factory.$inject = ['ngTableParams'];

    function factory(ngTableParams) {

      var getData = function(Entity) {
        return function($defer, params) {
  				Entity.get(params.url(), function(response) {
  					params.total(response.total);
  					$defer.resolve(response.results);
  				});
  			};

      };

      var params = {
        page: 1,
        count: 999
      };

      var settings = {
        total: 0,
        counts: [5, 10, 15, 999],
        filterDelay: 0,
      };

      /* jshint ignore:start */
      var tableParams = new ngTableParams(params, settings);
      /* jshint ignore:end */

      var getParams = function(Entity) {
        tableParams.settings({getData: getData(Entity)});
        return tableParams;
      };

      var service = {
        getParams: getParams
      };

      return service;

  }

})();

'use strict';

// Configuring the new module
angular.module('pilgrim-rooms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pilgrim Rms', 'pilgrim-rooms', 'dropdown', '/pilgrim-rooms(/create)?');
		Menus.addSubMenuItem('topbar', 'pilgrim-rooms', 'List Pilgrim rooms', 'pilgrim-rooms');
		Menus.addSubMenuItem('topbar', 'pilgrim-rooms', 'New Pilgrim room', 'pilgrim-rooms/create');
	}
]);

'use strict';

//Setting up route
angular.module('pilgrim-rooms').config(['$stateProvider',
	function($stateProvider) {
		// Pilgrim rooms state routing
		$stateProvider.
		state('listPilgrimRooms', {
			url: '/pilgrim-rooms',
			templateUrl: 'modules/pilgrim-rooms/views/list-pilgrim-rooms.client.view.html'
		}).
		state('createPilgrimRoom', {
			url: '/pilgrim-rooms/create',
			templateUrl: 'modules/pilgrim-rooms/views/create-pilgrim-room.client.view.html'
		}).
		state('viewPilgrimRoom', {
			url: '/pilgrim-rooms/:pilgrimRoomId',
			templateUrl: 'modules/pilgrim-rooms/views/view-pilgrim-room.client.view.html'
		}).
		state('editPilgrimRoom', {
			url: '/pilgrim-rooms/:pilgrimRoomId/edit',
			templateUrl: 'modules/pilgrim-rooms/views/edit-pilgrim-room.client.view.html'
		});
	}
]);
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

'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('pilgrim-rooms')
    .directive('confRoomPilgrimMemberName', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

        //var localTeamMember = 'xyz';

		var link =  function(scope, element, attrs) {
            var returnList = [];
            if (!attrs.memberid) {
                scope.localPilgrim = 'Empty';
            }
            else if (attrs.memberid == 'Empty') {
                scope.localPilgrim = 'Empty';
            }
            else {
                var nowWholeList = $resource('/pilgrims/' + attrs.memberid);
                var answer = nowWholeList.get(function () {
                    console.log(answer);
                    scope.localPilgrim = answer.FirstName + ' ' + answer.LastName;
                });
            }
		};


        return {
            link: link,
            scope: {

            },
            template: '{{localPilgrim}}',
            restrict: 'E',
        }



	}


]);

'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('conf-room-tables')
    .directive('confRoomTeamMemberName', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

        //var localTeamMember = 'xyz';

		var link =  function(scope, element, attrs) {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists/' + attrs.memberid);
                var answer = nowWholeList.get(function() {
                    console.log(answer);
                            scope.localTeamMember = answer.Name;
            });
		};


        return {
            link: link,
            scope: {

            },
            restrict: 'E',
            template: '{{localTeamMember}}',
        }



	}


]);

'use strict';

//Pilgrim rooms service used to communicate Pilgrim rooms REST endpoints
angular.module('pilgrim-rooms').factory('PilgrimRooms', ['$resource',
	function($resource) {
		return $resource('pilgrim-rooms/:pilgrimRoomId', { pilgrimRoomId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
(function () {
    'use strict';

    angular
        .module('pilgrim-rooms')
        .factory('PilgrimRoomsForm', ['ConfRoomTablesMembers', function (ConfRoomTablesMembers) {

            var getFormFields = function (disabled) {

                //TeamRoommate: {
                //  type: Schema.Types.ObjectId,
                //      ref: 'WholeTeamList'
                //},
                //PilgrimRoommate1: {
                //  type:Schema.Types.ObjectId,
                //      ref: 'Pilgrim'
                //},
                //PilgrimRoommate2: {
                //  type:Schema.Types.ObjectId,
                //      ref: 'Pilgrim'
                //},
                //RoomNumber: {
                //  type: String,
                //default: '',
                //      trim: true
                //},
                //UpDown: {
                //  type: String,
                //default: '',
                //      trim: true
                //},
                //Building: {
                //  type: String,
                //default: '',
                //      trim: true
                //},


                var fields = [
                    {
                        key: 'TeamRoommate',
                        type: 'input',
                        templateOptions: {
                            label: 'Team Roommate:',
                            options: ConfRoomTablesMembers.getTeam()
                        }
                    },
                    {
                        key: 'PilgrimRoommate1',
                        type: 'input',
                        templateOptions: {
                            label: 'Pilgrim Roommate 1:',
                            options: ConfRoomTablesMembers.getPilgrim()
                        }
                    },
                    {
                        key: 'PilgrimRoommate2',
                        type: 'input',
                        templateOptions: {
                            label: 'Pilgrim Roommate 2:',
                            options: ConfRoomTablesMembers.getPilgrim()
                        }
                    },
                    {
                        key: 'RoomNumber',
                        type: 'input',
                        templateOptions: {
                            label: 'Room Number:',
                            disabled: disabled
                        }
                    },
                    {
                        key: 'UpDown',
                        type: 'input',
                        templateOptions: {
                            label: 'Up Down:',
                            disabled: disabled
                        }
                    },
                    {
                        key: 'Building',
                        type: 'input',
                        templateOptions: {
                            label: 'Building:',
                            disabled: disabled
                        }
                    },

                ];

                return fields;

            };

            var service = {
                getFormFields: getFormFields
            };

            return service;

        }])

})();

'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('pilgrim-rooms')
    .service('ConfRoomTablesMembers', function(){})
    .factory('ConfRoomTablesMembers', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

		var getTeam =  function() {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function() {
                    console.log(answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if ( (answer.results[i].Committee == 'Table Leaders' ) || (answer.results[i].Committee == 'Asst. Table Ldrs.') ) {
                            value['name'] = answer.results[i].Name;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                console.log(returnList);
            });
			return returnList;
		};

		var getPilgrim =    function() {
            var returnList = [];
            var nowWholeList = $resource('/pilgrims?count=999&page=1');
            var noneValue = [];
            noneValue['name'] = 'Empty';
            noneValue['value'] = 'Empty';
            returnList.push(noneValue);
            var answer = nowWholeList.get(function() {
                console.log(answer);
                for (var i = 0; i < answer.total; i++) {
                    var value = [];
                        value['name'] = answer.results[i].FirstName + ' ' + answer.results[i].LastName;
                        value['value'] = answer.results[i]._id;
                        returnList.push(value);
                }
                console.log(returnList);
            });
            return returnList;
		};


        return {
            getTeam: getTeam,
            getPilgrim: getPilgrim
        }



	}


]);

'use strict';

// Configuring the new module
angular.module('pilgrims').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pilgrims', 'pilgrims', 'button', '/pilgrims');
		Menus.addSubMenuItem('topbar', 'pilgrims', 'List Pilgrims', 'pilgrims');
		Menus.addSubMenuItem('topbar', 'pilgrims', 'New Pilgrim', 'pilgrims/create');
	}
]);

'use strict';

//Setting up route
angular.module('pilgrims').config(['$stateProvider',
	function($stateProvider) {
		// Pilgrims state routing
		$stateProvider.
		state('listPilgrims', {
			url: '/pilgrims',
			templateUrl: 'modules/pilgrims/views/list-pilgrims.client.view.html'
		}).
		state('createPilgrim', {
			url: '/pilgrims/create',
			templateUrl: 'modules/pilgrims/views/create-pilgrim.client.view.html'
		}).
		state('viewPilgrim', {
			url: '/pilgrims/:pilgrimId',
			templateUrl: 'modules/pilgrims/views/view-pilgrim.client.view.html'
		}).
		state('editPilgrim', {
			url: '/pilgrims/:pilgrimId/edit',
			templateUrl: 'modules/pilgrims/views/edit-pilgrim.client.view.html'
		});
	}
]);
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
		$scope.cvsMe = function(tableData) {
			var keysS =[];
			angular.forEach(tableData[0], function(value, key) {
				this.push(key);
			}, keysS);
			console.log(keysS);
			tableData.unshift(keysS);
			return(tableData);
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

'use strict';

//Pilgrims service used to communicate Pilgrims REST endpoints
angular.module('pilgrims').factory('Pilgrims', ['$resource',
	function($resource) {
		return $resource('pilgrims/:pilgrimId', { pilgrimId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
(function () {
    'use strict';

    angular
        .module('pilgrims')
        .factory('PilgrimsForm', factory);

    function factory() {

        var getFormFields = function (disabled) {
            /**
             *
             * FirstName    LastName    Street_Address    City_State_Zip    Church    Age    Special
             * Room_Mate1    Room_Mate2    Paid    Amount_Paid    Amount_Due    CheckNumber    RoomNumber    HomeCluster
             *
             */
            var fields = [
                {
                    key: 'FirstName',
                    type: 'input',
                    templateOptions: {
                        label: 'First Name:',
                        disabled: disabled
                    }
                },
                {
                    key: 'LastName',
                    type: 'input',
                    templateOptions: {
                        label: 'Last Name:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Street_Address',
                    type: 'input',
                    templateOptions: {
                        label: 'Street Address:',
                        disabled: disabled
                    }
                },
                {
                    key: 'City_State_Zip',
                    type: 'input',
                    templateOptions: {
                        label: 'City State, Zip:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Church',
                    type: 'input',
                    templateOptions: {
                        label: 'Church:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Age',
                    type: 'input',
                    templateOptions: {
                        label: 'Age:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Special',
                    type: 'input',
                    templateOptions: {
                        label: 'Special Info:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Room_Mate1',
                    type: 'input',
                    templateOptions: {
                        label: 'Room Mate 1:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Room_Mate2',
                    type: 'input',
                    templateOptions: {
                        label: 'Room Mate 2:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Paid',
                    type: 'radio',
                    templateOptions: {
                        label: 'Paid:',
                        disabled: disabled,
                        options: [{name: "Yes", value: "Yes"},
                            {name: "No", value: "No"},
                        ]
                    }
                },
                {
                    key: 'Amount_Paid',
                    type: 'input',
                    templateOptions: {
                        label: 'Amount Recived:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Amount_Due',
                    type: 'input',
                    templateOptions: {
                        label: 'Amount Due:',
                        disabled: disabled
                    }
                },
                {
                    key: 'CheckNumber',
                    type: 'input',
                    templateOptions: {
                        label: 'Check Number:',
                        disabled: disabled
                    }
                },
                {
                    key: 'RoomNumber',
                    type: 'input',
                    templateOptions: {
                        label: 'Room Number:',
                        disabled: disabled
                    }
                },
                {
                    key: 'HomeCluster',
                    type: 'input',
                    templateOptions: {
                        label: 'Home Cluster:',
                        disabled: disabled
                    }
                }
            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }

})();

'use strict';

// Configuring the new module
angular.module('team-rooms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Team Rms', 'team-rooms', 'dropdown', '/team-rooms(/create)?');
		Menus.addSubMenuItem('topbar', 'team-rooms', 'List Team rooms', 'team-rooms');
		Menus.addSubMenuItem('topbar', 'team-rooms', 'New Team room', 'team-rooms/create');
	}
]);

'use strict';

//Setting up route
angular.module('team-rooms').config(['$stateProvider',
	function($stateProvider) {
		// Team rooms state routing
		$stateProvider.
		state('listTeamRooms', {
			url: '/team-rooms',
			templateUrl: 'modules/team-rooms/views/list-team-rooms.client.view.html'
		}).
		state('createTeamRoom', {
			url: '/team-rooms/create',
			templateUrl: 'modules/team-rooms/views/create-team-room.client.view.html'
		}).
		state('viewTeamRoom', {
			url: '/team-rooms/:teamRoomId',
			templateUrl: 'modules/team-rooms/views/view-team-room.client.view.html'
		}).
		state('editTeamRoom', {
			url: '/team-rooms/:teamRoomId/edit',
			templateUrl: 'modules/team-rooms/views/edit-team-room.client.view.html'
		});
	}
]);
'use strict';

// Team rooms controller
angular.module('team-rooms').controller('TeamRoomsController', ['$scope', '$stateParams', '$location', 'Authentication', 'TeamRooms', 'TableSettings', 'TeamRoomsForm',
	function($scope, $stateParams, $location, Authentication, TeamRooms, TableSettings, TeamRoomsForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(TeamRooms);
		$scope.teamRoom = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = TeamRoomsForm.getFormFields(disabled);
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

		// Create new Team room
		$scope.create = function() {
			var teamRoom = new TeamRooms($scope.teamRoom);

			// Redirect after save
			teamRoom.$save(function(response) {
				$location.path('team-rooms/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Team room
		$scope.remove = function(teamRoom) {

			if ( teamRoom ) {
				teamRoom = TeamRooms.get({teamRoomId:teamRoom._id}, function() {
					teamRoom.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.teamRoom.$remove(function() {
					$location.path('teamRooms');
				});
			}

		};

		// Update existing Team room
		$scope.update = function() {
			var teamRoom = $scope.teamRoom;

			teamRoom.$update(function() {
				$location.path('team-rooms/' + teamRoom._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewTeamRoom = function() {
			$scope.teamRoom = TeamRooms.get( {teamRoomId: $stateParams.teamRoomId} );
			$scope.setFormFields(true);
		};

		$scope.toEditTeamRoom = function() {
			$scope.teamRoom = TeamRooms.get( {teamRoomId: $stateParams.teamRoomId} );
			$scope.setFormFields(false);
		};

	}

]);

'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('team-rooms')
    .directive('confRoomTeamMemberName', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

        //var localTeamMember = 'xyz';

		var link =  function(scope, element, attrs) {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists/' + attrs.memberid);
                var answer = nowWholeList.get(function() {
                    console.log(answer);
                            scope.localTeamMember = answer.Name;
            });
		};
        return {
            link: link,
            scope: {

            },
            restrict: 'E',
            template: '{{localTeamMember}}',
        }
	}
]);

'use strict';

//Team rooms service used to communicate Team rooms REST endpoints
angular.module('team-rooms').factory('TeamRooms', ['$resource',
	function($resource) {
		return $resource('team-rooms/:teamRoomId', { teamRoomId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
(function () {
    'use strict';

    angular
        .module('team-rooms')
        .factory('TeamRoomsForm', [ 'ConfRoomTablesMembers',function  (ConfRoomTablesMembers) {

        var getFormFields = function (disabled) {


            //Roommate1: {
            //  type: Schema.Types.ObjectId,
            //      ref: 'WholeTeamList'
            //},
            //Roommate2: {
            //  type: Schema.Types.ObjectId,
            //      ref: 'WholeTeamList'
            //},
            //RoomNumber: {
            //  type: String,
            //default: '',
            //      trim: true
            //},
            //Building: {
            //  type: String,
            //default: '',
            //      trim: true
            //},

            var fields = [
                {
                    key: 'Roommate1',
                    type: 'select',
                    templateOptions: {
                        label: 'Roommate 1:',
                        options: ConfRoomTablesMembers.getTeamRetreat()
                    }
                },
                {
                    key: 'Roommate2',
                    type: 'select',
                    templateOptions: {
                        label: 'Roommate 2:',
                        options: ConfRoomTablesMembers.getTeamRetreat()
                    }
                },
                {
                    key: 'RoomNumber',
                    type: 'input',
                    templateOptions: {
                        label: 'Room Number:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Building',
                    type: 'input',
                    templateOptions: {
                        label: 'Building:',
                        disabled: disabled
                    }
                },

            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;


        }])

})();

'use strict';

//Conf room tables service used to communicate Conf room tables REST endpoints
angular.module('team-rooms')
    .service('ConfRoomTablesMembers', function(){})
    .factory('ConfRoomTablesMembers', [ 'WholeTeamLists', 'TableSettings', 'Pilgrims', '$resource',
	function( WholeTeamLists, TableSettings, Pilgrims , $resource) {

		var getTeamRetreat =  function() {
            var returnList = [];
            var nowWholeList = $resource('/whole-team-lists?count=999&page=1');
                var answer = nowWholeList.get(function() {
                    console.log(answer);
                    for (var i = 0; i < answer.total; i++) {
                        var value = [];
                        if (answer.results[i].Building == 'Retreat Center') {
                            value['name'] = answer.results[i].Name;
                            value['value'] = answer.results[i]._id;
                            returnList.push(value);
                        }
                    }
                console.log(returnList);
            });
			return returnList;
		};


        return {
            getTeamRetreat: getTeamRetreat
        }



	}


]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the new module
angular.module('whole-team-lists').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Whole', 'whole-team-lists', 'button', '/whole-team-lists');
		Menus.addSubMenuItem('topbar', 'whole-team-lists', 'List Whole team lists', 'whole-team-lists');
		Menus.addSubMenuItem('topbar', 'whole-team-lists', 'List Paid team lists', 'paid-team-lists');
		//Menus.addSubMenuItem('topbar', 'whole-team-lists', 'New Whole team list', 'whole-team-lists/create');
		Menus.addMenuItem('topbar', 'Pd.', 'paid-team-lists', 'button', '/paid-team-lists');
		Menus.addMenuItem('topbar', 'Summary RC', 'paid-team-summary-lists', 'button', '/paid-team-summary-lists');
	}
]);

'use strict';

//Setting up route
angular.module('whole-team-lists').config(['$stateProvider',
    function ($stateProvider) {
        // Whole team lists state routing
        $stateProvider.
            state('listWholeTeamLists', {
                url: '/whole-team-lists',
                templateUrl: 'modules/whole-team-lists/views/list-whole-team-lists.client.view.html'
            }).
            state('listPaidTeamLists', {
                url: '/paid-team-lists',
                templateUrl: 'modules/whole-team-lists/views/list-paid-team-lists.client.view.html'
            }).
            state('listPaidTeamSummaryLists', {
                url: '/paid-team-summary-lists',
                templateUrl: 'modules/whole-team-lists/views/list-paid-team-summary-lists.client.view.html'
            }).
            state('createWholeTeamList', {
                url: '/whole-team-lists/create',
                templateUrl: 'modules/whole-team-lists/views/create-whole-team-list.client.view.html'
            }).
            state('viewWholeTeamList', {
                url: '/whole-team-lists/:wholeTeamListId',
                templateUrl: 'modules/whole-team-lists/views/view-whole-team-list.client.view.html'
            }).
            state('editWholeTeamList', {
                url: '/whole-team-lists/:wholeTeamListId/edit',
                templateUrl: 'modules/whole-team-lists/views/edit-whole-team-list.client.view.html'
            });
    }
]);

'use strict';

// Whole team lists controller
angular.module('whole-team-lists').controller('WholeTeamListsController', ['$scope', '$stateParams', '$location', 'Authentication', 'WholeTeamLists', 'TableSettings', 'WholeTeamListsForm',
    function ($scope, $stateParams, $location, Authentication, WholeTeamLists, TableSettings, WholeTeamListsForm) {
        $scope.authentication = Authentication;
        $scope.tableParams = TableSettings.getParams(WholeTeamLists);
        $scope.wholeTeamList = {};
        $scope.retreatCenterAll = function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                if ( stuff[i].Building == 'Retreat Center') {
                    sumValue++;
                }
            }
            return sumValue;
        };
        /**
         * Checking for each team member in the Retreat Center that has paid
         * @param stuff
         * @returns {number}
         */
        $scope.retreatCenterPaid= function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                if ( stuff[i].Building == 'Retreat Center') {
                    if (stuff[i].Paid == 'Yes' ){
                    sumValue++;
                }}
            }
            return sumValue;
        };
        $scope.retreatCenterPaidWithRoomMate= function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                var value = stuff[i];
                if ( stuff[i].Building == 'Retreat Center') {
                    if (stuff[i].Paid == 'Yes' ){
                        if (value.Roommate.length != 0) {
                            sumValue++;
                }}}
            }
            return sumValue;
        };
        $scope.retreatCenterPaidWithOutRoomMate= function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                var value = stuff[i];
                if ( stuff[i].Building == 'Retreat Center') {
                    if (stuff[i].Paid == 'Yes' ){
                        if (value.Roommate.length == 0) {
                            sumValue++;
                        }}}

            }
            return sumValue;
        };
        $scope.retreatCenterNeedRoomMate= function(stuff) {
            var sumValue = ' ';
            if (stuff.length == 0 ){
                return ' ';
            }
            for (var i = 0; i < stuff.length; i++) {
                var value = stuff[i];
                if ( stuff[i].Building == 'Retreat Center') {
                    if (stuff[i].Paid == 'Yes' ){
                        if (value.Roommate.length == 0) {
                            sumValue += value.Name + ',';
                        }}}

            }
            return sumValue;
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
        $scope.totalUnPaid= function(stuff) {
            var sumValue =0;
            if (stuff.length == 0 ){
                return 0;
            }
            for (var i = 0; i < stuff.length; i++) {
                if ( stuff[i].Paid == 'No') {
                    sumValue++;
                }
            }
            return sumValue;
        };


        $scope.setFormFields = function (disabled) {
            $scope.formFields = WholeTeamListsForm.getFormFields(disabled);
        };


        // Create new Whole team list
        $scope.create = function () {
            var wholeTeamList = new WholeTeamLists($scope.wholeTeamList);

            // Redirect after save
            wholeTeamList.$save(function (response) {
                $location.path('whole-team-lists/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Whole team list
        $scope.remove = function (wholeTeamList) {

            if (wholeTeamList) {
                wholeTeamList = WholeTeamLists.get({wholeTeamListId: wholeTeamList._id}, function () {
                    wholeTeamList.$remove();
                    $scope.tableParams.reload();
                });

            } else {
                $scope.wholeTeamList.$remove(function () {
                    $location.path('wholeTeamLists');
                });
            }

        };

        // Update existing Whole team list
        $scope.update = function () {
            var wholeTeamList = $scope.wholeTeamList;

            wholeTeamList.$update(function () {
                $location.path('whole-team-lists/' + wholeTeamList._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


        $scope.toViewWholeTeamList = function () {
            $scope.wholeTeamList = WholeTeamLists.get({wholeTeamListId: $stateParams.wholeTeamListId});
            $scope.setFormFields(true);
        };

        $scope.toEditWholeTeamList = function () {
            $scope.wholeTeamList = WholeTeamLists.get({wholeTeamListId: $stateParams.wholeTeamListId});
            $scope.setFormFields(false);
        };

    }

]);

'use strict';

//Whole team lists service used to communicate Whole team lists REST endpoints
angular.module('whole-team-lists').factory('WholeTeamLists', ['$resource',
	function($resource) {
		return $resource('whole-team-lists/:wholeTeamListId', { wholeTeamListId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
(function () {
    'use strict';

    angular
        .module('whole-team-lists')
        .factory('WholeTeamListsForm', factory);

    function factory() {

        var getFormFields = function (disabled) {

            var fields = [
                {
                    key: 'Name',
                    type: 'input',
                    templateOptions: {
                        label: 'Name:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Committee',
                    type: 'input',
                    templateOptions: {
                        label: 'Committee:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Paid',
                    type: 'radio',
                    templateOptions: {
                        label: 'Paid:',
                        disabled: disabled,
                        options: [{name: "Yes", value: "Yes"},
                            {name: "No", value: "No"},
                        ]
                    }
                },
                {
                    key: 'PaidAmount',
                    type: 'input',
                    templateOptions: {
                        label: 'Paid Amount:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Roommate',
                    type: 'input',
                    templateOptions: {
                        label: 'Roommate:',
                        disabled: disabled,
                    }
                },
                {
                    key: 'Building',
                    type: 'select',
                    templateOptions: {
                        label: 'Building:',
                        disabled: disabled,
                        options: [{name: "Retreat Center", value: "Retreat Center"},
                            {name: "Campers", value: "Campers"},
                            {name: "None", value: "None"},
                            {name: "Main Lodge - East Wing", value: "Main Lodge - East Wing"}]
                    }
                },
                {
                    key: 'Chairperson',
                    type: 'input',
                    templateOptions: {
                        label: 'Chairperson:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Talk',
                    type: 'input',
                    templateOptions: {
                        label: 'Talk:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Phone',
                    type: 'input',
                    templateOptions: {
                        label: 'Phone:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Email',
                    type: 'input',
                    templateOptions: {
                        label: 'Email:',
                        disabled: disabled
                    }
                },
                {
                    key: 'Street_Address',
                    type: 'input',
                    templateOptions: {
                        label: 'Street Address:',
                        disabled: disabled
                    }
                },
                {
                    key: 'City_State_Zip',
                    type: 'input',
                    templateOptions: {
                        label: 'City, State, Zip:',
                        disabled: disabled
                    }
                },

            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }

})();
