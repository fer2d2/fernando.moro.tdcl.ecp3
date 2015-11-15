'use strict';

angular.module('padelApp')
    .controller('navbarController', ['$scope', '$route', '$log', 'activeTabs', 'authentication',
        function ($scope, $route, $log, activeTabs, authentication) {
            $scope.activeTabs = activeTabs;
            $scope.route = $route;

            $scope.authenticated = false;

            $scope.$watch(function() {
                return authentication.isUserAuthenticated();
            }, function (newVal) {
                $log.info("Updated navbar. Authentication:", newVal);

                $scope.authenticated = newVal;
            });
        }]);