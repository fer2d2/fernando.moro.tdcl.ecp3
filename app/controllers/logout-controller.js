'use strict';

angular.module('padelApp')
    .controller('logoutController', ['$log', '$location', 'authentication',
        function ($log, $location, authentication) {
            authentication.removeToken();
            $location.path('/login');
        }]);