'use strict';

module.exports = {
	app: {
		title: 'EmmausWalkHousingAndRegistration',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js app to track walk room and board',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3200,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/ng-table/ng-table.min.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/ng-table/ng-table.min.js',
				'public/lib/api-check/dist/apiCheck.min.js',
				'public/lib/angular-formly/dist/formly.min.js',
				'public/lib/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
