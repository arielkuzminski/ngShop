'use strict';

angular.module('app')

  .controller('navigationController', navigationController)


/////////MAIN/////////

function navigationController($scope, $location, store, cart) {

  $scope.navigation = function() {
    if (/^\/admin/.test($location.path())) {
      return 'partials/admin/admin-navigation.html';
    }
    else {
      return 'partials/site/site-navigation.html';
    }
  }

  $scope.isActive = function(path) {
    return $location.path() === path;
  };

  store.set( 'test' , 'Nowa wartość');

  cart.show();

}