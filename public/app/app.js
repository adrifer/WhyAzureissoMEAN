'use strict';

angular.module('AzureMEAN', ['ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/serie/:id', {
        templateUrl: '/app/views/serie.html',
        controller: 'SerieCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });