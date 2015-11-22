'use strict';

angular.module('padelApp')
    .controller('loginController', ['$log', '$scope', '$http', 'webServiceEndpoints', 'authentication', '$location',
        function ($log, $scope, $http, webServiceEndpoints, authentication, $location) {
            $scope.userData = {
                username: "",
                email: "",
                password: ""
            };

            $scope.errorAlert = {
                show: false,
                message: ""
            };

            $scope.existsEmail = function () {
                return ($scope.userData.email !== undefined && $scope.userData.email !== "");
            };

            $scope.existsUsername = function () {
                return ($scope.userData.username !== undefined && $scope.userData.username !== "");
            };

            $scope.isRequired = function () {
                // Con validar uno de los campos es suficiente
                return (!$scope.existsEmail() && !$scope.existsUsername());
            };

            $scope.doLogin = function () {
                $http.get(webServiceEndpoints.loginRoute(), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        id: _getChosenId(),
                        password: $scope.userData.password
                    }
                }).then(function (successResponse) {
                    $log.info(successResponse);

                    var token = successResponse.headers(["token"]);
                    if (!token) {
                        _displayErrorMessage(successResponse);
                    } else {
                        $scope.errorAlert.show = false;
                        authentication.setToken(token);
                        $location.path('/');
                    }
                }, function (errorResponse) {
                    $log.error(angular.fromJson(errorResponse));
                });
            };

            function _getChosenId() {
                var chosenId;

                if ($scope.existsUsername()) {
                    chosenId = $scope.userData.username;
                } else {
                    chosenId = $scope.userData.email;
                }

                return chosenId;
            }

            function _displayErrorMessage(successResponse) {
                $scope.errorAlert.show = true;
                $scope.errorAlert.message = successResponse.data.errorMessage;
            }
        }
    ]);