'use strict';

angular.module('padelApp')
    .constant("activeTabs", {
        index: 0,
        facilities: 1,
        booking: 2,
        register: 3,
        login: 4
    })
    .constant("webServiceEndpoints", {
        baseRoute: "http://salonso.etsisi.upm.es/miw_serv/padel/",

        _login: "conexion.php",
        _validateUsername: "username.php",
        _validateEmail: "email.php",
        _register: "usuario.php",
        _booking: "disponibilidad.php",

        loginRoute: function () {
            return this.baseRoute + this._login;
        },
        validateUsernameRoute: function () {
            return this.baseRoute + this._validateUsername;
        },
        validateEmailRoute: function () {
            return this.baseRoute + this._validateEmail;
        },
        registerRoute: function() {
            return this.baseRoute + this._register;
        },
        bookingRoute: function() {
            return this.baseRoute + this._booking;
        }
    });