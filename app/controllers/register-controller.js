'use strict';

angular.module('padelApp')
    .controller('registerController', ['$log', '$scope', '$http', '$httpParamSerializerJQLike', 'webServiceEndpoints',
        function ($log, $scope, $http, $httpParamSerializerJQLike, webServiceEndpoints) {
            $scope.userData = {
                username: "",
                email: "",
                birthDate: "",
                password: ""
            };

            $scope.passwordValidate = "";

            $scope.validations = {
                isPasswordValid: true,
                isUsernameUnique: true,
                isEmailUnique: true,
                isRegistrationOk: true,
                isRegistrationFinished: false,
                canSend: function () {
                    return this.isPasswordValid && this.isUsernameUnique && this.isEmailUnique;
                }
            };

            $scope.errorAlert = "";

            $scope.validateUniqueUsername = function () {
                if ($scope.userData.username === "" || $scope.userData.username === undefined) {
                    return; // guard clause
                }

                $http.get(webServiceEndpoints.validateUsernameRoute(), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        username: $scope.userData.username
                    }
                }).then(function (successResponse) {
                    $log.info(successResponse);

                    var message = successResponse.data.errorMessage;
                    $scope.validations.isUsernameUnique = message === 'no error';

                }, function (errorResponse) {
                    $log.error(angular.fromJson(errorResponse));
                });
            };

            $scope.validateUniqueEmail = function () {
                if ($scope.userData.email === "" || $scope.userData.email === undefined) {
                    return; // guard clause
                }

                $http.get(webServiceEndpoints.validateUsernameRoute(), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        username: $scope.userData.email
                    }
                }).then(function (successResponse) {
                    $log.info(successResponse);

                    var message = successResponse.data.errorMessage;
                    $scope.validations.isEmailUnique = message === 'no error';

                }, function (errorResponse) {
                    $log.error(angular.fromJson(errorResponse));
                });
            };

            $scope.validatePasswordMatch = function () {
                if ($scope.userData.password === "" || $scope.userData.password === undefined ||
                    $scope.passwordValidate === "" || $scope.passwordValidate === undefined) {
                    return; // guard clause
                }

                $scope.validations.isPasswordValid = $scope.userData.password === $scope.passwordValidate;
            };

            $scope.doRegister = function () {
                $http({
                    method: 'POST',
                    url: webServiceEndpoints.registerRoute(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $httpParamSerializerJQLike({
                        username: $scope.userData.username,
                        email: $scope.userData.email,
                        password: $scope.userData.password,
                        birthDate: new Date($scope.userData.birthDate).getTime()
                    })
                }).then(function (successResponse) {
                    $log.info(successResponse);

                    var message = successResponse.data.errorMessage;

                    if (message.indexOf("no error") !== -1) {
                        $scope.validations.isRegistrationOk = true;
                        $scope.validations.isRegistrationFinished = true;
                    } else {
                        $scope.validations.isRegistrationOk = false;
                        $scope.errorAlert = message;
                    }

                }, function (errorResponse) {
                    $log.error(angular.fromJson(errorResponse));
                });
            };
        }
    ]);