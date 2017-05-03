'use strict';

angular.module('app')

  .factory('cart', cart);

    function cart() {

      cart = [];

      cart.show = function() {
        console.log( 'zawartosc koszyka');
      }
      return cart;

    }
