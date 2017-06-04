'use strict';

angular.module('app')

  //PRODUCTS//
  .controller('siteProductsController', siteProductsController)
  .controller('siteShowProductController', siteShowProductController)
  .controller('siteOrdersController', siteOrdersController)
  .controller('login', login)
  .controller('register', register)
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

function cartController($scope, $filter, cartService) {

  $scope.cart = cartService;

  $scope.emptyCart = function() {
    cartService.empty();
  };

  $scope.total = function () {
    var total = 0;
    angular.forEach($scope.cart, function (item) {
      total += item.qty * item.price;
    });
    total = $filter('number')(total, 2);
    return total;
  };

  $scope.removeItem = function ($index) {
    $scope.cart.splice( $index, 1 );
    cartService.update($scope.cart);

  };

  $scope.setOrder = function ($event) {

    // TODO: zapisz zamówienie w bazie

    var loggedIn = true;

    if (!loggedIn) {
      $scope.alert = { type: 'warning', msg : 'Zaloguj się by złożyć zamówienie!'};
      $event.preventDefault();
      return false;
    }

    $scope.alert = { type: 'success', msg : 'Zamówienie złożone, trwa przekierowywanie do płatności...'};
    $scope.emptyCart();

    $event.preventDefault();
    $( '#paypalForm' ).submit();

  }

  $scope.$watch( function () {
    cartService.update( $scope.cart );
  });

}

function siteOrdersController($scope, $http) {

  $http.get('model/orders.json')
    .success(function(data) {
      $scope.orders = data;
    })
    .error(function() {
      console.log('błąd');
    })

}

function login($scope, $http) {

  // TODO: pograć dane z formularza i przesłać do bazy (uwierzytelnianie)

  $scope.input = {};

  $scope.formSubmit = function () {
    $scope.errors = {};
    $scope.errors.login = true;
    console.log( $scope.input );
  };

}

function register($scope, $http) {

  // TODO: pograć dane z formularza i przesłać do bazy (uwierzytelnianie)

  $scope.input = {};

  $scope.formSubmit = function () {
    $scope.errors = {};
    $scope.errors.login = true;
    $scope.errors.name = "Login zajęty";
    $scope.submit = true;
    console.log( $scope.input );
  };

}
