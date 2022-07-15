/*global angular */

/**
 * Services that persists and retrieves news from backend API.
 */
angular.module('mainApp')
	.factory('newStorage', function ($http, $injector) {
		'use strict';

		var store = {
			news: [],
			archivated: [],

			delete: function (newNew) {
				return $http.delete('http://localhost:3000/deleteNew/' + newNew)
					.then(function success() {
						return store.archivated;
					});
			},

			get: function () {
				return $http.get('http://localhost:3000/news')
					.then(function (resp) {
						angular.copy(resp.data, store.news);
						return store.news;
					});
			},

			getArchivated: function(){
				return $http.get('http://localhost:3000/archivated')
					.then(function (resp) {
						angular.copy(resp.data, store.archivated);
						return store.archivated;
					});
			},

			insert: function (newNew) {
				var originalNews = store.news.slice(0);

				return $http.post('http://localhost:3000/addNew', newNew)
					.then(function success(resp) {
						newNew.id = resp.data.id;
						store.news.push(newNew);
						return store.news;
					}, function error() {
						angular.copy(originalNews, store.news);
						return store.news;
					});
			},

			put: function (newNew) {
				var originalNews = store.news.slice(0);

				return $http.put('http://localhost:3000/archive/' + newNew)
					.then(function success() {
						return store.news;
					});
			}
		};

		return store;
	})