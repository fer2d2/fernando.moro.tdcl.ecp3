'use strict';

angular.module('padelApp')
    .controller('bookingController', ['$log', '$scope', '$http', 'webServiceEndpoints', 'authentication',
        function ($log, $scope, $http, webServiceEndpoints, authentication) {

            $scope.authenticated = authentication.isUserAuthenticated();

            $scope.dt = null;
            $scope.datePickerLogic = {
                minDate: new Date(),
                status: {
                    opened: false
                },
                dateOptions: {
                    formatYear: 'yy',
                    startingDay: 1
                },
                open: function($event) {
                    this.status.opened = true;
                },
                clear: function() {
                    $scope.dt = null;
                }
            };

            $scope.availableCourts = [];

            $scope.queryAvailableCourts = function () {
                if($scope.dt === null || $scope.dt === undefined || $scope.dt === "") {
                    return; // guard clause
                }

                $http.get(webServiceEndpoints.bookingRoute(), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        day: new Date($scope.dt).getTime()
                    }
                }).then(function (successResponse) {
                    $log.info(successResponse);
                    $scope.availableCourts = successResponse.data;
                }, function (errorResponse) {
                    $log.error(angular.fromJson(errorResponse));
                });
            };

            $scope.showCourtsAvailableTable = function () {
                return $scope.availableCourts.length > 0;
            }
        }
    ]);