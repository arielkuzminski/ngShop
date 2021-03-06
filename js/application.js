'use strict';

angular.module( 'app' , [ 'ngRoute', 'angular-storage', 'angularFileUpload' ] )

.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider , $httpProvider ) {

	// ================== ADMIN PRODUCTS ================== //

	$routeProvider.when( '/admin/products' , {
		controller : 'productsController',
		templateUrl : 'partials/Admin/Products/products.html'
	});

	$routeProvider.when( '/admin/product/edit/:id' , {
		controller: 'productEditController',
		templateUrl : 'partials/Admin/Products/product-edit.html'
	});

	$routeProvider.when( '/admin/product/create/' , {
		controller: 'productCreateController',
		templateUrl : 'partials/Admin/Products/product-create.html'
	});

	// ================== ADMIN USERS ================== //

	$routeProvider.when( '/admin/users' , {
		controller: 'usersController',
		templateUrl : 'partials/Admin/Users/users.html'
	});

	$routeProvider.when( '/admin/user/edit/:id' , {
		controller: 'userEditController',
		templateUrl : 'partials/Admin/Users/user-edit.html'
	});

	$routeProvider.when( '/admin/user/create' , {
		controller: 'userCreateController',
		templateUrl : 'partials/Admin/Users/user-create.html'
	});

	// ==================ADMIN ORDERS ================== //

	$routeProvider.when( '/admin/orders' , {
		controller: 'ordersController',
		templateUrl : 'partials/Admin/Orders/orders.html'
	});

	// ================== SITE PRODUCTS ================== //

	$routeProvider.when( '/products' , {
		controller : 'siteProductsController',
		templateUrl : 'partials/Site/Products/products.html'
	});

	$routeProvider.when( '/product/:id' , {
		controller: 'siteShowProductController',
		templateUrl : 'partials/Site/Products/product-show.html'
	});

	$routeProvider.when( '/cart' , {
		controller: 'cartController',
		templateUrl : 'partials/Site/cart.html'
	});

	$routeProvider.when( '/orders' , {
		controller: 'siteOrdersController',
		templateUrl : 'partials/Site/Orders/orders.html'
	});

	// ================== Login & Register ================== //

	$routeProvider.when( '/login' , {
		controller: 'login',
		templateUrl : 'partials/Site/login.html'
	});


	$routeProvider.when( '/register' , {
		controller: 'register',
		templateUrl : 'partials/Site/register.html'
	});


	// ================== DEFAULT ================== //

	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}])
