'use strict';

angular.module('app')

  //PRODUCTS//
  .controller('siteProductsController', siteProductsController)
  .controller('siteShowProductController', siteShowProductController)

/////////////////////////////////////////////////////////////////////
//*****************************PRODUCTS****************************//
/////////////////////////////////////////////////////////////////////

function siteProductsController($scope, $http) {

  $http.get('model/products.json').
  success(function(data) {
    $scope.products = data;
  }).error(function() {
    console.log('Błąd pobrania pliku json');
  });

}


function siteShowProductController($scope, $http, $routeParams) {

  $http.get('model/products.json')
    .success(function(data) {
      var products = data;
      $scope.product = products[$routeParams.id];
    }).error(function() {
      console.log('Błąd pobrania pliku json');
    });

}
