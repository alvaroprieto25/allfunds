/*global angular */

/**
 * The main News app module
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
					return newStorage;
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
