/*global angular */

/**
 * Services that persists and retrieves news from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('mainApp')
	.factory('newStorage', function ($http, $injector) {
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get('/api')
			.then(function () {
				return $injector.get('api');
			}, function () {
				return $injector.get('localStorage');
			});
	})

	.factory('api', function ($http) {
		'use strict';

		var store = {
			news: [],

			delete: function (newNew) {
				var originalNews = store.news.slice(0);

				store.news.splice(store.news.indexOf(newNew), 1);

				return $http.delete('/api/todos/' + newNew.id)
					.then(function success() {
						return store.news;
					}, function error() {
						angular.copy(originalNews, store.news);
						return originalNews;
					});
			},

			get: function () {
				return $http.get('/api/todos')
					.then(function (resp) {
						angular.copy(resp.data, store.news);
						return store.news;
					});
			},

			insert: function (newNew) {
				var originalNews = store.news.slice(0);

				return $http.post('/api/todos', newNew)
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

				return $http.put('/api/todos/' + newNew.id, newNew)
					.then(function success() {
						return store.news;
					}, function error() {
						angular.copy(originalNews, store.news);
						return originalNews;
					});
			}
		};

		return store;
	})

	.factory('localStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'news-angularjs';

		var store = {
			news: [],

			_getFromLocalStorage: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (news) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(news));
			},

			clearCompleted: function () {
				var deferred = $q.defer();

				var nonArchivedNews = [];
				var archivedNews = [];
				store.news.forEach(function (newNew) {
					if (newNew.completed) {
						nonArchivedNews.push(newNew);
					} else {
						archivedNews.push(newNew);
					}
				});

				angular.copy(archivedNews, store.news);

				store._saveToLocalStorage(store.news);
				deferred.resolve(store.news);

				return deferred.promise;
			},

			delete: function (newNew) {
				var deferred = $q.defer();

				store.news.splice(store.news.indexOf(newNew), 1);

				store._saveToLocalStorage(store.news);
				deferred.resolve(store.news);

				return deferred.promise;
			},

			get: function () {
				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.news);
				deferred.resolve(store.news);

				return deferred.promise;
			},

			insert: function (newNew) {
				var deferred = $q.defer();

				store.news.push(newNew);

				store._saveToLocalStorage(store.news);
				deferred.resolve(store.news);

				return deferred.promise;
			},

			put: function (newNew, index) {
				var deferred = $q.defer();

				store.news[index] = newNew;

				store._saveToLocalStorage(store.news);
				deferred.resolve(store.news);

				return deferred.promise;
			}
		};

		return store;
	});
