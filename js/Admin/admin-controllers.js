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

function productsController($scope, $http, store) {

  $http.get('model/products.json').
  success(function(data) {
    $scope.products = data;
  }).error(function() {
    console.log('Błąd pobrania pliku json');
  });

  $scope.deleteProduct = function(product, $index) {

    //TODO: Zapisać dane przez API

    if (!confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      return false;
    }

    $scope.products.splice($index, 1)
    console.log('Usunięto: ' + product.nazwa);
  };

  console.log(store.get('test'));

}


function productEditController($scope, $http, $routeParams, FileUploader) {

  var id = $routeParams.id;
  $scope.id = id;

  $http.post('model/products.json')
  .success(function(data) {
    var products = data;
    $scope.product = products[id];
  }).error(function() {
    console.log('Błąd pobrania pliku json');
  });

  function getImages() {
    $http.get('api/admin/images/get/' + id)
    .success(function(data) {
      $scope.images = data;
    }).error(function() {
      console.log('Błąd pobrania pliku json');
    });
  }

  getImages();

  $scope.saveChanges = function(product) {

    //TODO: Zapisać dane przez API

    console.log(product);
    console.log(id);
  };

  var uploader = $scope.uploader = new FileUploader({
    url: 'api/admin/images/upload/' + id
  });

  uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/ , options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });

  uploader.onCompleteItem = function(fileItem, response, status, headers) {
    console.info('onCompleteItem', fileItem, response, status, headers);
    getImages();
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
    if (!confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
      return false;
    }
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
//******************************Orders******************************//
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
    if (!confirm('Czy na pewno chcesz usunąć to zamówienie?')) {
      return false;
    }
    $scope.orders.splice($index, 1);
  };

  $scope.changeStatus = function(order) {
    order.status = !order.status;
  };

}
