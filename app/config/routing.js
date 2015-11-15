'use strict';

angular.module('padelApp')
    .config(['$routeProvider', 'activeTabs', function ($routeProvider, activeTabs) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/main.html',
                activetab: activeTabs.index
            })
            .when('/facilities', {
                templateUrl: 'app/views/facilities.html',
                activetab: activeTabs.facilities
            })
            .when('/booking', {
                templateUrl: 'app/views/booking.html',
                activetab: activeTabs.booking
            })
            .when('/register', {
                templateUrl: 'app/views/register.html',
                activetab: activeTabs.register
            })
            .when('/login', {
                templateUrl: 'app/views/login.html',
                controller: 'loginController',
                activetab: activeTabs.login
            })
            .when('/logout', {
                template: " ",
                controller: 'logoutController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);