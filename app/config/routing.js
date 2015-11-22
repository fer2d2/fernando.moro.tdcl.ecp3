'use strict';

angular.module('padelApp')
    .config(['$routeProvider', 'activeTabs', function ($routeProvider, activeTabs) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/main.html',
                activeTab: activeTabs.index
            })
            .when('/facilities', {
                templateUrl: 'app/views/facilities.html',
                activeTab: activeTabs.facilities
            })
            .when('/booking', {
                templateUrl: 'app/views/booking.html',
                activeTab: activeTabs.booking
            })
            .when('/register', {
                templateUrl: 'app/views/register.html',
                controller: 'registerController',
                activeTab: activeTabs.register
            })
            .when('/login', {
                templateUrl: 'app/views/login.html',
                controller: 'loginController',
                activeTab: activeTabs.login
            })
            .when('/logout', {
                template: " ",
                controller: 'logoutController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);