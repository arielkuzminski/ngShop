'use strict';

angular.module('app')

  //PRODUCTS//
  .controller('siteProductsController', siteProductsController)
  .controller('siteShowProductController', siteShowProductController)
  .controller('cartController', cartController)

/////////////////////////////////////////////////////////////////////
//*****************************PRODUCTS****************************//
/////////////////////////////////////////////////////////////////////

function siteProductsController($scope, $http, cartService) {

  $http.get('model/products.json').
  success(function(data) {
    $scope.products = data;
  }).error(function() {
    console.log('Błąd pobrania pliku json');
  });

  $scope.addToCart = function(product) {
    cartService.add(product);
  }

}


function siteShowProductController($scope, $http, $routeParams, cartService) {

  $http.get('model/products.json')
    .success(function(data) {
      var products = data;
      $scope.product = products[$routeParams.id];
    }).error(function() {
      console.log('Błąd pobrania pliku json');
    });

    $scope.addToCart = function(product) {
      cartService.add(product);
    }

}

function cartController($scope, cartService) {

  $scope.cart = cartService;

  $scope.emptyCart = function() {
    cartService.empty();
  };

  $scope.total = function () {
    var total = 0;
    angular.forEach($scope.cart, function (item) {
      total += item.qty * item.price;
    });
    return total;
  };

}
