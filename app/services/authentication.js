'use strict';

angular.module('padelApp')
    .factory('authentication',['$log', function ($log) {
        var _token = "";

        // Public API
        return {
            setToken: function(token) {
                $log.info("Updated token:", token);
                _token = token;
            },
            getToken: function() {
                return _token;
            },
            removeToken: function() {
                _token = "";
            },
            isUserAuthenticated: function() {
                return _token !== undefined && _token !== "";
            }
        };
    }]);