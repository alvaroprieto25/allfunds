/*global angular */

/**
 * The main NewsMVC app module
 *
 * @type {angular.Module}
 */
angular.module('mainApp', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'NewCtrl',
			templateUrl: 'index.html',
			resolve: {
				store: function (newStorage) {
					// Get the correct module (API or localStorage).
					return newStorage.then(function (module) {
						module.get(); // Fetch the news records in the background.
						return module;
					});
				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});
