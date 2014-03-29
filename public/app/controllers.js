'use strict';

var app = angular.module('AzureMEAN');

// Controlador de la página principal
app.controller('MainCtrl', function($scope, $http) {
  $http.get('/api/serie').then(function(results){
    results = results.data;
    
    $scope.firstSerie = results[0];
    $scope.seriesList = results.slice(1);
  });
});

// Controlador de la página de series
app.controller('SerieCtrl', function($scope, $routeParams, $http) {
  $scope.serieId = $routeParams.id;
  $http.get('/api/serie/'+$routeParams.id).then(function(result){
    $scope.serie = result.data;
  });
});