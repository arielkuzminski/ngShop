'use strict';

angular.module('app')

  .factory('cartService', cartService);

function cartService(store) {

  if (store.get('cart')) {
    var cart = store.get('cart');
  } else {
    var cart = [];
  }

  cart.show = function() {
    return cart;
  }

  cart.add = function(product) {

    if (!cart.length) {
      product.qty = 0;
      cart.push(product);
    }

    var addNew = true;
    angular.forEach(cart, function(value, key) {

      if (value.name === product.name) {
        addNew = false;
        cart[key].qty++;
      }

    });

    if (addNew) {
      product.qty = 1;
      cart.push(product);
    }

    store.set('cart', cart);

  }

  cart.empty = function() {
    store.remove('cart');
    cart.length = 0;
  }

  cart.update = function ( cart ) {
    store.set('cart', cart);
  }


  return cart;

}
