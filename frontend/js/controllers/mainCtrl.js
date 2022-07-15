/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the newStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('mainApp')
	.controller('NewCtrl', function NewCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		$scope.showNews = true;

		var news = $scope.news = store.news;
		var archivated = $scope.archivated = store.archivated;

		setInterval(()=> { store.get(), store.getArchivated() }, 500);

		$scope.loadNews = async function(){
			await store.get();
		}

		$scope.loadArchivated = async function () {
			await store.getArchivated();
		}

		$scope.archiveNew = async function(newNew){
			await store.put(newNew._id);
		}

		$scope.deleteNew = async function(newNew){
			await store.delete(newNew._id);
		}

	});
