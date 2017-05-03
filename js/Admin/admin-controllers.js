'use strict';

angular.module('app')

  //PRODUCTS//
  .controller('productsController', productsController)
  .controller('productEditController', productEditController)
  .controller('productCreateController', productCreateController)

  //USERS//
  .controller('usersController', usersController)
  .controller('userEditController', userEditController)
  .controller('userCreateController', userCreateController)

  //ORDERS//
  .controller('ordersController', ordersController)


/////////////////////////////////////////////////////////////////////
//*****************************PRODUCTS****************************//
/////////////////////////////////////////////////////////////////////

function productsController($scope, $http) {

  $http.get('model/products.json').
  success(function(data) {
    $scope.products = data;
  }).error(function() {
    console.log('Błąd pobrania pliku json');
  });

  $scope.deleteProduct = function(product, $index) {

    //TODO: Zapisać dane przez API

    $scope.products.splice($index, 1)

    console.log('Usunięto: ' + product.nazwa);
  };

}


function productEditController($scope, $http, $routeParams) {

  $http.get('model/products.json')
    .success(function(data) {
      var products = data;
      $scope.product = products[$routeParams.id];
    }).error(function() {
      console.log('Błąd pobrania pliku json');
    });

  $scope.saveChanges = function(product) {

    //TODO: Zapisać dane przez API

    console.log(product);
    console.log($routeParams.id);
  };

}

function productCreateController($scope, $http) {

  $scope.createProduct = function() {
    console.log($scope.product);
  };

}


/////////////////////////////////////////////////////////////////////
//******************************USERS******************************//
/////////////////////////////////////////////////////////////////////


function usersController($scope, $http) {

  $http.get('model/users.json')
    .success(function(data) {
      $scope.users = data;
    })
    .error(function() {
      console.log('błąd');
    })

  $scope.deleteUser = function(user, $index) {
    $scope.users.splice($index, 1);
  }

}

function userEditController($scope, $http, $routeParams) {

  $http.get('model/users.json')
    .success(function(data) {
      var users = data;
      $scope.user = users[$routeParams.id];
    }).error(function() {
      console.log('Błąd pobrania pliku json');
    });

  $scope.saveChanges = function(user) {

    //TODO: Zapisać dane przez API

    console.log(user);
    console.log($routeParams.id);
  };

}

function userCreateController($scope, $http) {
  $scope.createUser = function() {
    console.log($scope.user);
  };

}


/////////////////////////////////////////////////////////////////////
//******************************USERS******************************//
/////////////////////////////////////////////////////////////////////


function ordersController($scope, $http) {

  $http.get('model/orders.json')
    .success(function(data) {
      $scope.orders = data;
    })
    .error(function() {
      console.log('błąd');
    })

  $scope.deleteOrder = function(order, $index) {
    $scope.orders.splice($index, 1);
  };

  $scope.changeStatus = function(order) {
    order.status = !order.status;
  };

}
